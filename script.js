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

// Controle
const btnAdicionar = document.querySelector("#btnAdicionar")
const btnCancelar = document.querySelector("#btnCancelar")
const listaRegistros = document.querySelector("#listaRegistros")

// Resumo
const totalRegistros = document.querySelector("#totalRegistros")
const totalExercicios = document.querySelector("#totalExercicios")
const totalProjetos = document.querySelector("#totalProjetos")
const totalConcluidos = document.querySelector("#totalConcluidos")
const totalEmDesenvolvimento = document.querySelector("#totalEmDesenvolvimento")

let registros = []
let indiceEdicao = null

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

const atualizarResumo = () => {
    totalRegistros.textContent = registros.length

    const qntExercicios = registros.filter(registro => registro.categoria === "exercicio")
    totalExercicios.textContent = qntExercicios.length

    const qntProjetos = registros.filter(registro => registro.categoria === "projeto")
    totalProjetos.textContent = qntProjetos.length

    const qntConcluido = registros.filter(registro => registro.status === "concluido")
    totalConcluidos.textContent = qntConcluido.length

    const qntEmDesenvolvimento = registros.filter(registro => registro.status === "em-desenvolvimento")
    totalEmDesenvolvimento.textContent = qntEmDesenvolvimento.length
}

const exibirRegistros = () => {
    listaRegistros.innerHTML = ""
    atualizarResumo()

    if (registros.length === 0) {
        listaRegistros.innerHTML = `
        <div class="estado-vazio">
            <strong>Nenhum exercício ou projeto registrado ainda.</strong>
        </div>
    `
        return
    }

    registros.forEach((registro, indice) => {

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
        registroStatus.classList.add("registro-status")
        registroStatus.textContent = `Status: ${statusFormatado}`
        registroCard.append(registroStatus)

        const botaoEditar = document.createElement("button")
        botaoEditar.type = "button"
        botaoEditar.textContent = "Editar"
        botaoEditar.classList.add("botao-editar")
        registroCard.append(botaoEditar)

        botaoEditar.addEventListener("click", () => {
            indiceEdicao = indice
            btnCancelar.hidden = false
            btnAdicionar.textContent = "Salvar alterações"

            f_titulo.value = registro.titulo
            f_categoria.value = registro.categoria
            f_tema.value = registro.tema
            f_data.value = registro.data
            f_status.value = registro.status
            f_descricao.value = registro.descricao

            f_titulo.focus()

        })

        const botaoRemover = document.createElement("button")
        botaoRemover.type = "button"
        botaoRemover.textContent = "Remover"
        botaoRemover.classList.add("botao-remover")
        registroCard.append(botaoRemover)

        botaoRemover.addEventListener("click", () => {
            const confirmarRemocao = confirm("Tem certeza que deseja remover este registro?")
            if (!confirmarRemocao) {
                return
            }
            registros.splice(indice, 1)
            indiceEdicao = null
            btnCancelar.hidden = true
            btnAdicionar.textContent = "Adicionar exercício ou projeto"
            limparCampos()

            salvarRegistros()
            exibirRegistros()
        })

        listaRegistros.append(registroCard)
    })
}

const salvarRegistros = () => {
    const registrosEmTexto = JSON.stringify(registros)
    localStorage.setItem("registros", registrosEmTexto)
}

btnCancelar.addEventListener("click", () => {
    btnCancelar.hidden = true
    btnAdicionar.textContent = "Adicionar exercício ou projeto"
    limparCampos()
    indiceEdicao = null
})

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

    if (indiceEdicao === null) {
        registros.push(registro)
    } else {
        registros[indiceEdicao] = registro
    }

    indiceEdicao = null
    btnCancelar.hidden = true
    btnAdicionar.textContent = "Adicionar exercício ou projeto"

    salvarRegistros()
    exibirRegistros()
    limparCampos()

    listaRegistros.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})

if (registros.length > 0) {
    exibirRegistros()
}
