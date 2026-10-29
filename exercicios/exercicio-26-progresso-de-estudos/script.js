/*
DESAFIO 26 — Progresso de estudos

Objetivo
Praticar some(), find(), filter(), map(), validação e atualização do DOM.

Enunciado
Desenvolva um acompanhamento de estudos que permita cadastrar, consultar, atualizar, remover e filtrar registros.

Requisitos e limites
- Represente cada estudo com tema, categoria, horas e status.
- Não aceite tema vazio ou composto apenas por números.
- Exija categoria, horas inteiras maiores ou iguais a zero e status válido.
- Atualize um estudo existente pelo mesmo tema, sem duplicá-lo.
- Use filter() para exibir estudos por status e map() para montar os cards mostrados na tela.

Exemplos para conferir
Cadastre Objetos como pendente com 3 horas. Depois atualize para concluído com 5 horas.
Deve haver apenas um estudo de Objetos. Ao filtrar pendentes, ele não deve aparecer.
*/

const temaEstudo = document.querySelector("#temaEstudo")
const categoriaEstudo = document.querySelector("#categoriaEstudo")
const horasEstudo = document.querySelector("#horasEstudo")
const statusEstudo = document.querySelector("#statusEstudo")
const filtroStatus = document.querySelector("#filtroStatus")

const btnSalvar = document.querySelector("#btnSalvar")
const btnConsultar = document.querySelector("#btnConsultar")
const btnRemover = document.querySelector("#btnRemover")

const resultado = document.querySelector("#resultado")
const totalEstudos = document.querySelector("#totalEstudos")
const listaEstudos = document.querySelector("#listaEstudos")

const estudos = [
    { tema: "Arrays", categoria: "JavaScript", concluido: true, horas: 4 },
    { tema: "Objetos", categoria: "JavaScript", concluido: false, horas: 3 },
    { tema: "Flexbox", categoria: "CSS", concluido: true, horas: 2 },
    { tema: "Herança", categoria: "JavaScript", concluido: false, horas: 0 }
]

const formatarTema = (texto) => {
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

const obterTemaValido = () => {
    const temaFormatado = formatarTema(temaEstudo.value)

    if (temaFormatado === "" || !Number.isNaN(Number(temaFormatado))) {
        mostrarMensagem("Informe um tema válido.")
        return null
    }

    return temaFormatado
}

const obterHorasValidas = () => {
    if (horasEstudo.value.trim() === "") {
        mostrarMensagem("Informe as horas estudadas.")
        return null
    }

    const horasDigitadas = Number(horasEstudo.value)

    if (!Number.isInteger(horasDigitadas) || horasDigitadas < 0) {
        mostrarMensagem("Informe horas inteiras maiores ou iguais a zero.")
        return null
    }

    return horasDigitadas
}

const limparCampos = () => {
    temaEstudo.value = ""
    categoriaEstudo.value = ""
    horasEstudo.value = ""
    statusEstudo.value = "pendente"
}

const atualizarLista = () => {
    const statusSelecionado = filtroStatus.value
    const estudosFiltrados = statusSelecionado === "todos"
        ? estudos
        : estudos.filter(estudo => estudo.concluido === (statusSelecionado === "concluido"))

    totalEstudos.textContent = estudosFiltrados.length
    listaEstudos.textContent = ""

    if (estudosFiltrados.length === 0) {
        listaEstudos.textContent = "Nenhum estudo encontrado para este filtro."
        return
    }

    const cardsEstudos = estudosFiltrados.map((estudo) => {
        const cardEstudo = document.createElement("article")
        cardEstudo.classList.add("estudo-card")

        const tema = document.createElement("h3")
        tema.textContent = estudo.tema

        const detalhes = document.createElement("p")
        detalhes.textContent = `${estudo.categoria} · ${estudo.horas} hora(s)`

        const status = document.createElement("span")
        status.classList.add("status-estudo")
        status.classList.add(estudo.concluido ? "status-concluido" : "status-pendente")
        status.textContent = estudo.concluido ? "Concluído" : "Pendente"

        cardEstudo.append(tema, detalhes, status)
        return cardEstudo
    })

    listaEstudos.append(...cardsEstudos)
}

btnSalvar.addEventListener("click", () => {
    const temaFormatado = obterTemaValido()

    if (temaFormatado === null) {
        return
    }

    if (categoriaEstudo.value === "") {
        mostrarMensagem("Selecione a categoria do estudo.")
        return
    }

    const horasDigitadas = obterHorasValidas()

    if (horasDigitadas === null) {
        return
    }

    const concluido = statusEstudo.value === "concluido"
    const estudoExiste = estudos.some(estudo => estudo.tema === temaFormatado)

    if (estudoExiste) {
        const estudoEncontrado = estudos.find(estudo => estudo.tema === temaFormatado)
        estudoEncontrado.categoria = categoriaEstudo.value
        estudoEncontrado.horas = horasDigitadas
        estudoEncontrado.concluido = concluido
        mostrarMensagem(`O estudo ${temaFormatado} foi atualizado.`)
    } else {
        estudos.push({
            tema: temaFormatado,
            categoria: categoriaEstudo.value,
            horas: horasDigitadas,
            concluido
        })
        mostrarMensagem(`${temaFormatado} foi adicionado aos estudos.`)
    }

    limparCampos()
    atualizarLista()
})

btnConsultar.addEventListener("click", () => {
    const temaFormatado = obterTemaValido()

    if (temaFormatado === null) {
        return
    }

    const estudoEncontrado = estudos.find(estudo => estudo.tema === temaFormatado)

    if (!estudoEncontrado) {
        mostrarMensagem("Estudo não encontrado.")
        return
    }

    const status = estudoEncontrado.concluido ? "concluído" : "pendente"
    mostrarMensagem(`${estudoEncontrado.tema}: ${estudoEncontrado.horas} hora(s), ${status}.`)
})

btnRemover.addEventListener("click", () => {
    const temaFormatado = obterTemaValido()

    if (temaFormatado === null) {
        return
    }

    const estudoEncontrado = estudos.find(estudo => estudo.tema === temaFormatado)

    if (!estudoEncontrado) {
        mostrarMensagem("Estudo não encontrado.")
        return
    }

    const indiceEstudo = estudos.indexOf(estudoEncontrado)
    estudos.splice(indiceEstudo, 1)
    mostrarMensagem(`${temaFormatado} foi removido dos estudos.`)
    limparCampos()
    atualizarLista()
})

filtroStatus.addEventListener("change", atualizarLista)
temaEstudo.addEventListener("click", () => temaEstudo.select())

atualizarLista()
