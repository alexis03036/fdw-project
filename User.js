export const users = [
  {
    id: 1,
    nome: "Ferrara",
    email: "docente@gmail.com",
    password: "ciao12",
    role: "docente",
    corsiCreati: [3, 4]
  },
  {
    id: 2,
    nome: "Antonio",
    email: "docente@gmail.com",
    password: "ciao12",
    role: "docente",
    corsiCreati: [5]
  },
  {
    id: 3,
    nome: "Gianmarco",
    email: "studente@gmail.com",
    password: "ciao12",
    role: "studente",
    corsiIscritti: [3]
  },
  {
    id: 4,
    nome: "Alessio",
    email: "studente@gmail.com",
    password: "ciao12",
    role: "studente",
    corsiIscritti: [5]
  }
];


export const corsi =[
   {
    id:3,
    titolo:"matematica",
    descrizione:"Corso introduttivo di matemamatica",
    img:"https://www.libraccio.it/images/9788855052689_0_500_0_75.jpg",
    id_docente:1,
    lezioni:[
        {
            id:1,
            titolo:"introduzione",
            video:"https://www.youtube.com/watch?v=nGCbgnNJ4CY",
        },
        {
            id:2,
            titolo:"funzioni",
            video:"https://www.youtube.com/watch?v=nGCbgnNJ4CY",
        }
    ]
   },
   {
    id:4,
    titolo:"italiano",
    descrizione:"Corso introduttivo di matemamatica",
    id_docente:1,
    img:"https://www.libraccio.it/images/9788855052689_0_500_0_75.jpg",
   },
   {
    id:5,
    titolo:"Geografia",
    descrizione:"Corso introduttivo di matemamatica",
    id_docente:2,
    img:"https://www.libraccio.it/images/9788855052689_0_500_0_75.jpg"
   },
]