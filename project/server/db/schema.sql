-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  userId TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  walletAddress TEXT UNIQUE,
  profilePicture TEXT,
  bio TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  lastLogin DATETIME,
  status TEXT CHECK(status IN ('active', 'suspended', 'deleted')) DEFAULT 'active'
);

-- NFTs table
CREATE TABLE IF NOT EXISTS nfts (
  nftId TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contractAddress TEXT NOT NULL,
  tokenId TEXT NOT NULL,
  image TEXT,
  attributes JSON,
  ownerId TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES users(userId) ON DELETE CASCADE,
  UNIQUE(contractAddress, tokenId)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  postId TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  content TEXT NOT NULL,
  mediaUrl TEXT,
  likes JSON, -- Array of user IDs
  nftGated BOOLEAN DEFAULT FALSE,
  nftRequirement JSON, -- Required NFT details for viewing
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  commentId TEXT PRIMARY KEY,
  postId TEXT NOT NULL,
  userId TEXT NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (postId) REFERENCES posts(postId) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Groups table
CREATE TABLE IF NOT EXISTS groups (
  groupId TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  nftRequirement JSON, -- Required NFT details for membership
  createdBy TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK(status IN ('active', 'archived')) DEFAULT 'active',
  FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE CASCADE
);

-- Group Members junction table with roles
CREATE TABLE IF NOT EXISTS group_members (
  groupId TEXT NOT NULL,
  userId TEXT NOT NULL,
  role TEXT CHECK(role IN ('member', 'moderator', 'admin')) DEFAULT 'member',
  joinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (groupId, userId),
  FOREIGN KEY (groupId) REFERENCES groups(groupId) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Products table for marketplace
CREATE TABLE IF NOT EXISTS products (
  productId TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(18,8) NOT NULL,
  currency TEXT CHECK(currency IN ('USD', 'ETH', 'SOL')) DEFAULT 'USD',
  sellerId TEXT NOT NULL,
  nftAssociated JSON, -- Associated NFT details
  category TEXT NOT NULL,
  status TEXT CHECK(status IN ('active', 'sold', 'deleted')) DEFAULT 'active',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sellerId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  eventId TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  location JSON NOT NULL, -- Location details including coordinates
  startDate DATETIME NOT NULL,
  endDate DATETIME NOT NULL,
  nftRequirement JSON, -- Required NFT details for attendance
  ticketPrice DECIMAL(18,8),
  currency TEXT CHECK(currency IN ('USD', 'ETH', 'SOL')) DEFAULT 'USD',
  maxAttendees INTEGER,
  createdBy TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT CHECK(status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
  FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE CASCADE
);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  ticketId TEXT PRIMARY KEY,
  eventId TEXT NOT NULL,
  ownerId TEXT NOT NULL,
  resalePrice DECIMAL(18,8),
  currency TEXT CHECK(currency IN ('USD', 'ETH', 'SOL')) DEFAULT 'USD',
  status TEXT CHECK(status IN ('valid', 'used', 'resale', 'cancelled')) DEFAULT 'valid',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (eventId) REFERENCES events(eventId) ON DELETE CASCADE,
  FOREIGN KEY (ownerId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(walletAddress);
CREATE INDEX IF NOT EXISTS idx_nfts_owner ON nfts(ownerId);
CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(userId);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(postId);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(sellerId);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(startDate);
CREATE INDEX IF NOT EXISTS idx_tickets_event ON tickets(eventId);
CREATE INDEX IF NOT EXISTS idx_tickets_owner ON tickets(ownerId);

-- Audit log for tracking important changes
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entityType TEXT NOT NULL, -- The type of entity being audited (user, post, etc.)
  entityId TEXT NOT NULL, -- The ID of the entity being audited
  action TEXT NOT NULL, -- The type of action (create, update, delete)
  userId TEXT, -- The user who performed the action
  changes JSON, -- The changes made
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE SET NULL
);

-- Create trigger to update timestamps
CREATE TRIGGER IF NOT EXISTS update_timestamp_users
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updatedAt = CURRENT_TIMESTAMP WHERE userId = NEW.userId;
END;

CREATE TRIGGER IF NOT EXISTS update_timestamp_groups
AFTER UPDATE ON groups
BEGIN
  UPDATE groups SET updatedAt = CURRENT_TIMESTAMP WHERE groupId = NEW.groupId;
END;

CREATE TRIGGER IF NOT EXISTS update_timestamp_products
AFTER UPDATE ON products
BEGIN
  UPDATE products SET updatedAt = CURRENT_TIMESTAMP WHERE productId = NEW.productId;
END;

CREATE TRIGGER IF NOT EXISTS update_timestamp_events
AFTER UPDATE ON events
BEGIN
  UPDATE events SET updatedAt = CURRENT_TIMESTAMP WHERE eventId = NEW.eventId;
END;

CREATE TRIGGER IF NOT EXISTS update_timestamp_tickets
AFTER UPDATE ON tickets
BEGIN
  UPDATE tickets SET updatedAt = CURRENT_TIMESTAMP WHERE ticketId = NEW.ticketId;
END;