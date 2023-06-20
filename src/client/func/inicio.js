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

const fazerLogin = async () => {
    const usuarioForm = document.getElementById('loginUsuarioForm');
    usuarioForm.addEventListener('submit', verificarLogin); 
}

//Chamadas Back-End pelo Axios

function verificarLogin (event) {
    event.preventDefault(); 
    const inputNome = document.getElementById('LusuarioNome').value; 
    const inputSenha = document.getElementById('LusuarioSenha').value; 

    axios.get(DB_URL)
    .then(resposta => {
        const usuario = resposta.data.usuario;
        const usuarioEncontrado = usuario.find(usuario => usuario.usuarioNome == inputNome && usuario.usuarioSenha == inputSenha);

        if(usuarioEncontrado){
            usuarioLoginNome = usuarioEncontrado.usuarioNome; 
            window.location.href = 'index.html';
        } else{
            console.log('Usuário ou senha inválidos!'); 
            alert('Usuário ou senha inválidos!');
        }
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao verificar login: ' + err.message);
    });
}

//Disparo de evento quando a página carregar

document.addEventListener('DOMContentLoaded', fazerLogin);

