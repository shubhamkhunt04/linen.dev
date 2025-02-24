import { channelNextPageType } from '@linen/types';
import { shouldThisChannelBeAnonymous } from 'services/channels';
import { findThreadsByCursor } from 'services/threads';
import { serializeThread } from '@linen/serializers/thread';
import { decodeCursor } from 'utilities/cursor';
import { sortBySentAtAsc } from '@linen/utilities/object';
import { buildCursor } from 'utilities/buildCursor';

// aka loadMore, it could be asc (gt) or desc (lt)
// it should return just one cursor, the one to keep loading into same direction
export async function channelNextPage({
  channelId,
  cursor,
}: {
  channelId: string;
  cursor?: string;
}): Promise<channelNextPageType> {
  const { sort, direction, sentAt } = decodeCursor(cursor);
  const anonymizeUsers = await shouldThisChannelBeAnonymous(channelId);
  const threads = await findThreadsByCursor({
    channelIds: [channelId],
    sentAt,
    sort,
    direction,
    anonymizeUsers,
  }).then((t) => t.sort(sortBySentAtAsc));

  const nextCursor = await buildCursor({
    threads,
    sort,
    sentAt,
    direction,
    loadMore: true,
  });

  return {
    threads: threads.map(serializeThread),
    nextCursor,
  };
}
