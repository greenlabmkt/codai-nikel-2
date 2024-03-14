const myModal = new bootstrap.Modal("#transaction-modal")
let logged = sessionStorage.getItem("logged")
const session = localStorage.getItem("session")


let data = {
    transactions: []
}
document.getElementById("logout").addEventListener("click", logout)

//Adicionar lancamento
document.getElementById("transaction-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const value = parseFloat(document.getElementById("value-input").value)
    const description = document.getElementById("description-input").value
    const date = document.getElementById("date-input").value

    const type = document.querySelector('input[name="type-input"]:checked').value
    let saldoTotal = 0
    let mensagem = "Adicionado com sucesso."

    for (const transaction of data.transactions) {
        if (transaction.type === "1") {
            saldoTotal += transaction.value;
        } else {
            saldoTotal -= transaction.value;
        }
    }
    const saldoComDespesa = saldoTotal - value;
    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    })

    if (saldoComDespesa < 0) {
        mensagem = 'Negativado com sucesso'
        alert("Seu saldo após cadastrar essa despesa será negativo.");
    }




    saveData(data)
    e.target.reset()
    myModal.hide()
    getCashIn()
    getCashOut()
    getTotal()
    alert(mensagem)

})

checkLoged()

function checkLoged() {
    if (session) {
        sessionStorage.setItem("logged", session)
        logged = session
    }


    if (!logged) {

        window.location.href = 'home.html'
        return
    }

    const dataUser = localStorage.getItem(logged)
    if (dataUser) {
        data = JSON.parse(dataUser)
    }
    getCashIn()
    getCashOut()
    getTotal()

}
function logout() {
    sessionStorage.removeItem("logged")
    localStorage.removeItem("session")

    window.location.href = 'index.html'
}


function getCashIn() {
    const transactions = data.transactions

    const cashIn = transactions.filter((item) => item.type === '1')


    if (cashIn.length) {
        let cashinHtml = ``
        let limit = 0

        if (cashIn.length > 5) {
            limit = 5
        } else {
            limit = cashIn.length
        }
        for (let index = 0; index < limit; index++) {
            cashinHtml += `
                                    <div class="row mb-4">
                                        <div class="col-12">
                                            <h3>
                                                ${cashIn[index].value.toFixed(2)}
                                            </h3>
                                            <div class="container p-0">
                                                <div class="row">
                                                    <div class="col-12 col-md-8">
                                                        <p>
                                                        ${cashIn[index].description}
                                                        </p>
                                                    </div>
                                                    <div class="col-12 col-md-3 d-flex justify-content-end">
                                                    ${cashIn[index].date}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `

        }
        document.getElementById("cashInList").innerHTML = cashinHtml
    }

}
function getCashOut() {
    const transactions = data.transactions

    const cashIn = transactions.filter((item) => item.type === '2')


    if (cashIn.length) {
        let cashinHtml = ``
        let limit = 0

        if (cashIn.length > 5) {
            limit = 5
        } else {
            limit = cashIn.length
        }
        for (let index = 0; index < limit; index++) {
            cashinHtml += `
                                    <div class="row mb-4">
                                        <div class="col-12">
                                            <h3>
                                                ${cashIn[index].value.toFixed(2)}
                                            </h3>
                                            <div class="container p-0">
                                                <div class="row">
                                                    <div class="col-12 col-md-8">
                                                        <p>
                                                        ${cashIn[index].description}
                                                        </p>
                                                    </div>
                                                    <div class="col-12 col-md-3 d-flex justify-content-end">
                                                    ${cashIn[index].date}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `

        }
        document.getElementById("cashOutList").innerHTML = cashinHtml
    }

}
function getTotal() {
    const transactions = data.transactions
    let total = 0

    transactions.forEach((item) => {
        if (item.type === '1') {
            total += item.value
        } else {
            total -= item.value
        }
    })
    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}