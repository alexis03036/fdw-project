const mongoose = require('mongoose');

// Definiamo lo schema dell'utente
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'professor'],
    required: true
  }
});

// Creiamo il modello
const User = mongoose.model('User', userSchema);

module.exports = User;
