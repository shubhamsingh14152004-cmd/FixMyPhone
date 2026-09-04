const express = require('express');
const { getCollection, setCollection } = require('../data/store');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Every collection is readable without auth — customers need to browse brands,
// models and prices, and look up their own bookings.
const PUBLIC_READ = ['brands', 'prices', 'bookings', 'technicians', 'settings', 'services'];

// Brands/prices/technicians/settings are only editable by a logged-in admin.
const ADMIN_WRITE = ['brands', 'prices', 'technicians', 'settings'];

PUBLIC_READ.forEach(name => {
  router.get('/' + name, (req, res) => {
    res.json(getCollection(name));
  });
});

ADMIN_WRITE.forEach(name => {
  router.put('/' + name, requireAdmin, (req, res) => {
    if (!Array.isArray(req.body) && typeof req.body !== 'object') {
      return res.status(400).json({ error: 'Invalid payload.' });
    }
    res.json(setCollection(name, req.body));
  });
});

// Bookings are intentionally left writable without an admin token so the public
// booking form on the site can create a booking. In a stricter production setup
// this whole-collection PUT should be split into:
//   POST   /api/bookings         (public — create a single booking)
//   PATCH  /api/bookings/:id     (admin-only — update status/payment/etc.)
router.put('/bookings', (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Invalid payload.' });
  res.json(setCollection('bookings', req.body));
});

module.exports = router;
