const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // prendo dai cookie il token
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  // se non c'è il token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accesso negato. Token non fornito." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified._id) next();
  } catch (err) {
    console.error("Token verification failed:", err); // Debug: errore di verifica
    res.status(401).json({ message: "Token non valido." });
  }
}

module.exports = verifyToken;
