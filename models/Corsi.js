const mongoose = require('mongoose');

// Schema della lezione (subdocumento)
const lezioneSchema = new mongoose.Schema({
  titolo: { type: String,  },
  video: { type: String, }
});

// Schema del corso
const corsoSchema = new mongoose.Schema({
  titolo: { type: String },
  descrizione: { type: String  },
  img: { type: String },
  docente: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
  lezioni: [lezioneSchema] // array di subdocumenti
});

// Creiamo il modello
const Corso = mongoose.model('Corso', corsoSchema);

module.exports = Corso;
