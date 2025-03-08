import Database from 'better-sqlite3';
import { join } from 'path';
import { schedule } from 'node-schedule';
import fs from 'fs';

// Database configuration
const DB_PATH = join(process.cwd(), 'server/db/kooki3.db');
const BACKUP_DIR = join(process.cwd(), 'server/db/backups');

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Initialize database with WAL mode for better concurrent access
const db = new Database(DB_PATH, {
  verbose: process.env.NODE_ENV === 'development' ? console.log : undefined
});

// Enable WAL mode and foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize schema
const schema = fs.readFileSync(join(process.cwd(), 'server/db/schema.sql'), 'utf8');
db.exec(schema);

// Function to create a backup
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = join(BACKUP_DIR, `kooki3-${timestamp}.db`);
  
  try {
    db.backup(backupPath)
      .then(() => {
        console.log(`Backup created successfully: ${backupPath}`);
        
        // Keep only the last 7 daily backups
        const files = fs.readdirSync(BACKUP_DIR);
        if (files.length > 7) {
          const oldestFile = files.sort()[0];
          fs.unlinkSync(join(BACKUP_DIR, oldestFile));
        }
      })
      .catch(err => {
        console.error('Backup failed:', err);
      });
  } catch (error) {
    console.error('Error creating backup:', error);
  }
}

// Schedule daily backups at 3 AM
schedule.scheduleJob('0 3 * * *', createBackup);

// Helper function to generate unique IDs
export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to log audit events
export function logAudit(
  entityType: string,
  entityId: string,
  action: string,
  userId: string | null,
  changes: any
) {
  db.prepare(`
    INSERT INTO audit_log (entityType, entityId, action, userId, changes)
    VALUES (?, ?, ?, ?, ?)
  `).run(entityType, entityId, action, userId, JSON.stringify(changes));
}

export default db;