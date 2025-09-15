const express = require('express');
const Lezione = require('../models/Lezioni');
const Corso = require('../models/Corsi');
const router = express.Router();

// Aggiungere una lezione a un corso
router.post('/', async (req, res) => {
  const { titolo, descrizione, video, corsoId } = req.body;

  try {
    const corso = await Corso.findById(corsoId);
    if (!corso) return res.status(404).json({ message: 'Corso non trovato' });

    const lezione = new Lezione({ titolo, descrizione, video, corsoId });
    await lezione.save();
    res.status(201).json({ message: 'Lezione aggiunta con successo', lezione });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ottenere tutte le lezioni di un corso
router.get('/:corsoId', async (req, res) => {
  const { corsoId } = req.params;

  try {
    const lezioni = await Lezione.find({ corsoId });
    res.json(lezioni);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
