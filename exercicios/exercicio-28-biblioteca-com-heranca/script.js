/*
DESAFIO 28 — Biblioteca com herança

Objetivo
Evoluir a biblioteca do exercício 27 usando classes, herança, super e instanceof.

Enunciado
Desenvolva uma biblioteca com livros físicos e digitais. Os dois tipos devem herdar os dados e os métodos da classe Livro.

Requisitos e limites
- Crie uma classe base Livro com título, autor, categoria e disponibilidade.
- Crie LivroFisico e LivroDigital como classes filhas de Livro.
- Use super() para reutilizar o constructor da classe Livro.
- Use instanceof para identificar o tipo de cada livro na listagem.
- Não aceite títulos duplicados, campos vazios ou autor e categoria compostos apenas por números.
- Empréstimo e devolução devem respeitar a disponibilidade do livro.

Exemplos para conferir
Cadastre um livro físico e um digital.
Empreste o livro físico e tente emprestá-lo novamente: a segunda tentativa deve ser recusada.
Ao devolver, ele deve voltar a ficar disponível.
*/

const formLivro = document.querySelector("#formLivro")
const titulo = document.querySelector("#titulo")
const autor = document.querySelector("#autor")
const categoria = document.querySelector("#categoria")
const tipoLivro = document.querySelector("#tipoLivro")

const btnSalvar = document.querySelector("#btnSalvar")
const resultado = document.querySelector("#resultado")
const totalLivros = document.querySelector("#totalLivros")
const listaLivros = document.querySelector("#listaLivros")

class Livro {
    constructor(titulo, autor, categoria) {
        this.titulo = titulo
        this.autor = autor
        this.categoria = categoria
        this.disponivel = true
    }

    emprestar() {
        if (!this.disponivel) {
            return false
        }

        this.disponivel = false
        return true
    }

    devolver() {
        if (this.disponivel) {
            return false
        }

        this.disponivel = true
        return true
    }

    info() {
        const status = this.disponivel ? "Disponível" : "Emprestado"
        return `${this.autor} · ${this.categoria} · ${status}`
    }
}

class LivroFisico extends Livro {
    constructor(titulo, autor, categoria) {
        super(titulo, autor, categoria)
    }

    info() {
        return `${super.info()} · Livro físico`
    }
}

class LivroDigital extends Livro {
    constructor(titulo, autor, categoria) {
        super(titulo, autor, categoria)
    }

    info() {
        return `${super.info()} · Livro digital`
    }
}

const livros = []
let indiceEdicao = null

const formatarTexto = (texto) => {
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

const limparCampos = () => {
    titulo.value = ""
    autor.value = ""
    categoria.value = ""
    tipoLivro.value = "fisico"
    indiceEdicao = null
    btnSalvar.textContent = "Adicionar livro"
}

const obterTextoValido = (campo, mensagem) => {
    const textoFormatado = formatarTexto(campo.value)

    if (textoFormatado === "" || !Number.isNaN(Number(textoFormatado))) {
        mostrarMensagem(mensagem)
        return null
    }

    return textoFormatado
}

const criarBotao = (texto, classe) => {
    const botao = document.createElement("button")
    botao.type = "button"
    botao.textContent = texto
    botao.classList.add(classe)
    return botao
}

const exibirLivros = () => {
    totalLivros.textContent = livros.length
    listaLivros.textContent = ""

    if (livros.length === 0) {
        listaLivros.textContent = "Nenhum livro cadastrado."
        return
    }

    livros.forEach((livro, indice) => {
        const cardLivro = document.createElement("article")
        cardLivro.classList.add("livro-card")

        const tituloLivro = document.createElement("h3")
        tituloLivro.textContent = livro.titulo

        const tipo = document.createElement("span")
        tipo.classList.add("tipo-livro")
        tipo.textContent = livro instanceof LivroFisico ? "Livro físico" : "Livro digital"

        const detalhes = document.createElement("p")
        detalhes.textContent = livro.info()

        const acoes = document.createElement("div")
        acoes.classList.add("acoes-livro")

        const btnEmprestar = criarBotao("Emprestar", "btn-emprestar")
        btnEmprestar.addEventListener("click", () => {
            if (!livro.emprestar()) {
                mostrarMensagem(`${livro.titulo} já está emprestado.`)
                return
            }

            mostrarMensagem(`${livro.titulo} foi emprestado.`)
            exibirLivros()
        })

        const btnDevolver = criarBotao("Devolver", "secundario")
        btnDevolver.addEventListener("click", () => {
            if (!livro.devolver()) {
                mostrarMensagem(`${livro.titulo} já está disponível.`)
                return
            }

            mostrarMensagem(`${livro.titulo} foi devolvido.`)
            exibirLivros()
        })

        const btnEditar = criarBotao("Editar", "btn-editar")
        btnEditar.addEventListener("click", () => {
            indiceEdicao = indice
            titulo.value = livro.titulo
            autor.value = livro.autor
            categoria.value = livro.categoria
            tipoLivro.value = livro instanceof LivroFisico ? "fisico" : "digital"
            btnSalvar.textContent = "Salvar alterações"
            mostrarMensagem(`Editando ${livro.titulo}.`)
            formLivro.scrollIntoView({ behavior: "smooth", block: "start" })
        })

        const btnRemover = criarBotao("Remover", "btn-remover")
        btnRemover.addEventListener("click", () => {
            livros.splice(indice, 1)

            if (indiceEdicao === indice) {
                limparCampos()
                mostrarMensagem("Livro removido. A edição em andamento foi cancelada.")
            } else {
                if (indiceEdicao !== null && indiceEdicao > indice) {
                    indiceEdicao--
                }
                mostrarMensagem("Livro removido.")
            }

            exibirLivros()
        })

        acoes.append(btnEmprestar, btnDevolver, btnEditar, btnRemover)
        cardLivro.append(tituloLivro, tipo, detalhes, acoes)
        listaLivros.append(cardLivro)
    })
}

formLivro.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const tituloFormatado = obterTextoValido(titulo, "Informe um título válido.")

    if (tituloFormatado === null) {
        return
    }

    const autorFormatado = obterTextoValido(autor, "Informe um autor válido.")

    if (autorFormatado === null) {
        return
    }

    const categoriaFormatada = obterTextoValido(categoria, "Informe uma categoria válida.")

    if (categoriaFormatada === null) {
        return
    }

    const tituloDuplicado = livros.some((livro, indice) => {
        return livro.titulo === tituloFormatado && indice !== indiceEdicao
    })

    if (tituloDuplicado) {
        mostrarMensagem("Já existe um livro com esse título.")
        return
    }

    const livro = tipoLivro.value === "fisico"
        ? new LivroFisico(tituloFormatado, autorFormatado, categoriaFormatada)
        : new LivroDigital(tituloFormatado, autorFormatado, categoriaFormatada)

    const editando = indiceEdicao !== null

    if (editando) {
        livro.disponivel = livros[indiceEdicao].disponivel
        livros[indiceEdicao] = livro
        mostrarMensagem(`${tituloFormatado} foi atualizado.`)
    } else {
        livros.push(livro)
        mostrarMensagem(`${tituloFormatado} foi adicionado à biblioteca.`)
    }

    limparCampos()
    exibirLivros()
})

titulo.addEventListener("click", () => titulo.select())
autor.addEventListener("click", () => autor.select())
categoria.addEventListener("click", () => categoria.select())

exibirLivros()
