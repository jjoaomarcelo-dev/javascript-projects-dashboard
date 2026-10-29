/*
DESAFIO 20 — Controle de estoque com Map

Objetivo
Praticar coleções chave-valor e consistência da interface.

Enunciado
Construa um controle de estoque em que cada nome de produto esteja associado à sua quantidade.

Requisitos e limites
- Representar o estoque por uma coleção Map e permitir cadastrar, atualizar, consultar e remover.
- Aceitar nomes não vazios que não sejam apenas números e quantidades inteiras não negativas.
- Tratar variações de caixa e espaços nas extremidades como o mesmo produto.
- Manter listagem e total de produtos atualizados; informar estoque vazio e produto inexistente.

Exemplos para conferir
Cadastre Mouse com 5 unidades. Depois, cadastre "mouse" com 8.
Deve continuar existindo apenas um produto, agora com 8 unidades.
Ao remover o último produto, a página deve informar que o estoque está vazio.
*/

const nomeProduto = document.querySelector("#nomeProduto")
const quantidadeProduto = document.querySelector("#quantidadeProduto")
const btnCadastrar = document.querySelector("#btnCadastrar")

const btnConsultar = document.querySelector("#btnConsultar")
const btnRemover = document.querySelector("#btnRemover")

const resultado = document.querySelector("#resultado")

const totalProdutos = document.querySelector("#totalProdutos")
const listaEstoque = document.querySelector("#listaEstoque")

const produtos = new Map()

btnCadastrar.addEventListener("click", () => {
   const nome = nomeProduto.value.trim().toLowerCase()
   const produtoDigitado = nome
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")

   if (produtoDigitado === "") {
      resultado.textContent = "Por favor informe um produto."
      return
   }
   if (!Number.isNaN(Number(produtoDigitado))) {
      resultado.textContent = "Por favor informe um produto válido."
      return
   }
   if (quantidadeProduto.value.trim() === "") {
      resultado.textContent = "Por favor informe a quantidade do produto."
      return
   }
   const quantidadeDigitada = Number(quantidadeProduto.value.trim())
   if (!Number.isInteger(quantidadeDigitada) || quantidadeDigitada < 0) {
      resultado.textContent = "Por favor informe uma quantidade válida"
      return
   }

   const jaExiste = produtos.has(produtoDigitado)

   produtos.set(produtoDigitado, quantidadeDigitada)

   if (jaExiste) {
      resultado.textContent = `Quantidade de ${produtoDigitado} atualizada para ${quantidadeDigitada}.`
   } else {
      resultado.textContent = `Produto ${produtoDigitado} cadastrado. Quantidade: ${quantidadeDigitada}`
   }

   let textoEstoque = ""

   produtos.forEach((quantidade, produto) => {
      textoEstoque += `${produto} - Und(s): ${quantidade}\n`
   })

   listaEstoque.textContent = textoEstoque
   totalProdutos.textContent = produtos.size

   nomeProduto.value = ""
   quantidadeProduto.value = ""
})

btnConsultar.addEventListener("click", () => {
   const nome = nomeProduto.value.trim().toLowerCase()
   const produtoDigitado = nome
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")

   if (produtoDigitado === "") {
      resultado.textContent = "Por favor informe um produto."
      return
   }
   if (!Number.isNaN(Number(produtoDigitado))) {
      resultado.textContent = "Por favor informe um produto válido."
      return
   }

   const jaExiste = produtos.has(produtoDigitado)
   if (jaExiste) {
      const quantidade = produtos.get(produtoDigitado)
      resultado.textContent = `${produtoDigitado} possui ${quantidade} unidade(s).`
   } else {
      resultado.textContent = "Produto não encontrado."
   }
})

btnRemover.addEventListener("click", () => {
   const nome = nomeProduto.value.trim().toLowerCase()
   const produtoDigitado = nome
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")

   if (produtoDigitado === "") {
      resultado.textContent = "Por favor informe o nome do produto."
      return
   }
   if (!Number.isNaN(Number(produtoDigitado))) {
      resultado.textContent = "Por favor informe um produto válido."
      return
   }

   const jaExiste = produtos.has(produtoDigitado)
   if (!jaExiste) {
      resultado.textContent = "Produto não encontrado."
   } else {
      produtos.delete(produtoDigitado)
      resultado.textContent = `Produto ${produtoDigitado} removido.`
      totalProdutos.textContent = produtos.size
      let textoEstoque = ""
      produtos.forEach((quantidade, produto) => {
         textoEstoque += `${produto} - Und(s): ${quantidade}\n`
      })
      if (produtos.size === 0) {
         listaEstoque.textContent = "Nenhum produto cadastrado."
      } else {
         listaEstoque.textContent = textoEstoque
      }
   }
})

nomeProduto.addEventListener("click", () => nomeProduto.select())