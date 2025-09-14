const express = require('express');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// Rotta protetta: elenco utenti
router.get('/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Errore durante il recupero degli utenti' });
  }
});

module.exports = router;
