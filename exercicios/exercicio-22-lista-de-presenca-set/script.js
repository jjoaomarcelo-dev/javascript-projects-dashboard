/*
DESAFIO 22 — Lista de presença com Set

Objetivo
Praticar unicidade com Set e atualização da interface.

Enunciado
Desenvolva uma lista de presença que permita registrar, consultar e remover participantes sem duplicações.

Requisitos e limites
- Representar participantes por uma coleção Set.
- Rejeitar nomes vazios ou compostos apenas por números e padronizar sua identificação.
- Tratar João, JOÃO e joão como a mesma pessoa.
- Informar duplicidade e ausência; manter a listagem e o total corretos, inclusive quando vazios.

Exemplos para conferir
Adicionar "João" e depois "JOÃO" deve manter apenas uma pessoa na lista.
Consultar "joão" deve confirmar sua presença. Ao removê-la, o total volta para 0.
*/

const nome = document.querySelector("#nome")

const btnAdicionar = document.querySelector("#btnAdicionar")
const btnVerificar = document.querySelector("#btnVerificar")
const btnRemover = document.querySelector("#btnRemover")

const resultado = document.querySelector("#resultado")
const total = document.querySelector("#total")
const listaPessoas = document.querySelector("#listaPessoas")

const listaDePessoas = new Set()

nome.addEventListener("click", () => nome.select())

btnAdicionar.addEventListener("click", () => {
   const nomeDigitado = nome.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")

   if (nomeDigitado === "" || !Number.isNaN(Number(nomeDigitado))) {
      resultado.textContent = "Por favor informe um nome válido."
      nome.value = ""
      return
   }
   if (listaDePessoas.has(nomeDigitado)) {
      resultado.textContent = `${nomeDigitado} já está na lista.`
      nome.value = ""
   } else {
      listaDePessoas.add(nomeDigitado)
      resultado.textContent = `${nomeDigitado} foi adicionado.`
      nome.value = ""

      let textoPessoas = ""
      listaDePessoas.forEach((pessoa) => textoPessoas += `${pessoa}\n`)
      listaPessoas.textContent = textoPessoas
      total.textContent = listaDePessoas.size
   }
})

btnVerificar.addEventListener("click", () => {
   const nomeDigitado = nome.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")

   if (nomeDigitado === "" || !Number.isNaN(Number(nomeDigitado))) {
      resultado.textContent = "Por favor informe um nome válido."
      nome.value = ""
      return
   }

   if (listaDePessoas.has(nomeDigitado)) {
      resultado.textContent = `${nomeDigitado} está presente.`
      nome.value = ""
   } else {
      resultado.textContent = `${nomeDigitado} não está na lista`
      nome.value = ""
   }
})

btnRemover.addEventListener("click", () => {
   const nomeDigitado = nome.value
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
      .join(" ")

   if (nomeDigitado === "" || !Number.isNaN(Number(nomeDigitado))) {
      resultado.textContent = "Por favor informe um nome válido."
      nome.value = ""
      return
   }

   if (!listaDePessoas.has(nomeDigitado)) {
      resultado.textContent = `${nomeDigitado} não está na lista.`
      nome.value = ""
   } else {
      listaDePessoas.delete(nomeDigitado)
      resultado.textContent = `${nomeDigitado} foi removido da lista.`
      nome.value = ""
      let textoPessoas = ""
      listaDePessoas.forEach((pessoa) => textoPessoas += `${pessoa}\n`)
      if (listaDePessoas.size === 0) {
         listaPessoas.textContent = "Nenhuma pessoa cadastrada."
      } else {
         listaPessoas.textContent = textoPessoas
      }
      total.textContent = listaDePessoas.size
   }
})

