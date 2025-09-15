const mongoose = require("mongoose");

// Definiamo lo schema dell'utente
const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cognome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["studente", "docente"],
    required: true,
  },
});

// Creiamo il modello
const User = mongoose.model("User", userSchema);

module.exports = User;
