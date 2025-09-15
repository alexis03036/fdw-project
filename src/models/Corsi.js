const mongoose = require('mongoose');

// Definiamo lo schema del corso
const corsoSchema = new mongoose.Schema({
  titolo: {
    type: String,
    required: true
  },
  descrizione: {
    type: String,
    required: true
  },
  dataInizio: {
    type: Date,
    required: true
  },
  dataFine: {
    type: Date
  },
  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// Creiamo il modello
const Corso = mongoose.model('Corso', corsoSchema);

module.exports = Corso;
