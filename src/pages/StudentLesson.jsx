import { corsi, users } from "../User";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "./StudentLesson.css";
import { useState, useEffect } from "react";

function StudentLesson() {
  let IsLezioni = false;
  let corsoScelto = {};
  const { corsoId } = useParams();
  const id_studente = 3;
  const studente_loggato = users.find(
    (std) => std.id == id_studente && std.role == "studente"
  ); // prendilo dai cookie
  const corsoIdN = parseInt(corsoId);

  const [lezioni, setLezioni] = useState([]); // Stato locale delle lezioni
  if (studente_loggato.corsiIscritti.includes(corsoIdN)) {
    corsoScelto = corsi.find((c) => c.id === corsoIdN);
    IsLezioni = true;
  }

  useEffect(() => {
    if (corsoScelto.lezioni) {
      setLezioni(corsoScelto.lezioni);
    }
  }, [corsoScelto.lezioni]);

  return (
    <>
      <div className="videoplayer">
        {IsLezioni && (
          <ReactPlayer
            src={"https://www.youtube.com/watch?v=FVgMicWDHOI"}
            config={{ youtube: { color: "white" } }}
          />
        )}
      </div>
    </>
  );
}
export default StudentLesson;
