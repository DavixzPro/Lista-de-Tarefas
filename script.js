// ==========================
// ELEMENTOS
// ==========================

const inputTitulo =
    document.getElementById("titulo")

const inputDescricao =
    document.getElementById("descricao")

const inputPrazo =
    document.getElementById("prazo")

const botaoAdicionar =
    document.getElementById("adicionar")

const listaTarefas =
    document.getElementById("lista-tarefas")


// ==========================
// ARRAY
// ==========================

let tarefas = []


// ==========================
// INICIAR APP
// ==========================

carregarTarefas()


// ==========================
// EVENTOS
// ==========================

botaoAdicionar.addEventListener(
    "click",
    adicionarTarefa
)

inputPrazo.addEventListener(
    "input",
    formatarDataInput
)


// ==========================
// FORMATAR INPUT DATA
// ==========================

function formatarDataInput(e) {

    let valor = e.target.value

    // remove tudo que não é número
    valor = valor.replace(/\D/g, "")

    // limita em 8 números
    valor = valor.substring(0, 8)

    // adiciona barras
    if (valor.length > 4) {

        valor =
            valor.replace(
                /(\d{2})(\d{2})(\d+)/,
                "$1/$2/$3"
            )

    } else if (valor.length > 2) {

        valor =
            valor.replace(
                /(\d{2})(\d+)/,
                "$1/$2"
            )
    }

    e.target.value = valor
}


// ==========================
// ADICIONAR
// ==========================

function adicionarTarefa() {

    const titulo =
        inputTitulo.value.trim()

    const descricao =
        inputDescricao.value.trim()

    const prazo =
        inputPrazo.value.trim()

    if (titulo === "") {

        alert("Digite um título")

        return
    }

    const novaTarefa = {

        id: Date.now(),

        titulo: titulo,

        descricao: descricao,

        prazo: prazo,

        concluida: false
    }

    tarefas.push(novaTarefa)

    salvarTarefas()

    renderizarTarefas()

    limparInputs()
}


// ==========================
// RENDERIZAR
// ==========================

function renderizarTarefas() {

    listaTarefas.innerHTML = ""

    tarefas.forEach(tarefa => {

        const card =
            document.createElement("div")

        card.classList.add("tarefa")

        if (tarefa.concluida) {
            card.classList.add("concluida")
        }

        card.innerHTML = `
        
            <div class="topo">

                <h2>
                    ${tarefa.titulo}
                </h2>

                <span class="data">
                    ${tarefa.prazo || "Sem data"}
                </span>

            </div>

            <div class="inferior">

                <p class="descricao">
                    ${tarefa.descricao || "Sem descrição"}
                </p>

                <div class="botoes">

                    <button
                        class="btn-concluir"
                        onclick="concluirTarefa(${tarefa.id})"
                    >
                        ✔
                    </button>

                    <button
                        class="btn-remover"
                        onclick="removerTarefa(${tarefa.id})"
                    >
                        🗑
                    </button>

                </div>

            </div>
        `

        listaTarefas.appendChild(card)
    })
}


// ==========================
// CONCLUIR
// ==========================

function concluirTarefa(id) {

    tarefas.forEach(tarefa => {

        if (tarefa.id === id) {

            tarefa.concluida =
                !tarefa.concluida
        }
    })

    salvarTarefas()

    renderizarTarefas()
}


// ==========================
// REMOVER
// ==========================

function removerTarefa(id) {

    tarefas =
        tarefas.filter(
            tarefa => tarefa.id !== id
        )

    salvarTarefas()

    renderizarTarefas()
}


// ==========================
// SALVAR
// ==========================

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    )
}


// ==========================
// CARREGAR
// ==========================

function carregarTarefas() {

    const tarefasSalvas =
        localStorage.getItem("tarefas")

    if (tarefasSalvas) {

        tarefas =
            JSON.parse(tarefasSalvas)

        renderizarTarefas()
    }
}


// ==========================
// LIMPAR INPUTS
// ==========================

function limparInputs() {

    inputTitulo.value = ""

    inputDescricao.value = ""

    inputPrazo.value = ""
}