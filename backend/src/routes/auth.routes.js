const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@fixmyphone.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  const jwtSecret = process.env.JWT_SECRET || 'dev-secret-change-me';

  if (!email || !password || email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const token = jwt.sign({ email }, jwtSecret, { expiresIn: '12h' });
  res.json({ token, email });
});

module.exports = router;
