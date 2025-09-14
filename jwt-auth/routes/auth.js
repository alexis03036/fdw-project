const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Funzione per generare il token
function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
}

// Registrazione
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username e password sono obbligatori' });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username già esistente' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    const token = generateToken(newUser);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username e password sono obbligatori' });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'Utente non trovato' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Password errata' });
  }

  const token = generateToken(user);
  res.json({ token });
});

module.exports = router;
