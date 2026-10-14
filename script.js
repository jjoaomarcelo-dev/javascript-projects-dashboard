// Campos do formulário
const f_titulo = document.querySelector("#f_titulo")
const f_categoria = document.querySelector("#f_categoria")
const f_tema = document.querySelector("#f_tema")
const f_data = document.querySelector("#f_data")
const f_status = document.querySelector("#f_status")
const f_descricao = document.querySelector("#f_descricao")

// Mensagens de validação
const erroTitulo = document.querySelector("#erroTitulo")
const erroCategoria = document.querySelector("#erroCategoria")
const erroTema = document.querySelector("#erroTema")
const erroData = document.querySelector("#erroData")
const erroDescricao = document.querySelector("#erroDescricao")

const btnAdicionar = document.querySelector("#btnAdicionar")
const listaRegistros = document.querySelector("#listaRegistros")

let registros = []
const registrosSalvos = localStorage.getItem("registros")
if (registrosSalvos !== null) {
    const registrosConvertidos = JSON.parse(registrosSalvos)
    registros = registrosConvertidos
}

const validarCampos = () => {
    let camposValidos = true

    const titulo = f_titulo.value.trim()
    const categoria = f_categoria.value
    const tema = f_tema.value.trim()
    const data = f_data.value
    const descricao = f_descricao.value.trim()

    erroTitulo.textContent = ""
    erroCategoria.textContent = ""
    erroTema.textContent = ""
    erroData.textContent = ""
    erroDescricao.textContent = ""

    if (titulo === "") {
        erroTitulo.textContent = "*Campo obrigatório"
        camposValidos = false
    }

    if (categoria === "") {
        erroCategoria.textContent = "*Campo obrigatório"
        camposValidos = false
    }

    if (tema === "") {
        erroTema.textContent = "*Campo obrigatório"
        camposValidos = false
    }

    if (data === "") {
        erroData.textContent = "*Campo obrigatório"
        camposValidos = false
    } else if (!f_data.validity.valid) {
        erroData.textContent = "*Informe uma data válida entre 1900 e 2099."
        camposValidos = false
    }

    if (descricao === "") {
        erroDescricao.textContent = "*Campo obrigatório"
        camposValidos = false
    }

    return camposValidos
}

const formatarTexto = (texto) => {
    return texto
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ")
}

const limparCampos = () => {
    f_titulo.value = ""
    f_categoria.value = ""
    f_tema.value = ""
    f_data.value = ""
    f_status.value = "concluido"
    f_descricao.value = ""
}

const exibirRegistros = () => {
    listaRegistros.innerHTML = ""

    registros.forEach((registro) => {

        const dataFormatada = registro.data
            .split("-")
            .reverse()
            .join("/")

        const statusFormatado = registro.status === "concluido"
            ? "Concluído"
            : "Em desenvolvimento"

        const categoriaFormatada = registro.categoria === "exercicio"
            ? "Exercício"
            : "Projeto"

        const registroCard = document.createElement("div")
        registroCard.classList.add("registro-card")

        const registroTitulo = document.createElement("h3")
        registroTitulo.textContent = registro.titulo
        registroCard.append(registroTitulo)

        const registroCategoria = document.createElement("p")
        registroCategoria.textContent = `Categoria: ${categoriaFormatada}`
        registroCard.append(registroCategoria)

        const registroTema = document.createElement("p")
        registroTema.textContent = `Tema principal: ${registro.tema}`
        registroCard.append(registroTema)

        const registroData = document.createElement("p")
        registroData.textContent = `Data: ${dataFormatada}`
        registroCard.append(registroData)

        const registroDescricao = document.createElement("p")
        registroDescricao.textContent = `Descrição: ${registro.descricao}`
        registroCard.append(registroDescricao)

        const registroStatus = document.createElement("p")
        registroStatus.textContent = `Status: ${statusFormatado}`
        registroCard.append(registroStatus)

        listaRegistros.append(registroCard)
    })
}

const salvarRegistros = () => {
    const registrosEmTexto = JSON.stringify(registros)
    localStorage.setItem("registros", registrosEmTexto)
}

btnAdicionar.addEventListener("click", () => {
    const camposValidos = validarCampos()

    if (!camposValidos) {
        return
    }

    const tituloFormatado = formatarTexto(f_titulo.value)
    const temaFormatado = formatarTexto(f_tema.value)

    const registro = {
        titulo: tituloFormatado,
        categoria: f_categoria.value,
        tema: temaFormatado,
        data: f_data.value,
        status: f_status.value,
        descricao: f_descricao.value.trim()
    }

    registros.push(registro)
    salvarRegistros()
    exibirRegistros()
    limparCampos()
})

if (registros.length > 0) {
    exibirRegistros()
}
