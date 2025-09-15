import { useState } from "react";
import NavBar from "../components/Navbar";
import "./Login.css";
import Button from "react-bootstrap/Button";
import { users } from "../User";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../main";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch(API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Login errato, assirurati di aver inserito i dati corretti");
        }
        return response.json();
      })
      .then((data) => {
        // Navigate based on user role
        if (data.role === "DOCENTE") {
          navigate("/Homepaged");
        } else if (data.role === "STUDENTE") {
          navigate("/Homepages");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  }
  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    /*Serve ad aggiornare uno specifico campo dello stato formData,senza perdere altri campi
        ...=>spread operator copia tutti i campi dell'oggetto in un nuovo oggetto
        e.target =>è l'elemento che ha generatore l'evento
        [e.target.name] => CHIAVE DINAMICA, crea o aggiorna la proprietà con il nome contenuto in e.target.name
         */
  }

  return (
    <>
      <NavBar></NavBar>
      <div className="container-login-singup">
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <h1>Login+{API_URL}</h1>
            <div className="input-box">
              <input
                name="email"
                value={formData.email}
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <input
                name="password"
                value={formData.password}
                type="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
              />
            </div>
            <Button variant="outline-primary" type="submit">
              Accedi
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
