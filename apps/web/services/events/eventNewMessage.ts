import { ChannelType, mentions, users } from '@linen/database';
import { createTwoWaySyncJob } from 'queue/jobs';
import { resolvePush } from 'services/push';
import ThreadsServices from 'services/threads';
import UserThreadStatusService from 'services/user-thread-status';
import { eventNewMentions } from 'services/events/eventNewMentions';
import { notificationListener } from 'services/notifications';
import ChannelsService from 'services/channels';
import { matrixNewMessage } from 'services/matrix';

type MentionNode = {
  type: string;
  id: string;
  source: string;
};

export type NewMessageEvent = {
  channelId: any;
  threadId: any;
  messageId: any;
  imitationId: string;
  mentions: (mentions & {
    users: users | null;
  })[];
  mentionNodes: MentionNode[];
  communityId: string;
  message: string;
  userId?: string;
};

export async function eventNewMessage({
  channelId,
  messageId,
  threadId,
  imitationId,
  mentions = [],
  mentionNodes = [],
  communityId,
  message,
  userId,
}: NewMessageEvent) {
  const event = {
    channelId,
    messageId,
    threadId,
    imitationId,
    isThread: false,
    isReply: true,
    message,
  };

  const channel = await ChannelsService.getChannelAndMembersWithAuth(channelId);

  const promises: Promise<any>[] = [
    createTwoWaySyncJob({ ...event, event: 'newMessage', id: messageId }),
    ThreadsServices.updateMetrics({ messageId, threadId }),
    UserThreadStatusService.markAsUnread(threadId, userId),
    UserThreadStatusService.markAsUnmutedForMentionedUsers(
      threadId,
      mentions.map((mention) => mention.usersId)
    ),
    eventNewMentions({ mentions, mentionNodes, channelId, threadId }),
    notificationListener({ ...event, communityId, mentions }),
    ...resolvePush({ channel, userId, event, communityId }),
    matrixNewMessage(event),
  ];

  if (channel?.type === ChannelType.DM) {
    promises.push(ChannelsService.unarchiveChannel({ channelId: channel.id }));
  }
  await Promise.allSettled(promises);
}
