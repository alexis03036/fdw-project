import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from'react-router-dom'

function Cards({ title, text, img, id, role, isAddCard, onClick }) {
    const isDocente = role === "docente";
    const isStudente = role === "studente";
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={img} alt="foto" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
          {isDocente && isAddCard &&(<Button variant="secondary" onClick={onClick}>Aggiungi Corso</Button>)} 
          {isDocente && !isAddCard && (<Link to={`/Homepaged/corso/${id}/lezione`}><Button variant="primary">Aggiungi Lezione</Button> </Link>)}
          {isStudente && <Link to={`/studente/lezione/${id}`}><Button variant="info">Visualizza Lezioni</Button> </Link> }
      </Card.Body>
    </Card>
  );
}
export default Cards;