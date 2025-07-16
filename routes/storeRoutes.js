const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Create a new store
router.post('/', async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all stores (optionally filter by location/type)
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find(req.query);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a store by ID
router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ error: 'Store not found' });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 