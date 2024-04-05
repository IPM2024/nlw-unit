let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 20, 00)
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 1, 5, 20, 10)
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 25, 18, 45)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    dataInscricao: new Date(2024, 2, 23, 11, 15),
    dataCheckIn: new Date(2024, 2, 25, 19, 30)
  },
  {
    nome: "Lúcia Santos",
    email: "lucia.santos@example.com",
    dataInscricao: new Date(2024, 2, 23, 14, 40),
    dataCheckIn: new Date(2024, 2, 25, 21, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro.almeida@example.com",
    dataInscricao: new Date(2024, 2, 24, 9, 10),
    dataCheckIn: new Date(2024, 2, 25, 17, 00)
  },
  {
    nome: "Mariana Costa",
    email: "mariana.costa@example.com",
    dataInscricao: new Date(2024, 2, 24, 10, 20),
    dataCheckIn: new Date(2024, 2, 25, 18, 15)
  },
  {
    nome: "Rafael Lima",
    email: "rafael.lima@example.com",
    dataInscricao: new Date(2024, 2, 24, 13, 05),
    dataCheckIn: new Date(2024, 2, 25, 20, 40)
  },
  {
    nome: "Isabela Rodrigues",
    email: "isabela.rodrigues@example.com",
    dataInscricao: new Date(2024, 2, 25, 8, 50),
    dataCheckIn: new Date(2024, 2, 25, 16, 30)
  },
  {
    nome: "Gustavo Ferreira",
    email: "gustavo.ferreira@example.com",
    dataInscricao: new Date(2024, 2, 25, 9, 30),
    dataCheckIn: new Date(2024, 2, 25, 17, 45)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null ){
      dataCheckIn = `
        <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
          Confirmar check-in
        </button>
      `
  }
  
  return `
  <tr>
  <td>
    <strong>
      ${participante.nome}
    </strong>
      </br>
    <small>
      ${participante.email}
    </small>
  </td>
  <td>${dataInscricao}</td>
  <td>${dataCheckIn}</td>
</tr>
`
}

const atualizarLista = (participantes) =>{
let output = ""
  //estrutura de repeticao
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
  }

  //substituir informacao do HTML
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

//verificar se participante ja existe
const participanteExiste = participantes.find((p) => p.email == participante.email
)

if(participanteExiste){
  alert('Email já cadastrado')
  return
}

participantes =  [participante, ...participantes]
atualizarLista(participantes)

event.target.querySelector('[name="nome"]').value = ""
event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
//confirmar se realmente quer o check-in
const mensagemConfirmacao = 'Tem certeza que deseja fazer o chech-in?'
if(confirm(mensagemConfirmacao) == false){
  return
}
 //encontrar participante dentro da lista
const participante = participantes.find((p) => p.email == event.target.dataset.email
)
 //atualizar o check-in do participante
participante.dataCheckIn = new Date()

 //atualizar a lista de participantes
atualizarLista(participantes)
}

