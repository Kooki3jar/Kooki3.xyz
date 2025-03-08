export interface SocialUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isFollowing?: boolean;
  nftCount?: number;
}

export interface Post {
  id: string;
  author: SocialUser;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  hasLiked: boolean;
  createdAt: string;
  nftRequired?: boolean;
  nftGate?: {
    contractAddress: string;
    tokenId: string;
    chain: 'ethereum' | 'solana';
  };
}

export interface Comment {
  id: string;
  author: SocialUser;
  content: string;
  likes: number;
  hasLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  isPrivate: boolean;
  nftRequired?: boolean;
  nftGate?: {
    contractAddress: string;
    tokenId: string;
    chain: 'ethereum' | 'solana';
  };
  categories: string[];
  admins: string[];
  members: string[];
}

export interface Message {
  id: string;
  sender: SocialUser;
  recipient: SocialUser;
  content: string;
  createdAt: string;
  read: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name: string;
  }[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'group_invite' | 'nft';
  actor: SocialUser;
  target?: {
    type: 'post' | 'comment' | 'group';
    id: string;
  };
  read: boolean;
  createdAt: string;
}