const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const corsiRoutes = require('./routes/corsi');
const lezioniRoutes = require('./routes/lezioni');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connessione al database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso al database'))
  .catch((err) => console.log('Errore di connessione:', err));

  // Rotta per impostare il cookie persistente
app.get('/set-cookie', (req, res) => {
    // Imposta un cookie che scade in 7 giorni
    res.cookie('userSession', '123456', {
        maxAge: 7 * 24 * 60 * 60 * 1000,  // Durata di 7 giorni
        httpOnly: true,  // Non accessibile tramite JavaScript
        path: '/',  // Valido per tutte le pagine del dominio
    });
    res.send('Cookie impostato!');
});


// Rotte
app.use('/api/auth', authRoutes);
app.use('/api/corsi', corsiRoutes);
app.use('/api/lezioni', lezioniRoutes);
app.get('/get-cookie', (req, res) => {
    const userSession = req.cookies.userSession;
    res.send(`Il valore del cookie è: ${userSession}`);
});

// Rotte per le altre 8 pagine
app.get('/CourseLesson', (req, res) => res.send('CourseLesson'));
app.get('/Homepage', (req, res) => res.send('Homepage'));
app.get('/Homepaged', (req, res) => res.send('Homepaged'));
app.get('/Homepages', (req, res) => res.send('Homepages'));
app.get('/Login', (req, res) => res.send('Login'));
app.get('/Signup', (req, res) => res.send('Signup'));
app.get('/StudentLesson', (req, res) => res.send('StudentLesson'));


// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
})
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI non è definito! Verifica il file .env.');
  process.exit(1); // Uscita forzata se la variabile non è definita
}
