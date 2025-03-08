import db from './index';

// Query to check existing users
const users = db.prepare('SELECT COUNT(*) as count FROM users').get();
console.log(`Number of registered users: ${users.count}`);