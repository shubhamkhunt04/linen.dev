export * from './slackMessageEventInterface';
export * from './slackSearchInterface';
export * from './slackUserInfoInterface';

export interface MessageFile {
  id: string;
  created?: number;
  timestamp?: number;
  name: string;
  title?: string;
  mimetype?: string;
  filetype?: string;
  pretty_type?: string;
  user?: string;
  editable?: boolean;
  size?: number;
  mode?: string;
  is_external?: boolean;
  external_type?: string;
  is_public?: boolean;
  public_url_shared?: boolean;
  display_as_bot?: boolean;
  username?: string;
  url_private: string;
  url_private_download?: string;
  media_display_type?: string;
  thumb_64?: string;
  thumb_80?: string;
  thumb_360?: string;
  thumb_360_w?: number;
  thumb_360_h?: number;
  thumb_480?: string;
  thumb_480_w?: number;
  thumb_480_h?: number;
  thumb_160?: string;
  thumb_720?: string;
  thumb_720_w?: number;
  thumb_720_h?: number;
  thumb_800?: string;
  thumb_800_w?: number;
  thumb_800_h?: number;
  thumb_960?: string;
  thumb_960_w?: number;
  thumb_960_h?: number;
  thumb_1024?: string;
  thumb_1024_w?: number;
  thumb_1024_h?: number;
  original_w?: number;
  original_h?: number;
  thumb_tiny?: string;
  permalink?: string;
  permalink_public?: string;
  is_starred?: boolean;
  has_rich_preview?: boolean;
}

export type ConversationHistoryBody = {
  ok: boolean;
  messages: ConversationHistoryMessage[];
  has_more: boolean;
  pin_count?: number;
  channel_actions_ts?: any;
  channel_actions_count?: number;
  response_metadata?: ResponseMetadata;
};

export type ConversationHistoryMessage = {
  type: string;
  subtype?: string;
  ts: string;
  user?: string;
  text: string;
  bot_id?: string;
  bot_link?: string;
  client_msg_id?: string;
  team?: string;
  blocks?: Block[];
  thread_ts?: string;
  reply_count?: number;
  reply_users_count?: number;
  latest_reply?: string;
  reply_users?: string[];
  is_locked?: boolean;
  subscribed?: boolean;
  inviter?: string;
  files?: MessageFile[];
  reactions?: MessageReaction[];
  app_id?: string;
  attachments?: {
    fallback: string;
    pretext: string;
    author_name: string;
    author_icon: string;
    title: string;
    text: string;
    footer: string;
  }[];
  message?: ConversationHistoryMessage;
  previous_message?: ConversationHistoryMessage;
};

export interface MessageReaction {
  name: string;
  users: string[];
  count: number;
}

interface MessageBlock {
  team: string;
  channel: string;
  ts: string;
  message: Message;
}

interface Message {
  blocks: Block[];
}

type Block = {
  type: string;
  block_id: string;
  elements: Element[];
};

type Element = {
  type: string;
  elements: Element2[];
};

type Element2 = {
  type: string;
  text: string;
};

type ResponseMetadata = {
  next_cursor: string;
};

export interface ConversationRepliesBody {
  ok: boolean;
  messages: ConversationRepliesMessage[];
  has_more: boolean;
}

export interface ConversationRepliesMessage {
  client_msg_id?: string;
  type: string;
  text: string;
  user?: string;
  ts: string;
  team?: string;
  blocks?: Block[];
  thread_ts: string;
  reply_count?: number;
  reply_users_count?: number;
  latest_reply?: string;
  reply_users?: string[];
  is_locked?: boolean;
  subscribed?: boolean;
  parent_user_id?: string;
  subtype?: string;
  username?: string;
  icons?: Icons;
  bot_id?: string;
  attachments?: Attachment[];
}

export interface Style {
  code: boolean;
}

export interface Icons {
  image_48: string;
}

export interface Attachment {
  title: string;
  title_link?: string;
  text: string;
  fallback: string;
  from_url?: string;
  service_name?: string;
  id: number;
  original_url?: string;
  footer?: string;
  footer_icon?: string;
  color?: string;
  mrkdwn_in?: string[];
  bot_id?: string;
  app_unfurl_url?: string;
  is_app_unfurl?: boolean;
  app_id?: string;
  ts?: string;
  author_id?: string;
  channel_team?: string;
  channel_id?: string;
  channel_name?: string;
  is_msg_unfurl?: boolean;
  is_reply_unfurl?: boolean;
  message_blocks?: MessageBlock[];
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  author_subname?: string;
}
