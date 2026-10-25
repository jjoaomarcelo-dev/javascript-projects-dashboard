// Campos do formulário
const f_titulo = document.querySelector("#f_titulo")
const f_categoria = document.querySelector("#f_categoria")
const f_tema = document.querySelector("#f_tema")
const f_data = document.querySelector("#f_data")
const f_status = document.querySelector("#f_status")
const f_descricao = document.querySelector("#f_descricao")
const f_linkExecucao = document.querySelector("#f_linkExecucao")
const f_linkCodigo = document.querySelector("#f_linkCodigo")

// Mensagens de validação
const erroTitulo = document.querySelector("#erroTitulo")
const erroCategoria = document.querySelector("#erroCategoria")
const erroTema = document.querySelector("#erroTema")
const erroData = document.querySelector("#erroData")
const erroDescricao = document.querySelector("#erroDescricao")
const erroLinkExecucao = document.querySelector("#erroLinkExecucao")
const erroLinkCodigo = document.querySelector("#erroLinkCodigo")

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
const filtroBusca = document.querySelector("#filtroBusca")

let registros = []

// Fica com a posição do registro enquanto ele está sendo editado.
let indiceEdicao = null

// Verifica se um dado carregado do localStorage possui a estrutura esperada para um registro.
const registroValido = (registro) => {
    const ehObjeto = typeof registro === "object" && registro !== null
    if (!ehObjeto) {
        return false
    }
    const tituloValido = typeof registro.titulo === "string"
    const temaValido = typeof registro.tema === "string"
    const dataValida = typeof registro.data === "string"
    const descricaoValida = typeof registro.descricao === "string"
    const categoriaValida = ["exercicio", "projeto"].includes(registro.categoria)
    const statusValido = ["concluido", "em-desenvolvimento"].includes(registro.status)
    const linkExecucaoValido = registro.linkExecucao === undefined || typeof registro.linkExecucao === "string"
    const linkCodigoValido = registro.linkCodigo === undefined || typeof registro.linkCodigo === "string"
    return tituloValido && temaValido && dataValida && descricaoValida && categoriaValida
        && statusValido && linkExecucaoValido && linkCodigoValido
}

// Carrega e valida os registros salvos apenas neste navegador.
const carregarRegistrosLocais = () => {
    const registrosSalvos = localStorage.getItem("registros")
    if (registrosSalvos === null) {
        return null
    }

    try {
        const registrosConvertidos = JSON.parse(registrosSalvos)
        if (Array.isArray(registrosConvertidos)) {
            return registrosConvertidos.filter(registroValido)
        }

        console.error("Erro, os dados salvos não são uma lista de registros.")
    } catch (erro) {
        console.error("Erro, dados de registros inválidos.", erro)
    }

    return null
}

// Carrega o catálogo público usado por visitantes sem registros locais.
const carregarCatalogoInicial = async () => {
    try {
        const resposta = await fetch("./data/registros.json")
        if (!resposta.ok) {
            throw new Error(`Não foi possível carregar o catálogo: ${resposta.status}`)
        }

        const catalogo = await resposta.json()
        if (!Array.isArray(catalogo)) {
            throw new Error("O catálogo inicial precisa ser uma lista de registros.")
        }

        return catalogo.filter(registroValido)
    } catch (erro) {
        console.error("Erro ao carregar o catálogo inicial.", erro)
        return []
    }
}

const validarCampos = () => {
    let camposValidos = true

    const titulo = f_titulo.value.trim()
    const categoria = f_categoria.value
    const tema = f_tema.value.trim()
    const data = f_data.value
    const descricao = f_descricao.value.trim()
    const linkExecucao = f_linkExecucao.value.trim()
    const linkCodigo = f_linkCodigo.value.trim()

    erroTitulo.textContent = ""
    erroCategoria.textContent = ""
    erroTema.textContent = ""
    erroData.textContent = ""
    erroDescricao.textContent = ""
    erroLinkExecucao.textContent = ""
    erroLinkCodigo.textContent = ""

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

    if (linkExecucao !== "" && !linkExecucao.startsWith("./")
        && !linkExecucao.startsWith("https://")) {
        erroLinkExecucao.textContent = "*Use um caminho começando com ./ ou uma URL https://"
        camposValidos = false
    }

    if (linkCodigo !== "" && !linkCodigo.startsWith("https://")) {
        erroLinkCodigo.textContent = "*Use uma URL começando com https://"
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
    f_linkExecucao.value = ""
    f_linkCodigo.value = ""
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
    const busca = filtroBusca.value.trim().toLowerCase()

    let registrosFiltrados = registros

    if (categoriaSelecionada !== "todos") {
        registrosFiltrados = registrosFiltrados.filter(registro => registro.categoria === categoriaSelecionada)
    }

    if (statusSelecionado !== "todos") {
        registrosFiltrados = registrosFiltrados.filter(registro => registro.status === statusSelecionado)
    }

    if (busca !== "") {
        registrosFiltrados = registrosFiltrados.filter((registro) => {
            const titulo = registro.titulo.toLowerCase()
            const tema = registro.tema.toLowerCase()
            return titulo.includes(busca) || tema.includes(busca)
        })
    }

    if (registrosFiltrados.length === 0) {
        const mensagemEstadoVazio = registros.length === 0
            ? "Nenhum exercício ou projeto registrado ainda."
            : "Nenhum exercício ou projeto encontrado."

        listaRegistros.innerHTML = `
        <div class="estado-vazio">
            <strong>${mensagemEstadoVazio}</strong>
        </div>`
        return
    }

    const registrosOrdenados = [...registrosFiltrados].sort((registroA, registroB) => {
        return registroB.data.localeCompare(registroA.data)
    })

    registrosOrdenados.forEach((registro) => {
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

        const linksRegistro = document.createElement("div")
        linksRegistro.classList.add("links-registro")

        if (registro.linkExecucao) {
            const linkParaExecucao = document.createElement("a")
            linkParaExecucao.href = registro.linkExecucao
            linkParaExecucao.textContent = "Executar"
            linkParaExecucao.target = "_blank"
            linkParaExecucao.rel = "noopener noreferrer"
            linkParaExecucao.classList.add("link-registro")
            linksRegistro.append(linkParaExecucao)
        }

        if (registro.linkCodigo) {
            const linkParaCodigo = document.createElement("a")
            linkParaCodigo.href = registro.linkCodigo
            linkParaCodigo.textContent = "Ver código"
            linkParaCodigo.target = "_blank"
            linkParaCodigo.rel = "noopener noreferrer"
            linkParaCodigo.classList.add("link-registro")
            linksRegistro.append(linkParaCodigo)
        }

        if (linksRegistro.childElementCount > 0) {
            registroCard.append(linksRegistro)
        }

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
            f_linkExecucao.value = registro.linkExecucao || ""
            f_linkCodigo.value = registro.linkCodigo || ""

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
// Converte os registros em texto e tenta salvá-los no localStorage, tratando possíveis falhas.
const salvarRegistros = () => {
    try {
        // O localStorage só guarda texto.
        const registrosEmTexto = JSON.stringify(registros)
        localStorage.setItem("registros", registrosEmTexto)
    } catch (erro) {
        console.error("Não foi possível salvar os registros.", erro)
    }
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
        descricao: f_descricao.value.trim(),
        linkExecucao: f_linkExecucao.value.trim(),
        linkCodigo: f_linkCodigo.value.trim()

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
})

filtroBusca.addEventListener("input", () => {
    exibirRegistros()
})

filtroCategoria.addEventListener("change", () => {
    exibirRegistros()
})

filtroStatus.addEventListener("change", () => {
    exibirRegistros()
})

const iniciarPainel = async () => {
    const registrosLocais = carregarRegistrosLocais()

    if (registrosLocais !== null) {
        registros = registrosLocais
    } else {
        registros = await carregarCatalogoInicial()
    }

    exibirRegistros()
}

iniciarPainel()
