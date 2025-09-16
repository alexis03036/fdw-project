const express = require('express');
const Corso = require('../models/Corsi');
const router = express.Router();
const User = require('../models/User');

//------LATO STUDENTE---------//
//GET->mi serve per mostrare le lezioni al corso dove lo studente è iscritto
router.get("/:corsoId/:studenteId", async (req, res) => {
  try {
    const { corsoId, studenteId } = req.params;

    // recupero lo studente
    const studente = await User.findById(studenteId);

    if (!studente) {
      return res.status(404).json({ message: "Studente non trovato" });
    }

    // controllo se lo studente è iscritto a quel corso
    const iscritto = studente.corsiIscritti
      .map((id) => id.toString())
      .includes(corsoId);

    if (!iscritto) {
      return res.status(403).json({ message: "Non sei iscritto a questo corso" });
    }

    // recupero il corso e ritorno le lezioni
    const corso = await Corso.findById(corsoId);
    if (!corso) {
      return res.status(404).json({ message: "Corso non trovato" });
    }

    res.json(corso.lezioni);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore del server" });
  }
});

//------LATO DOCENTE ----------//
//GET->mostrare tutti le lezioni del docente
router.get("/:corsoId", async(req,res)=>{
  try{
    const corso = await Corso.findById(req.params.corsoId) // prendiamo il corso
    if (!corso) return res.status(404).json({ message: "Corso non trovato" });
    if (corso.docente.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Non autorizzato" });
  }
  res.status(200).json(corso.lezioni);
  }catch(err){
    console.log(err);
  }
})

//POST->inserire lezione del docente del relativo corso
router.post("/add/:corsoId",async(req,res)=>{
  try{
    const { titolo, video } = req.body;  
    const corso = await Corso.findById(req.params.corsoId);
    corso.lezioni.push({ titolo, video });
    await corso.save();
    
    const nuovaLezione = corso.lezioni[corso.lezioni.length - 1];
    res.status(201).json(nuovaLezione);
  }catch(err)
  {res.status(500).json({ message: "Errore del server" });
  }
})
//PUT->aggiornare le lezione del docente relativo al corso
router.put("/:corsoId/:lezioneId",async (req,res)=>{
  try{
    const{titolo,video} = req.body; // prendo dal client titolo e video
    const corso = await Corso.findById(req.params.corsoId); //recupero quale corso ha questo id
    const lezione = corso.lezioni.id(req.params.lezioneId); //recupero a quale lezione è associato questo id
    if (!lezione) {return res.status(404).json({ message: "Lezione non trovata" });}
    lezione.titolo = titolo;
    lezione.video = video;
    await corso.save();
    res.status(201).json(lezione);
  }catch(err)
  {
    res.status(500).json({ message: "Errore del server" });
  }
})
//DELETE->permette di eliminare le lezioni al docente
router.delete("/:corsoId/:lezioneId",async (req,res)=>{
  try{
    const corso = await Corso.findById(req.params.corsoId);
    const lezione = corso.lezioni.id(req.params.lezioneId);
    lezione.deleteOne();
    await corso.save();
    res.json({ message: "Lezione eliminata con successo" });
  }catch(err)
  {
    console.log(err);
  }
})


module.exports = router;
