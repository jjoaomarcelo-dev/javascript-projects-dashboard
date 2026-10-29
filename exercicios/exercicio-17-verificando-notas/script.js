/*
DESAFIO 17 — Situação de uma turma

Objetivo
Praticar validação e avaliação coletiva com every().

Enunciado
Receba notas de uma turma e determine se todos atingiram a média mínima de 7.

Requisitos e limites
- Iniciar sem notas e aceitar valores de 0 a 10, incluindo decimais.
- Rejeitar campo vazio ou nota inválida sem incluí-la na turma.
- Exibir a lista atualizada e distinguir turma vazia, aprovação total e existência de nota abaixo da média.

Exemplos para conferir
- Sem notas cadastradas, a página deve pedir pelo menos uma nota.
- Com as notas 7 e 10, todos estão aprovados.
- Ao incluir uma nota 6, a página deve informar que há aluno abaixo da média.
*/

const nota = document.querySelector("#nota")
const btnAdicionar = document.querySelector("#btnAdicionar")
const btnVerificar = document.querySelector("#btnVerificar")
const listaNotas = document.querySelector("#listaNotas")
const resultado = document.querySelector("#resultado")

const notas = []

nota.addEventListener("click", () => { nota.select() })

btnAdicionar.addEventListener("click", () => {
   const notaDigitada = Number(nota.value)
   if (nota.value.trim() === "" ||
      !Number.isFinite(notaDigitada) ||
      notaDigitada < 0 || notaDigitada > 10
   ) {
      resultado.textContent = "Digite uma nota válida entre 0 e 10."
   } else {
      notas.push(notaDigitada)
      listaNotas.textContent = notas.join("  ,  ")
      resultado.textContent = "Clique no botão para verificar as notas."
   }
   nota.value = ""
})

btnVerificar.addEventListener("click", () => {
   if (notas.length === 0) {
      resultado.textContent = "Adicione pelo menos uma nota."
      return
   }
   const notasAprovadas = notas.every((nota) => nota >= 7)
   if (!notasAprovadas) {
      resultado.textContent = "A turma possui aluno abaixo da média."
   } else {
      resultado.textContent = "Todos os alunos foram aprovados."
   }
})