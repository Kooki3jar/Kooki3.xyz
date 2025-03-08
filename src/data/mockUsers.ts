import { SocialUser } from '../types/social';

// Generate 20 realistic test accounts
export const mockUsers: SocialUser[] = [
  {
    id: '1',
    username: 'emily.crafts',
    displayName: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    bio: 'Handmade jewelry designer | Sustainable materials',
    followers: 1243,
    following: 891
  },
  {
    id: '2',
    username: 'alex.woodworks',
    displayName: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    bio: 'Custom furniture maker',
    followers: 2156,
    following: 734
  },
  // Add more mock users...
];

// Generate initial posts with interactions
export function generateMockPosts() {
  const posts = [];
  const totalPosts = 50;

  for (let i = 0; i < totalPosts; i++) {
    const author = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const hasImage = Math.random() > 0.5;
    const imageCount = hasImage ? Math.floor(Math.random() * 3) + 1 : 0;
    
    posts.push({
      id: `post-${i}`,
      author,
      content: getRandomContent(),
      images: hasImage ? Array(imageCount).fill(null).map(() => getRandomImage()) : undefined,
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 20),
      hasLiked: Math.random() > 0.7,
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }

  return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

function getRandomContent(): string {
  const contents = [
    "Just finished this new piece! What do you think? 🎨",
    "Behind the scenes of my latest project. Swipe to see the process! 🛠️",
    "New collection dropping next week! Stay tuned for updates ✨",
    // Add more content options...
  ];
  
  return contents[Math.floor(Math.random() * contents.length)];
}

function getRandomImage(): string {
  const images = [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    'https://images.unsplash.com/photo-1516981442399-a91139e20ff8?w=800&q=80',
    // Add more image URLs...
  ];
  
  return images[Math.floor(Math.random() * images.length)];
}