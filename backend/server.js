const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');

const { exec } = require('child_process');

const { initStore } = require('./src/data/store');
const authRoutes = require('./src/routes/auth.routes');
const collectionsRoutes = require('./src/routes/collections.routes');

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(s => s.trim())
  : null;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      !allowedOrigins ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // higher limit to allow booking photo uploads (base64)

initStore(); // creates + seeds storage/database.json on first run

app.get(['/api', '/api/status', '/status'], (req, res) => {
  res.json({ status: 'online', service: 'FixMyPhone API Server', timestamp: new Date().toISOString() });
});
app.use('/api/auth', authRoutes);
app.use('/api', collectionsRoutes);

// Additional fallback routing for serverless path rewrites
app.use('/auth', authRoutes);
app.use('/', collectionsRoutes);

// Route redirects for convenience
app.get('/admin', (req, res) => res.redirect('/#admin'));
app.get('/login', (req, res) => res.redirect('/#login'));

// Serve frontend static files if accessed directly on this port
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
const frontendPublicPath = path.join(__dirname, '..', 'frontend', 'public');
const frontendPath = path.join(__dirname, '..', 'frontend');

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}
app.use(express.static(frontendPublicPath));
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'API endpoint not found' });
  if (fs.existsSync(path.join(frontendDistPath, 'index.html'))) {
    return res.sendFile(path.join(frontendDistPath, 'index.html'));
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

function openBrowser(url) {
  const platform = process.platform;
  let cmd = '';
  if (platform === 'win32') {
    cmd = `start "" "${url}"`;
  } else if (platform === 'darwin') {
    cmd = `open "${url}"`;
  } else {
    cmd = `xdg-open "${url}"`;
  }
  exec(cmd, (err) => {
    if (err) {
      console.log(`Could not automatically open browser: ${err.message}`);
    }
  });
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    const adminUrl = `http://localhost:${PORT}/#admin`;
    console.log(`\n========================================`);
    console.log(`FixMyPhone Backend API Server Running`);
    console.log(`Admin Panel:  ${adminUrl}`);
    console.log(`API URL:      http://localhost:${PORT}/api`);
    console.log(`Frontend URL: http://localhost:5173 (run 'npm run dev:frontend')`);
    console.log(`========================================\n`);

    // Automatically open the Admin Panel in default browser on startup
    if (process.env.AUTO_OPEN !== 'false' && process.env.NODE_ENV !== 'production') {
      openBrowser(adminUrl);
    }
  });
}

module.exports = app;

