const express = require("express");
const User = require("../models/User");
const Corso = require("../models/Corsi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose"); 

//------------------------------------STUDENTE-----------------------------------------
//GET->che mi permette di avere tutti i corsi per mostrarli a schermo
router.get("/allcorsi",async (req,res)=>{
  try{
    const corso = await Corso.find().populate("docente","nome cognome");
    res.json(corso);
  }catch(err)
  {console.log(err)}
})
//GET->che mi permette di avere il corso dello studente iscritto
router.get("/allcorsi/:idStudente",async(req,res)=>{
  try {
      const { idStudente } = req.params;
      const studente = await User.findById(idStudente).populate({
      path: "corsiIscritti",
      populate: { path: "docente", select: "nome cognome" }
    });

    if (!studente) {
      return res.status(404).json({ message: "Studente non trovato" });
    }

    res.json(studente.corsiIscritti); // array di corsi
  } catch (err) {
    console.error("Errore corsi iscritti:", err);
    res.status(500).json({ message: "Errore del server" });
  }
})
//POST->permette di aggiornare il database quando lo studente si iscrive al corso
router.post("/addcorsi/:idStudente",async(req,res)=>{
  try
  {
    const studenteId = req.params.idStudente;
    const { corsoId } = req.body; 
    const studente = await User.findById(studenteId);
    const corso = await Corso.findById(corsoId);
    
    if (!studente.corsiIscritti.includes(corsoId)) {
      studente.corsiIscritti.push(corsoId);
      await studente.save();
    }
    const corsoAggiornato = await Corso.findById(corsoId).populate("docente", "nome cognome");
    res.status(200).json(corsoAggiornato);
  }catch(err)
  {
    console.log(err);
  }

})

// DELETE /corsi/deletecourse/:studenteId/:corsoId
router.delete("/deletecourse/:studenteId/:corsoId", async (req, res) => {
  const { studenteId, corsoId } = req.params;

  try {
    const studenteAggiornato = await User.findByIdAndUpdate(
      studenteId,
      { $pull: { corsiIscritti: new mongoose.Types.ObjectId(corsoId) } },
      { new: true }
    );

    if (!studenteAggiornato) {
      return res.status(404).json({ error: "Studente non trovato" });
    }

    res.json({
      message: "Studente disiscritto dal corso"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Errore nella disiscrizione" });
  }
});






//----------------------------------DOCENTE----------------------------------------------
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

//GET->PER OTTENERE I DETTAGLI DI UN SINGOLO CORSO DEL DOCENTE
router.get("/:id",async(req,res)=>{
  try{
    const corso = await Corso.findById(req.params.id);
    res.json(corso);
  }catch(err)
   {
     res.status(500).json({ message: "Errore nel recupero corsi" });
  }
})

//POST->PERMETTE DI AGGIUNGERE UN CORSO
router.post("/add", async (req, res) => {
  try {
    const { titolo, descrizione, img, docente } = req.body;

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
      req.params.id,             
      { titolo, descrizione, img },
      { new: true }               
    );
    res.json(corsoAggiornato);
  } catch (err) {
    console.error("Errore nell'aggiornamento corso:", err);
    res.status(500).json({ message: "Errore nell'aggiornamento corso" });
  }
});
//DELETE -> per eliminare corso
router.delete("/:id",async(req,res)=>{
  try{
    const corsoAggiornato = await Corso.findByIdAndDelete(req.params.id);
    res.json(corsoAggiornato);
  }catch(err)
  {
    res.status(404).json({message:"Corso non trovato"});
  }
})








module.exports = router;
