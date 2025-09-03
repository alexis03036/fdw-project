import React, { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Campi form
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  // Errori per campo
  const [errors, setErrors] = useState({ name: "", email: "", password: "", general: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser(token);
  }, []);

  const fetchUser = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Token non valido");
      const data = await response.json();
      setUser(data);
    } catch {
      handleLogout();
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({ name: "", email: "", password: "", general: "" });

    // Validazione client-side
    const newErrors = {};
    if (isRegistering && !form.name) newErrors.name = "Il nome è obbligatorio";
    if (!form.email) newErrors.email = "L’email è obbligatoria";
    if (!form.password) newErrors.password = "La password è obbligatoria";

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
      setLoading(false);
      return;
    }

    try {
      const url = isRegistering
        ? "http://localhost:3000/api/register"
        : "http://localhost:3000/api/login";

      const body = isRegistering
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        if (isRegistering && data.message.includes("Email")) setErrors({ ...errors, email: data.message });
        else setErrors({ ...errors, general: data.message });
        setLoading(false);
        return;
      }

      if (isRegistering) {
        alert("Registrazione completata! Ora puoi fare login.");
        setIsRegistering(false);
      } else {
        setUser(data);
        localStorage.setItem("token", data.token);
      }

      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setErrors({ ...errors, general: "Errore di rete" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav style={{ padding: "10px" }}>
      {user ? (
        <>
          <span>Benvenuto, {user.name}!</span>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
        </>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" }}>
          {isRegistering && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
                style={{ border: errors.name ? "2px solid red" : "1px solid #ccc", padding: "5px" }}
              />
              {errors.name && <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>}
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={{ border: errors.email ? "2px solid red" : "1px solid #ccc", padding: "5px" }}
          />
          {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={{ border: errors.password ? "2px solid red" : "1px solid #ccc", padding: "5px" }}
          />
          {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}

          <button type="submit" disabled={loading} style={{ padding: "5px" }}>
            {loading ? "Caricamento..." : isRegistering ? "Registrati" : "Login"}
          </button>

          {errors.general && <span style={{ color: "red", fontSize: "12px" }}>{errors.general}</span>}

          <button type="button" onClick={() => setIsRegistering(!isRegistering)} style={{ marginTop: "5px", padding: "5px" }}>
            {isRegistering ? "Hai già un account? Login" : "Nuovo utente? Registrati"}
          </button>
        </form>
      )}
    </nav>
  );
}

export default Navbar;