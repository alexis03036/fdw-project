import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { corsi } from "../User";
import AddLesson from '../components/AddLesson';
import './CurseLesson.css'
import NavBar from "../components/Navbar"
function CourseLesson()
{
    const { corsoId } = useParams(); // prendi l'id dal path
    const corso = corsi.find(c => c.id == corsoId); // salvare il corso in corso
    const [lezioni, setLezioni] = useState([]);// Stato locale delle lezioni

    //ad aogni aggiornamento 
    useEffect(() => {
    if (corso.lezioni) {
      setLezioni(corso.lezioni);}
    },[corso.lezioni]);

    //-------PARTE RELATIVA AL FORM
    const [showForm,setShowForm] = useState(false); // serve per visualizzare o meno il pulsante

    const handleAddLesson = (nuovaLezione) => 
    {
        setLezioni([...lezioni, { id: Date.now(), ...nuovaLezione }]);
        setShowForm(false);
    };
    //allora viene messo lo spreadoperator ...nuovaLezione perchè voglio il contenuto, senza mi andrebbe ad aggiungere l'oggetto nuovalezione
    return(
        <>
        <NavBar/>
        <div className="container-table">
         <h1>Corso di {corso.titolo}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Numero Lezione</th>
                            <th>Titolo Lezione</th>
                            <th>Link Lezione</th>
                        </tr>
                    </thead>
                    <tbody>
                    {lezioni.length > 0 ?
                     (
                        lezioni.map(l =>(
                        <tr key={l.id}>
                        <td> {l.id}</td>
                        <td> {l.titolo}</td>
                        <td> {l.video}</td>
                        </tr>
                        )) 
                     ) : <p> NESSUNA LEZIONE TROVATA</p>
                    }
                    </tbody>
                </table>
                    <div className="button-container">
                    <button onClick={() => setShowForm(!showForm)}>AGGIUNGI LEZIONE</button>
                    </div>
                {showForm && <AddLesson onSave={handleAddLesson} />}
        </div>
        </>
    );
}export default CourseLesson