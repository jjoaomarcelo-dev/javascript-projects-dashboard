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
const btnGerenciar = document.querySelector("#btnGerenciar")
const formularioGerenciamento = document.querySelector("#formularioGerenciamento")
const btnFecharGerenciamento = document.querySelector("#btnFecharGerenciamento")

// Resumo
const totalRegistros = document.querySelector("#totalRegistros")
const totalExercicios = document.querySelector("#totalExercicios")
const totalProjetos = document.querySelector("#totalProjetos")
const totalConcluidos = document.querySelector("#totalConcluidos")
const totalEmDesenvolvimento = document.querySelector("#totalEmDesenvolvimento")

// Filtros
const filtroCategoria = document.querySelector("#filtroCategoria")
const filtroStatus = document.querySelector("#filtroStatus")

let registros = []

// Fica com a posição do registro enquanto ele está sendo editado.
let indiceEdicao = null

// Carrega os registros salvos ao abrir ou atualizar a página.
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

const criarDetalheRegistro = (rotulo, valor) => {
    const paragrafo = document.createElement("p")
    const rotuloDestacado = document.createElement("strong")

    rotuloDestacado.textContent = `${rotulo}: `
    paragrafo.append(rotuloDestacado, document.createTextNode(valor))

    return paragrafo
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

    const categoriaSelecionada = filtroCategoria.value
    const statusSelecionado = filtroStatus.value
    let registrosFiltrados = registros

    if (categoriaSelecionada !== "todos") {
        registrosFiltrados = registrosFiltrados.filter(registro => registro.categoria === categoriaSelecionada)
    }

    if (statusSelecionado !== "todos") {
        registrosFiltrados = registrosFiltrados.filter(registro => registro.status === statusSelecionado)
    }

    if (registrosFiltrados.length === 0) {
        listaRegistros.innerHTML = `
        <div class="estado-vazio">
            <strong>Nenhum exercício ou projeto registrado ainda.</strong>
        </div>
    `
        return
    }

    registrosFiltrados.forEach((registro) => {
        // Acessa o vetor registros e retorna o índice do objeto que está sendo percorrido pelo forEach.
        // A posição é a do vetor original, não a da lista filtrada. Se não encontrar o objeto, retorna -1.
        const indiceOriginal = registros.indexOf(registro)

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

        const cabecalhoRegistro = document.createElement("div")
        cabecalhoRegistro.classList.add("cabecalho-registro")

        const registroTitulo = document.createElement("h3")
        registroTitulo.textContent = registro.titulo

        const registroStatus = document.createElement("p")
        registroStatus.classList.add("registro-status")
        registroStatus.classList.add(
            registro.status === "concluido"
                ? "registro-status-concluido"
                : "registro-status-desenvolvimento"
        )
        registroStatus.textContent = statusFormatado

        cabecalhoRegistro.append(registroTitulo, registroStatus)
        registroCard.append(cabecalhoRegistro)

        const registroCategoria = criarDetalheRegistro("Categoria", categoriaFormatada)
        registroCard.append(registroCategoria)

        const registroTema = criarDetalheRegistro("Tema principal", registro.tema)
        registroCard.append(registroTema)

        const registroData = criarDetalheRegistro("Data", dataFormatada)
        registroCard.append(registroData)

        const registroDescricao = criarDetalheRegistro("Descrição", registro.descricao)
        registroCard.append(registroDescricao)

        const acoesRegistro = document.createElement("div")
        acoesRegistro.classList.add("acoes-registro")

        const botaoEditar = document.createElement("button")
        botaoEditar.type = "button"
        botaoEditar.textContent = "Editar"
        botaoEditar.classList.add("botao-editar")
        acoesRegistro.append(botaoEditar)

        botaoEditar.addEventListener("click", () => {
            indiceEdicao = indiceOriginal
            formularioGerenciamento.showModal()
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
        acoesRegistro.append(botaoRemover)

        botaoRemover.addEventListener("click", () => {
            const confirmarRemocao = confirm("Tem certeza que deseja remover este registro?")
            if (!confirmarRemocao) {
                return
            }
            registros.splice(indiceOriginal, 1)
            indiceEdicao = null
            btnCancelar.hidden = true
            btnAdicionar.textContent = "Adicionar exercício ou projeto"
            limparCampos()

            salvarRegistros()
            exibirRegistros()
        })

        registroCard.append(acoesRegistro)
        listaRegistros.append(registroCard)
    })

}

const salvarRegistros = () => {
    // O localStorage só guarda texto.
    const registrosEmTexto = JSON.stringify(registros)
    localStorage.setItem("registros", registrosEmTexto)
}

const cancelarGerenciamento = () => {
    btnCancelar.hidden = true
    btnAdicionar.textContent = "Adicionar exercício ou projeto"
    limparCampos()
    indiceEdicao = null
    formularioGerenciamento.close()
}

btnGerenciar.addEventListener("click", () => {
    formularioGerenciamento.showModal()
})

btnFecharGerenciamento.addEventListener("click", () => {
    cancelarGerenciamento()
})

btnCancelar.addEventListener("click", () => {
    cancelarGerenciamento()
})

formularioGerenciamento.addEventListener("cancel", () => {
    cancelarGerenciamento()
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
    formularioGerenciamento.close()

    listaRegistros.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})

filtroCategoria.addEventListener("change", () => {
    exibirRegistros()
})

filtroStatus.addEventListener("change", () => {
    exibirRegistros()
})

if (registros.length > 0) {
    exibirRegistros()
}
