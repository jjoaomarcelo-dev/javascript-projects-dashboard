/*
DESAFIO 25 — Status de tarefas

Objetivo
Praticar objetos literais, find(), alteração de propriedades e atualização do DOM.

Enunciado
Desenvolva uma lista de tarefas que permita cadastrar, consultar, atualizar o status e remover itens.

Requisitos e limites
- Represente cada tarefa como um objeto literal com título e status de conclusão.
- Não aceite títulos vazios ou compostos apenas por números.
- Trate diferenças de caixa e espaços extras como a mesma tarefa.
- Atualize somente a propriedade de status quando uma tarefa existente for cadastrada novamente.
- Mantenha lista e total sincronizados após cada alteração.

Exemplos para conferir
Cadastre "Praticar find" como pendente. Cadastre de novo como concluída.
A lista deve continuar com uma única tarefa, agora concluída.
*/

const tituloTarefa = document.querySelector("#tituloTarefa")
const statusTarefa = document.querySelector("#statusTarefa")

const btnSalvar = document.querySelector("#btnSalvar")
const btnConsultar = document.querySelector("#btnConsultar")
const btnRemover = document.querySelector("#btnRemover")

const resultado = document.querySelector("#resultado")
const totalTarefas = document.querySelector("#totalTarefas")
const listaTarefas = document.querySelector("#listaTarefas")

const tarefas = [
    { titulo: "Estudar objetos", concluida: true },
    { titulo: "Praticar find", concluida: false },
    { titulo: "Assistir aula de herança", concluida: false }
]

const formatarTitulo = (texto) => {
    return texto
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ")
}

const mostrarMensagem = (texto) => {
    resultado.textContent = texto
}

const obterTituloValido = () => {
    const tituloFormatado = formatarTitulo(tituloTarefa.value)

    if (tituloFormatado === "" || !Number.isNaN(Number(tituloFormatado))) {
        mostrarMensagem("Informe um título de tarefa válido.")
        return null
    }

    return tituloFormatado
}

const limparCampos = () => {
    tituloTarefa.value = ""
    statusTarefa.value = "pendente"
}

const atualizarLista = () => {
    totalTarefas.textContent = tarefas.length
    listaTarefas.textContent = ""

    if (tarefas.length === 0) {
        listaTarefas.textContent = "Nenhuma tarefa cadastrada."
        return
    }

    tarefas.forEach((tarefa) => {
        const cardTarefa = document.createElement("article")
        cardTarefa.classList.add("tarefa-card")

        const titulo = document.createElement("h3")
        titulo.textContent = tarefa.titulo

        const status = document.createElement("span")
        status.classList.add("status-tarefa")
        status.classList.add(tarefa.concluida ? "status-concluida" : "status-pendente")
        status.textContent = tarefa.concluida ? "Concluída" : "Pendente"

        cardTarefa.append(titulo, status)
        listaTarefas.append(cardTarefa)
    })
}

btnSalvar.addEventListener("click", () => {
    const tituloFormatado = obterTituloValido()

    if (tituloFormatado === null) {
        return
    }

    const concluida = statusTarefa.value === "concluida"
    const tarefaEncontrada = tarefas.find(tarefa => tarefa.titulo === tituloFormatado)

    if (tarefaEncontrada) {
        tarefaEncontrada.concluida = concluida
        mostrarMensagem(`O status de ${tituloFormatado} foi atualizado.`)
    } else {
        tarefas.push({ titulo: tituloFormatado, concluida })
        mostrarMensagem(`${tituloFormatado} foi adicionada à lista.`)
    }

    limparCampos()
    atualizarLista()
})

btnConsultar.addEventListener("click", () => {
    const tituloFormatado = obterTituloValido()

    if (tituloFormatado === null) {
        return
    }

    const tarefaEncontrada = tarefas.find(tarefa => tarefa.titulo === tituloFormatado)

    if (!tarefaEncontrada) {
        mostrarMensagem("Tarefa não encontrada.")
        return
    }

    const status = tarefaEncontrada.concluida ? "concluída" : "pendente"
    mostrarMensagem(`${tarefaEncontrada.titulo} está ${status}.`)
})

btnRemover.addEventListener("click", () => {
    const tituloFormatado = obterTituloValido()

    if (tituloFormatado === null) {
        return
    }

    const tarefaEncontrada = tarefas.find(tarefa => tarefa.titulo === tituloFormatado)

    if (!tarefaEncontrada) {
        mostrarMensagem("Tarefa não encontrada.")
        return
    }

    const indiceTarefa = tarefas.indexOf(tarefaEncontrada)
    tarefas.splice(indiceTarefa, 1)
    mostrarMensagem(`${tituloFormatado} foi removida da lista.`)
    limparCampos()
    atualizarLista()
})

tituloTarefa.addEventListener("click", () => tituloTarefa.select())

atualizarLista()
