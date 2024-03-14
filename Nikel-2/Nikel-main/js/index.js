// document.getElementById("link-conta").addEventListener("click", function () {
// })

const myModal = new bootstrap.Modal("#registerModal")
let logged = sessionStorage.getItem("logged")
const session = localStorage.getItem("session")
checkLoged()
//Logar no sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const email = document.getElementById("email-input").value
    const senha = document.getElementById("password-input").value
    const session = document.getElementById("session-check").checked

    const account = getAccount(email)
    if (!account) {
        alert("Verifique o usuario ou a senha")
        return
    }

    if (account) {
        if (account.password !== senha) {
            alert("Verifique o usuario ou a senha")
            return
        }
        saveSession(email, session)
        window.location.href = 'home.html'
    }

})

//criar conta
document.getElementById("create-form").addEventListener("submit", function (e) {

    e.preventDefault()

    const email = document.getElementById("email-create-input").value
    const senha = document.getElementById("passowrd-create-input").value
    const repSenha = document.getElementById("password-repeat-create-input").value


    if (email.length < 5) {
        alert("Email invalid!")
        return
    }
    if (senha.length < 4) {
        alert("Preencha o campo com no minimo 4 digitos!")
        return
    }
    if (repSenha !== senha) {
        alert('As senhas nao coincidem')
        return
    }
    saveAccount({
        login: email,
        password: senha
        , transactions: []
    })

    myModal.hide()
    alert("Conta criada com sucesso")
}
)



function saveAccount(data) {

    localStorage.setItem(data.login, JSON.stringify(data))
}

function checkLoged() {
    if (session) {
        sessionStorage.setItem("logged", session)
        logged = session
    }


    if (logged) {
        saveSession(logged, session)

        window.location.href = 'home.html'
    }
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem("session", data)
    }
    sessionStorage.setItem("logged", data)
}
function getAccount(key) {
    const accont = localStorage.getItem(key)

    if (accont) {
        return JSON.parse(accont)
    }

    return ""
}