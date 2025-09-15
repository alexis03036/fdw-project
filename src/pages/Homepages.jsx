import React, { useState } from "react"; // Importa React e useState insieme
import Navbar from "../components/Navbar";
import { users, corsi } from "../User";
import Container from "react-bootstrap/Container";
import Cards from "../components/Cards";
import ListaCorsiDisponibili from "../components/ListaCorsiDisponibili";
import "./Homepages.css";

function Homepages() {
  const studenteLoggatoId = 3;
  const studente = users.find(
    (u) => u.id === studenteLoggatoId && u.role === "studente"
  );

  const [corsiIscritti, setCorsiIscritti] = useState([]);

  const handleIscriviti = (corso) => {
    if (!corsiIscritti.find((c) => c.id === corso.id)) {
      setCorsiIscritti([...corsiIscritti, corso]);
    }
    {
      /*Corso è un oggetto che viene passato da ListaCorsiDisponibile, dove viene controllato se il corso non sta gia presente in corsiIscritti allora lo aggiunge  */
    }
    {
      /* Nel caso in cui non ci fosse stato aggiungerebbe lo stesso corso più volte del necessario */
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-student">
        <Container>
          <h1 className="h1-student">Tutti i corsi disponibili</h1>
          <ListaCorsiDisponibili corsi={corsi} onIscriviti={handleIscriviti} />
          {corsiIscritti.length > 0 && (
            <>
              <h3>Corsi a cui sei iscritto:</h3>
              <div className="container-card-student">
                {corsiIscritti.map((corso) => (
                  <Cards
                    key={corso.id}
                    id={corso.id}
                    title={corso.titolo}
                    text={corso.descrizione}
                    img={corso.img}
                    isAddCard={false}
                    role="studente"
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </div>
    </>
  );
}

export default Homepages;
