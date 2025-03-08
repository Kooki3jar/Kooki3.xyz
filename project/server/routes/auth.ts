import express from 'express';
import { body } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db, { createSession, logAudit } from '../db';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login endpoint
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], async (req, res) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;

    // Find user by email
    const user = db.prepare(`
      SELECT 
        u.id, u.username, u.email, u.password_hash, u.status,
        p.display_name, p.avatar_url, p.bio
      FROM users u
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE u.email = ? AND u.status = 'active'
    `).get(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      // Log failed attempt
      logAudit(user.id, 'login_failed', { reason: 'invalid_password' }, ipAddress);
      
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Create session and generate token
    const sessionToken = createSession(
      user.id,
      req.headers['user-agent'] || 'unknown',
      ipAddress
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        username: user.username,
        sessionToken
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login timestamp
    db.prepare(`
      UPDATE users 
      SET last_login = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(user.id);

    // Log successful login
    logAudit(user.id, 'login_success', { sessionToken }, ipAddress);

    // Return success response
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.display_name || user.username,
        picture: user.avatar_url,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing login request'
    });
  }
});

// Register endpoint
router.post('/register', [
  body('username').trim().isLength({ min: 2 }).withMessage('Username must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  validateRequest
], async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const ipAddress = req.ip;

    // Check if email already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Check if username already exists
    const existingUsername = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user and profile in a transaction
    const result = db.transaction(() => {
      // Insert user
      const { lastInsertRowid: userId } = db.prepare(`
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
      `).run(username, email, passwordHash);

      // Create profile
      db.prepare(`
        INSERT INTO profiles (user_id, display_name)
        VALUES (?, ?)
      `).run(userId, username);

      return userId;
    })();

    // Create session
    const sessionToken = createSession(
      result,
      req.headers['user-agent'] || 'unknown',
      ipAddress
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: result,
        email,
        username,
        sessionToken
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Log registration
    logAudit(result, 'user_registered', { email }, ipAddress);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: result,
        username,
        email,
        name: username
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing registration request'
    });
  }
});

export default router;