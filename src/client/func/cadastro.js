const DB_URL = "http://localhost:8080/usuario"; 

const pegarDados = async () => {
    axios.get(DB_URL)
        .then(resposta => {
            const usuarioData = resposta.data; 
            console.log(usuarioData); 
        })
        .catch (err => {
            console.error(err); 
        }); 
}

//Visibilidade dos formulários

const cadastrarUsuario = async () => {
    const formulario = document.getElementById('cadastroForm'); 
    formulario.addEventListener('submit', enviarUsuario); 
}

//Chamadas Back-End pelo Axios

function enviarUsuario (event) {
    event.preventDefault(); 
    const inputNome = document.getElementById('cadastroUsuarioNome').value; 
    const inputSenha = document.getElementById('cadastroUsuarioSenha').value; 

    const input = { usuarioNome: inputNome, usuarioSenha: inputSenha }; 

    axios.post(DB_URL, input)
    .then(resposta => {
        console.log(resposta);
        alert('Usuário cadastrado com sucesso!'); 
    })
    .catch(err => {
        console.error(err); 
        alert('Erro ao cadastrar usuário: ' + err.message); 
    });
}

//Disparo de evento quando a página carregar

document.addEventListener('DOMContentLoaded', cadastrarUsuario);
