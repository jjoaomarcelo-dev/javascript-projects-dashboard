/*
DESAFIO 27 — Biblioteca pessoal com classes

Objetivo
Praticar classes, regras de negócio e transições de estado.

Enunciado
Desenvolva uma biblioteca pessoal com cadastro, consulta, empréstimo e devolução de livros.

Requisitos e limites
- Modelar livros com título, autor, categoria e disponibilidade inicial para empréstimo.
- Exigir os dados de cadastro; autor e categoria não podem ser compostos apenas por números.
- Não permitir títulos duplicados por diferenças de caixa ou espaços nas extremidades.
- Impedir empréstimo de livro já emprestado e devolução de livro já disponível.
- Apresentar mensagens para consultas vazias ou inexistentes e manter a listagem coerente com o acervo.

Exemplos para conferir
Cadastre um livro e confira que ele começa disponível.
Empreste o livro e tente emprestá-lo de novo: a segunda tentativa deve ser recusada.
Depois da devolução, ele deve estar disponível outra vez.
Se não houver livros, a página deve informar que a biblioteca está vazia.
*/

const titulo = document.querySelector("#titulo")
const autor = document.querySelector("#autor")
const categoria = document.querySelector("#categoria")
const btnCadastrar = document.querySelector("#btnCadastrar")

const tituloBusca = document.querySelector("#tituloBusca")
const btnConsultar = document.querySelector("#btnConsultar")
const btnEmprestar = document.querySelector("#btnEmprestar")
const btnDevolver = document.querySelector("#btnDevolver")

const resultado = document.querySelector("#resultado")
const resultadoCadastro = document.querySelector("#resultadoCadastro")

const mostrarMensagem = (campo, texto, tipo = "erro") => {
   campo.textContent = texto
   campo.className = `retorno-biblioteca mensagem-${tipo}`
}

const btnListar = document.querySelector("#btnListar")

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
      let status = "Emprestado"

      if (this.disponivel) {
         status = "Disponível"
      }

      return `Título: ${this.titulo}
      Autor: ${this.autor}
      Categoria: ${this.categoria}
      Status: ${status}`
   }
}

const livros = []

const validarCadastro = (tituloDigitado, autorDigitado, categoriaDigitada) => {
   if (tituloDigitado === "") {
      mostrarMensagem(resultadoCadastro, "Informe o título do livro.", "erro")
      return false
   }

   if (autorDigitado === "") {
      mostrarMensagem(resultadoCadastro, "Informe o autor do livro.", "erro")
      return false
   } else if (!Number.isNaN(Number(autorDigitado))) {
      mostrarMensagem(resultadoCadastro, "Informe um nome de autor válido.", "erro")
      return false
   }

   if (categoriaDigitada === "") {
      mostrarMensagem(resultadoCadastro, "Informe a categoria do livro.", "erro")
      return false
   } else if (!Number.isNaN(Number(categoriaDigitada))) {
      mostrarMensagem(resultadoCadastro, "Informe um nome de categoria válido.", "erro")
      return false
   }

   return true
}
const formatarTextos = (texto) => {
   return texto
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")
}

const limparCampos = () => {
   titulo.value = ""
   autor.value = ""
   categoria.value = ""
}

const atualizarTela = () => {
   if (livros.length === 0) {
      listaLivros.textContent = "Nenhum livro cadastrado."
      return
   }

   listaLivros.textContent = ""

   livros.forEach((livro) => {
      const cartao = document.createElement("article")
      cartao.className = "livro-card"

      const tituloLivro = document.createElement("h3")
      tituloLivro.textContent = livro.titulo

      const detalhes = document.createElement("p")
      detalhes.textContent = `Autor: ${livro.autor}\nCategoria: ${livro.categoria}`

      const status = document.createElement("span")
      status.textContent = livro.disponivel ? "Disponível" : "Emprestado"
      status.className = livro.disponivel ? "status-disponivel" : "status-emprestado"

      cartao.append(tituloLivro, detalhes, status)
      listaLivros.append(cartao)
   })
}

btnCadastrar.addEventListener("click", () => {
   resultado.textContent = ""

   const tituloDigitado = titulo.value.trim()
   const autorDigitado = autor.value.trim()
   const categoriaDigitada = categoria.value.trim()

   if (!validarCadastro(tituloDigitado, autorDigitado, categoriaDigitada)) {
      return
   }

   const tituloFormatado = formatarTextos(tituloDigitado)
   const autorFormatado = formatarTextos(autorDigitado)
   const categoriaFormatado = formatarTextos(categoriaDigitada)

   const jaExiste = livros.some(livro => livro.titulo === tituloFormatado)

   if (!jaExiste) {
      const livro = new Livro(tituloFormatado, autorFormatado, categoriaFormatado)
      livros.push(livro)
      mostrarMensagem(resultadoCadastro, `"${livro.titulo}" cadastrado com sucesso!`, "sucesso")
      limparCampos()
   } else {
      mostrarMensagem(resultadoCadastro, `"${tituloFormatado}" já está cadastrado na biblioteca.`, "erro")
   }

   atualizarTela()
})

btnConsultar.addEventListener("click", () => {
   resultadoCadastro.textContent = ""
   const consultaLivro = tituloBusca.value.trim()
   if (consultaLivro === "") {
      mostrarMensagem(resultado, "Informe o título do livro a ser consultado.", "erro")
      return
   }

   const consultaFormatada = formatarTextos(consultaLivro)
   const livroEncontrado = livros.find(livro => livro.titulo === consultaFormatada)

   if (!livroEncontrado) {
      mostrarMensagem(resultado, `"${consultaFormatada}" não foi encontrado.`, "erro")
   } else {
      mostrarMensagem(resultado, `${livroEncontrado.info()}`, "info")
   }

   tituloBusca.value = ""
   atualizarTela()

})

btnEmprestar.addEventListener("click", () => {
   resultadoCadastro.textContent = ""
   const consultaLivro = tituloBusca.value.trim()
   if (consultaLivro === "") {
      mostrarMensagem(resultado, "Informe o título do livro a ser emprestado.", "erro")
      return
   }

   const consultaFormatada = formatarTextos(consultaLivro)
   const livroEncontrado = livros.find(livro => livro.titulo === consultaFormatada)

   if (!livroEncontrado) {
      mostrarMensagem(resultado, `"${consultaFormatada}" não foi encontrado.`, "erro")
   } else {
      const emprestimoRealizado = livroEncontrado.emprestar()
      if (!emprestimoRealizado) {
         mostrarMensagem(resultado, `"${livroEncontrado.titulo}" já foi emprestado.`, "erro")
      } else {
         mostrarMensagem(resultado, `"${livroEncontrado.titulo}" emprestado com sucesso!`, "sucesso")
      }
   }
   tituloBusca.value = ""
   atualizarTela()
})

btnDevolver.addEventListener("click", () => {
   resultadoCadastro.textContent = ""
   const consultaLivro = tituloBusca.value.trim()
   if (consultaLivro === "") {
      mostrarMensagem(resultado, "Informe o título do livro a ser devolvido.", "erro")
      return
   }

   const consultaFormatada = formatarTextos(consultaLivro)
   const livroEncontrado = livros.find(livro => livro.titulo === consultaFormatada)

   if (!livroEncontrado) {
      mostrarMensagem(resultado, `"${consultaFormatada}" não foi encontrado.`, "erro")
   } else {
      const devolucaoRealizada = livroEncontrado.devolver()
      if (!devolucaoRealizada) {
         mostrarMensagem(resultado, `"${livroEncontrado.titulo}" já está disponível`, "erro")
      } else {
         mostrarMensagem(resultado, `"${livroEncontrado.titulo}" devolvido com sucesso`, "sucesso")
      }
   }
   tituloBusca.value = ""
   atualizarTela()
})

btnListar.addEventListener("click", () => {
   atualizarTela()
})
