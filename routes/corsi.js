const express = require('express');
const Corso = require('../models/Corsi');
const User = require('../models/User');
const router = express.Router();

// Creare un nuovo corso
router.post('/', async (req, res) => {
  const { titolo, descrizione, dataInizio, dataFine, docenteId } = req.body;

  try {
    const docente = await User.findById(docenteId);
    if (!docente) return res.status(404).json({ message: 'Docente non trovato' });

    const corso = new Corso({ titolo, descrizione, dataInizio, dataFine, docente: docenteId });
    await corso.save();
    res.status(201).json({ message: 'Corso creato con successo', corso });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ottenere tutti i corsi
router.get('/', async (req, res) => {
  try {
    const corsi = await Corso.find().populate('docente', 'username email');
    res.json(corsi);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
