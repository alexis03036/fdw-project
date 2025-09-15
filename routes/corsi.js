const express = require("express");
const User = require("../models/User");
const Corso = require("../models/Corsi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

//serve per stampare a schermo tutti i corsi di quel docente
// GET->SERVE PER MOSTRARE TUTTI I CORSI DEL DOCENTE
router.get("/", async (req, res) => {
  try {
    const docenteId = req.user.userId; // payload del JWT
    const corsi = await Corso.find({ docente: docenteId });
    res.json(corsi);
  } catch (err) {
    console.error("Errore nel recupero corsi:", err);
    res.status(500).json({ message: "Errore nel recupero corsi" });
  }
});

//POST->PERMETTE DI AGGIUNGERE UN CORSO
router.post("/add", async (req, res) => {
  try {
    const { titolo, descrizione, img,docente } = req.body;

    const nuovoCorso = new Corso({
      titolo,
      descrizione,
      img,
      docente,
      lezioni: []
    });

    await nuovoCorso.save();
    res.status(201).json(nuovoCorso);
  } catch (err) {
    console.error("Errore nella creazione corso:", err);
    res.status(500).json({ message: "Errore nella creazione corso" });
  }
});
// PUT -> AGGIORNA CORSO ESISTENTE
router.put("/:id", async (req, res) => {
  try {
    const { titolo, descrizione, img } = req.body;

    const corsoAggiornato = await Corso.findByIdAndUpdate(
      req.params.id,               // 👈 prende l'id dall'URL
      { titolo, descrizione, img },
      { new: true }                // ritorna il documento aggiornato
    );

    if (!corsoAggiornato) {
      return res.status(404).json({ message: "Corso non trovato" });
    }

    res.json(corsoAggiornato);
  } catch (err) {
    console.error("Errore nell'aggiornamento corso:", err);
    res.status(500).json({ message: "Errore nell'aggiornamento corso" });
  }
});





module.exports = router;
