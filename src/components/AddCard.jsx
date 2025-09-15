import { useState } from "react";
import './AddCard.css'
function AddCard({ onSave, onClose }) {

  const [nuovoCorso, setNuovoCorso] = useState({
    titolo: "",
    descrizione: "",
    img: ""
  });

  //creo uno stato per gestire i nuovi corsi 
  function handleChange(e){
    const { name, value } = e.target;
    setNuovoCorso({ ...nuovoCorso, [name]: value });
  };

  //Ad ogni scrittura nel form, viene preso da e.target il nome del campo e il valore che assume
  //viene abilitato  il setter "SetNuovoCorso" che serve a prende il vecchio oggetto e gli va ad aggiungere le proprietà nuove
  function handleSave(){
    onSave(nuovoCorso);
  };
  //viene chiamato tramite riferimento la funzione per aggiungere il corso passandogli la variaible di stato con i nuovo corsi che dovranno essere aggiunti

  return (
    
    <div className="inline-form">
        <form onSubmit={handleSave}>
            <input name="titolo" placeholder="Nome Corso"value={nuovoCorso.titolo} onChange={handleChange} required
            />
            <input name="descrizione" placeholder="Descrizione Corso" value={nuovoCorso.descrizione} onChange={handleChange} required
            />
            <input name="img" placeholder="URL immagine"value={nuovoCorso.img}onChange={handleChange} 
            />
            <button>Salva Corso</button>
            <button onClick={onClose}>Annulla</button>
        </form>
    </div>
  );
}
export default AddCard;
