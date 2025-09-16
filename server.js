const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const corsiRoutes = require("./routes/corsi");
const lezioniRoutes = require("./routes/lezioni");
const authMiddleware = require("./middlewares/auth");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*", // tutti i domini
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // se usi Authorization
  })
);
app.use(cookieParser());

console.log("MONGO_URI:", process.env.MONGO_URI); // Debug: verifica se la variabile è definita

// Connessione al database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso al database"))
  .catch((err) => console.log("Errore di connessione:", err));

// Rotte
app.use("/api/auth", authRoutes);
app.use("/api/corsi", authMiddleware, corsiRoutes);
app.use("/api/lezioni", authMiddleware, lezioniRoutes);

// Avvio del server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI non è definito! Verifica il file .env.");
  process.exit(1); // Uscita forzata se la variabile non è definita
}
