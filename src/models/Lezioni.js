const mongoose = require('mongoose');

// Definiamo lo schema della lezione
const lezioneSchema = new mongoose.Schema({
  titolo: {
    type: String,
    required: true
  },
  descrizione: {
    type: String,
  },
  video: {
    type: String, // link al video
    required: true
  },
  corsoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Corso',
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

// Creiamo il modello
const Lezione = mongoose.model('Lezione', lezioneSchema);

module.exports = Lezione;
