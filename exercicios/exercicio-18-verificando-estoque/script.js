/*
DESAFIO 18 — Disponibilidade de produtos

Objetivo
Praticar verificação de existência com some().

Enunciado
Permita consultar se um produto pertence ao catálogo de periféricos apresentado na página.

Requisitos e limites
- Mostrar o catálogo ao abrir e consultar pelo nome completo.
- Ignorar diferenças de caixa e espaços nas extremidades.
- Distinguir consulta vazia, produto disponível e produto indisponível; limpar o campo após consulta não vazia.

Exemplos para conferir
- Buscar "mouse" deve encontrar Mouse.
- Buscar um produto que não está na lista deve informar que ele está indisponível.
- Um campo vazio deve pedir o nome de um produto.
*/

const listaProdutos = document.querySelector("#listaProdutos")
const nomeProduto = document.querySelector("#nomeProduto")
const btnVerificar = document.querySelector("#btnVerificar")
const resultado = document.querySelector("#resultado")

const produtos = [
    "Teclado",
    "Mouse",
    "Monitor",
    "Webcam",
    "Headset",
    "Notebook",
    "Impressora",
    "Microfone",
    "Caixa de som",
    "Controle",
    "Carregador",
    "Pen drive"
]

listaProdutos.textContent = produtos.join(" , ")

btnVerificar.addEventListener("click", () => {
   const produtoDigitado = nomeProduto.value.trim().toUpperCase()
   if (produtoDigitado === ""){
      resultado.textContent = "Digite o nome do produto"
      return
   }
   const produtoEncontrado = produtos.some((produto) => produto.toUpperCase() === produtoDigitado)
   if (produtoEncontrado){
      resultado.textContent = "Produto disponível."
   } else {
      resultado.textContent = "Produto indisponível."
   }
    nomeProduto.value = ""
})