const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.log('Errore nella connessione a MongoDB:', err));

const app = express();
app.use(bodyParser.json());

// Definiamo il modello per l'utente
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Funzione per generare il token JWT
function generateToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
}

// Registrazione utente
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Controllo se l'utente esiste già nel database
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Username già esistente' });
  }

  // Cifriamo la password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Creiamo un nuovo utente
  const newUser = new User({ username, password: hashedPassword });

  try {
    await newUser.save();
    const token = generateToken(newUser);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Login utente
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

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

// Recupera l'elenco degli utenti
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Errore durante il recupero degli utenti' });
  }
});

// Impostiamo la porta del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Recupera il token dalla header Authorization
  
  if (!token) {
    return res.status(401).json({ message: 'Accesso negato. Token non fornito.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Aggiunge i dati dell'utente decodificato alla richiesta
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token non valido.' });
  }
}

// Proteggiamo la rotta /api/users
app.get('/api/users', verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Errore durante il recupero degli utenti' });
  }
});

