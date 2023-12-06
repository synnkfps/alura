function mostrarMensagem(titulo, mensagem, seletor) {
    console.log(`[AL] Criando popup: {titulo: ${titulo}, mensagem: ${mensagem}, seletor: ${seletor}}`)
    document.body.innerHTML += `
    <div class="popup" id="${seletor}">
        <div class="popup_titulo">${titulo}</div>
        <hr>
        <div class="popup_mensagem">${mensagem}</div>
        <hr>
        <div class="popup_aceitar" onclick="fechar('${seletor}')">OK</div>
    </div>`
    localStorage.setItem(seletor, true)
}

function fechar(seletor) {
    localStorage.setItem(seletor, !localStorage.getItem(seletor))
    document.querySelector(`.popup#${seletor}`).style.display = localStorage.getItem(seletor)?'flex':'hidden';
    console.log('[AL] Fechando popup com seletor: ' + document.querySelector(`#${seletor}`))
}

// cadastrar 
function cadastrar(user, pass) {
    let usuario = document.querySelector('.username').value;
    let password = document.querySelector('.password').value;
    
    if (!usuario) {
        mostrarMensagem('Erro', 'Coloque um usuário válido', 'erro_user')
    }
    if (!password) {
        mostrarMensagem('Erro', 'Coloque uma senha de no minimo 3 caracteres', 'erro_senha')
    }

    if (localStorage.getItem(usuario)) {
        mostrarMensagem('Erro', 'Este usuário já está cadastrado', 'erro_cadastro')
    } else {
        localStorage.setItem(usuario, password)
        mostrarMensagem('Sucesso', 'Usuário cadastrado com sucesso!', 'aceitou_cadastro')
    }
}

// logar
function logar(user, pass) {
    let usuario = document.querySelector('.username').textContent;
    let password = document.querySelector('.password').textContent;

    logar(usuario, password);
    if (!(localStorage.getItem(usuario) == password)) {
        mostrarMensagem('Erro', 'Senha incorreta para este usuario', 'erro_login')
    }
}

//window.onload = function(){  
//
//}