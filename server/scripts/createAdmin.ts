import db from '../db';
import bcrypt from 'bcryptjs';

async function createAdminUser() {
  try {
    const username = 'admin';
    const email = 'admin@kooki3.com';
    const password = 'Admin@123456';

    // Check if admin already exists
    const existingUser = db.prepare(
      'SELECT username FROM users WHERE username = ? OR email = ?'
    ).get(username, email);

    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create admin user
    const result = db.transaction(() => {
      const { lastInsertRowid } = db.prepare(`
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
      `).run(username, email, passwordHash);

      db.prepare(`
        INSERT INTO profiles (user_id, display_name)
        VALUES (?, ?)
      `).run(lastInsertRowid, 'Admin User');

      return lastInsertRowid;
    })();

    console.log('Admin account created successfully!');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Please change the password after first login.');

  } catch (error) {
    console.error('Error creating admin account:', error);
  }
}

createAdminUser();