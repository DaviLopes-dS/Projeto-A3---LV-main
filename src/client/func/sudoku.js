const DB_URL = "http://localhost:8080/usuario"; 

let numEscolhido = null; 
let pedacoEscolhido = null; 
let erros = 0; 
let vitorias = 0; 
let fase = 1; 

let grade = []
let solucaoGrade = []
let gradeOriginal = [...grade]; 

/*
let grade = [
    "--6-----1",
    "-7--6--5-",
    "8--1-32--",
    "--5-4-8--",
    "-4-7-2-9-",
    "--8-1-7--",
    "--12-5--3",
    "-6--7--8-",
    "------4--"
]

let grade = [
    "---827941",
    "172964358",
    "894153267",
    "715349826",
    "643782195",
    "928516734",
    "481295673",
    "369471582",
    "257638419"
]


let solucaoGrade = [
    "536827941",
    "172964358",
    "894153267",
    "715349826",
    "643782195",
    "928516734",
    "481295673",
    "369471582",
    "257638419"
]
*/

//Disparo de evento quando a página carregar

window.onload = function() {
    trocarFase(); 
    prepararTabuleiro(); 
    reiniciar(); 
    terminarSessao(); 
}

window.addEventListener("load", reiniciar); 

//Redirecionamento para a página inicial

function terminarSessao() {
    var formulario = document.getElementById("terminar-sessao"); 
    formulario.addEventListener("click", function() {
        window.location.href = 'login.html';
    }); 
}

//Gerar o tabuleiro do Sudoku

function prepararTabuleiro() {
    for (let i = 1; i <= 9; i++){
        let num = document.createElement("div"); 
        num.id = i; 
        num.innerText = i; 
        num.addEventListener("click", selecionarNum); 
        num.classList.add("numero"); 
        document.getElementById("digitos").appendChild(num); 
    }

    for (let i = 0; i <= 9; i++){
        for (let j = 0; j < 9; j++){
            let pedaco = document.createElement("div"); 
            pedaco.id = i.toString() + "-" + j.toString(); 
            if(grade[i][j] != "-"){
                pedaco.innerText = grade[i][j]; 
                pedaco.classList.add("pedacos-sec"); 
            }
            if(i == 2 || i == 5){
                pedaco.classList.add("linhaH"); 
            }
            if(j == 2 || j ==  5){
                pedaco.classList.add("linhaY"); 
            } 
            pedaco.addEventListener("click", selecionarPedaco); 
            pedaco.classList.add("pedacos"); 
            document.getElementById("grade").append(pedaco); 
        }
    }
}

//Display dos formulários

function gravarRecordeDisplay() {
    var formulario = document.getElementById("abrir-recorde");
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        gravarRecorde(); 
    }); 

    //Ligar-Desligar o formulário
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

function deletarRecordeDisplay() {
    var formulario = document.getElementById("abrir-deletar-recorde");
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        deletarRecorde(); 
    }); 

    //Ligar-Desligar o formulário
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

function observarRecordeDisplay() {
    var formulario = document.getElementById("abrir-observar-recorde");
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        observarRecorde(); 
    }); 

    //Ligar-Desligar o formulário
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

function alterarNomeDisplay() {
    var formulario = document.getElementById("abrir-alterar-nome");
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();
        alterarNome(); 
    }); 

    //Ligar-Desligar o formulário
    if (formulario.style.display === "none") {
        formulario.style.display = "block";
    } else {
        formulario.style.display = "none";
    }
}

//Chamadas Back-End pelo Axios

function gravarRecorde() {
    const usuarioNome = document.getElementById("gravarUsuarioNome").value;

        axios.get(DB_URL)
        .then(resposta => {
            const { usuario } = resposta.data;
            const usuarioSelecionado = usuario.find(usuario => usuario.usuarioNome === usuarioNome);

            if (usuarioSelecionado){
                usuarioSelecionadoId = usuarioSelecionado.id; 

                axios.put(`${DB_URL}/${usuarioSelecionadoId}`, { usuarioVitorias: vitorias})
                .then(resposta => {
                    console.log(resposta); 
                    alert('Usuário e recorde atualizados com sucesso!'); 
                })
                .catch(err => {
                    console.log(err); 
                    alert('Falha em atualizar recorde: ' + err.message); 
                });
            }
        })
        .catch(err => {
            alert('Falha em atualizar recorde:' + err.message); 
        })
}

function deletarRecorde() {
    const usuarioNome = document.getElementById("deletarUsuarioNome").value; 

    axios.get(DB_URL)
    .then(resposta => {
        const { usuario } = resposta.data; 
        const usuarioSelecionado = usuario.find(usuario => usuario.usuarioNome === usuarioNome);

        if (usuarioSelecionado){
            usuarioSelecionadoId = usuarioSelecionado.id; 

            axios.delete(`${DB_URL}/${usuarioSelecionadoId}`)
            .then(resposta => {
                console.log(resposta.data); 
                alert('Usuário e recorde deletados com sucesso!')
            })
            .catch(err => {
                console.log(err); 
                alert('Falha em deletar recorde:' + err.message); 
            }); 
        } else {
            console.log("Usuário não encontrado!"); 
            alert('Usuário não encontrado!'); 
        }
    }) 
    .catch(err => {
        console.log(err); 
        alert('Falha em deletar recorde:' + err.message); 
    })
}

function observarRecorde() {
    const usuarioNome = document.getElementById("observarUsuarioNome").value; 

    axios.get(DB_URL)
    .then(resposta => {
        const { usuario } = resposta.data; 
        const usuarioSelecionado = usuario.find(usuario => usuario.usuarioNome === usuarioNome); 

        if(usuarioSelecionado){
            usuarioSelecionadoVitorias = usuarioSelecionado.usuarioVitorias; 
            const nomeElement = document.getElementById("nomeObservarUsuario"); 
            const vitoriasElement = document.getElementById("vitoriasObservarUsuario"); 

            nomeElement.innerText = `Usuário: ${usuarioNome}`;
            vitoriasElement.innerText = `Vitórias: ${usuarioSelecionadoVitorias}`;
        }
        else {
            console.log("Usuário não encontrado."); 
            alert('Usuário não encontrado'); 
        }
    })
    .catch(err => {
        alert('Falha em encontrar usuário:' + err.message); 
    })
}

function alterarNome() {
    const usuarioNome = document.getElementById("nomeAlterarUsuarioAntigo").value;
    const novoNome = document.getElementById("nomeAlterarUsuarioNovo").value; 

    axios.get(DB_URL)
    .then(resposta => {
      const { usuario } = resposta.data;
      const usuarioSelecionado = usuario.find(usuario => usuario.usuarioNome === usuarioNome);

      if (usuarioSelecionado) {
        const usuarioSelecionadoId = usuarioSelecionado.id;

        axios.patch(`${DB_URL}/${usuarioSelecionadoId}`, { id: usuarioSelecionadoId, usuarioNome: novoNome })
          .then(resposta => {
            console.log(resposta.data);
            alert('Nome de usuário alterado com sucesso!'); 
          })
          .catch(err => {
            console.log(err);
            alert('Falha em alterar nome de usuário:' + err.message); 
          });
      } else {
        console.log("Usuário inserido não encontrado!");
        alert('Usuário inserido não encontrado!'); 
      }
    })
    .catch(err => {
      console.log(err);
      alert('Falha em alterar nome:' + err.message); 
    });
}

//Funções do Sudoku 

function voltarFase() {
    if(fase === 1){
        return; 
    }
    else{
        fase--; 
        trocarFase(); 
    }
}

function avançarFase() {
    if(fase === 3){
        return; 
    }
    else{
        fase++; 
        trocarFase(); 
    }
}

/*
function trocarFase() {
if(fase === 1){
    grade = [
        "--6-----1",
        "-7--6--5-",
        "8--1-32--",
        "--5-4-8--",
        "-4-7-2-9-",
        "--8-1-7--",
        "--12-5--3",
        "-6--7--8-",
        "------4--"
    ]
    
    solucaoGrade = [
        "536827941",
        "172964358",
        "894153267",
        "715349826",
        "643782195",
        "928516734",
        "481295673",
        "369471582",
        "257638419"
    ]
}

if(fase === 2){
    grade = [
        "---827941",
        "172964358",
        "894153267",
        "715349826",
        "643782195",
        "928516734",
        "481295673",
        "369471582",
        "257638419"
    ]
    
    solucaoGrade = [
        "536827941",
        "172964358",
        "894153267",
        "715349826",
        "643782195",
        "928516734",
        "481295673",
        "369471582",
        "257638419"
    ]
}

gradeOriginal = [...grade]; 

reiniciarJogo(); 
}
*/

function trocarFase() {
    const grades = [
        [
            "--6-----1",
            "-7--6--5-",
            "8--1-32--",
            "--5-4-8--",
            "-4-7-2-9-",
            "--8-1-7--",
            "--12-5--3",
            "-6--7--8-",
            "------4--"
        ],
        [
            "---827941",
            "172964358",
            "894153267",
            "715349826",
            "643782195",
            "928516734",
            "481295673",
            "369471582",
            "257638419"
        ]
    ];

    const solucoes = [
        [
            "536827941",
            "172964358",
            "894153267",
            "715349826",
            "643782195",
            "928516734",
            "481295673",
            "369471582",
            "257638419"
        ],
        [
            "536827941",
            "172964358",
            "894153267",
            "715349826",
            "643782195",
            "928516734",
            "481295673",
            "369471582",
            "257638419"
        ]
    ];

    if (fase >= 1 && fase <= grades.length) {
        grade = grades[fase - 1];
        solucaoGrade = solucoes[fase - 1];
    }

    gradeOriginal = [...grade];

    reiniciarJogo();
}

function verificarVitoria() {
    console.log("Chamada confirmada.");
    const gradeOG = grade.map(row => row.split("").map(Number));
  
    if (compararGrades(gradeOG, solucaoGrade)) {
      console.log("Teste efetuado com sucesso.");
      vitorias += 1; 
      reiniciarJogo(); 
    }

    console.log(vitorias); 
  }
  
function compararGrades(gra1, gra2) {
    if (gra1.length !== gra2.length) {
      return false;
    }

    for (let i = 0; i < gra1.length; i++) {
      if (gra1[i].length !== gra2[i].length) {
        return false;
      }
      
      for (let j = 0; j < gra1[i].length; j++) {
        const num1 = gra1[i][j];
        const num2 = Number(gra2[i][j]);

        if (num1 !== num2) {
          return false;
        }
      }
    }
    return true;
}

function selecionarPedaco() {
    if(numEscolhido) {
        if(this.innerText != "") {
            return; 
        }

        let cord = this.id.split("-");
        let i = parseInt(cord[0]); 
        let j = parseInt(cord[1]); 

        if(solucaoGrade[i][j] == numEscolhido.id){
            this.innerText = numEscolhido.id;
            grade[i] = grade[i].substring(0, j) + numEscolhido.id + grade[i].substring(j + 1);
        }
        else{
            erros +=1; 
            document.getElementById("erros").innerText = erros; 
        }

        if(erros >= 3) {
            reiniciarJogo(); 
        }

        console.log(grade); 
        console.log(gradeOriginal); 
        console.log(solucaoGrade); 

        verificarVitoria(); 
    }
}

function reiniciar() {
    let reiniciarbtn = document.getElementById("reiniciar"); 
    reiniciarbtn.addEventListener("click", reiniciarJogo); 
} 

/*
function reiniciarJogo(){
    numEscolhido = null; 
    pedacoEscolhido = null; 
    erros = 0; 
    document.getElementById("erros").innerText = erros; 

    grade = [...gradeOriginal]; 

    let pedacos = document.getElementsByClassName("pedacos"); 

    for (let i = 0; i < pedacos.length; i++){
        let cord = pedacos[i].id.split("-"); 
        let linha = parseInt(cord[0]); 
        let coluna = parseInt(cord[1]); 
        if (gradeOriginal[linha][coluna] != '-') {
            pedacos[i].innerText = gradeOriginal[linha][coluna]; 
        }
        else {
            pedacos[i].innerText = ""; 
        }
    }
}
*/

function reiniciarJogo() {
    numEscolhido = null;
    pedacoEscolhido = null;
    erros = 0;
    document.getElementById("erros").innerText = erros;

    grade = [...gradeOriginal];

    const pedacos = document.getElementsByClassName("pedacos");

    for (let i = 0; i < pedacos.length; i++) {
        const pedaco = pedacos[i];
        const cord = pedaco.id.split("-");
        const linha = parseInt(cord[0]);
        const coluna = parseInt(cord[1]);
        if (grade[linha][coluna] !== "-") {
            pedaco.innerText = grade[linha][coluna];
            pedaco.classList.add("pedacos-sec");
        } else {
            pedaco.innerText = "";
            pedaco.classList.remove("pedacos-sec");
        }
    }

    verificarVitoria();
}

function selecionarNum() {
    if (numEscolhido != null) {
        numEscolhido.classList.remove("numero-sec"); 
    }
    numEscolhido = this; 
    numEscolhido.classList.add("numero-sec"); 
}