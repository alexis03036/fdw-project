const express = require("express");
const User = require("../models/User");
const Corso = require("../models/Corsi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/a", async (req, res) => {
  const { titolo, descrizione, img, docente } = req.body;
  console.log("Dati ricevuti per nuovo corso:", req.body); // Debug: verifica i dati ricevuti
  try {
    const nuovoCorso = new Corso({
      titolo,
      descrizione,
      img,
      docente,
      lezioni: [],
    });
    await nuovoCorso.save();
    res.status(201).json(nuovoCorso);
  } catch (err) {
    console.error("Errore nella creazione corso:", err);
    res.status(500).json({ message: "Errore nella creazione corso" });
  }
});

module.exports = router;
