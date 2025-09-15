import { useState } from "react";
function AddLesson({onSave})
{
    const [nuovaLezione, setNuovalezione] = useState({
    titolo: "",
    video:""
  });

  function handleSave(e){
    e.preventDefault();
    onSave(nuovaLezione);
  };
  

  function handleChange(e)
  {
    const{name,value} = e.target;
    setNuovalezione({...nuovaLezione,[name]:value});
  }
return( 
    <div className="inline-form">
        <form onSubmit={handleSave}>
            <input name="titolo" type="text" placeholder="Titolo Lezione"value={nuovaLezione.titolo}onChange={handleChange} required
            />
            <input name="video"  type="url"  placeholder="Link Lezione" value={nuovaLezione.video}onChange={handleChange} required
            />
            <button>Crea Lezione</button>
        </form>
    </div>
); 
}export default AddLesson