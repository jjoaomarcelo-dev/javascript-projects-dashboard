/*
DESAFIO 12 — Meta de economia

Objetivo
Praticar acumulação, validação e acompanhamento de metas.

Enunciado
Crie um acompanhamento de economia com meta de R$ 100 e saldo inicial de R$ 0.

Requisitos e limites
- Aceitar depósitos inteiros positivos e informar quanto falta para atingir a meta.
- Sinalizar o alcance da meta, permitindo continuar acumulando.
- Rejeitar entradas inválidas sem alterar o saldo e limpar o campo após um depósito válido.
- Reiniciar deve restaurar saldo, campo e mensagem ao estado inicial.

Exemplos para conferir
Guardar 30, depois 50 e depois 25 deve deixar o total em R$ 105,
com uma mensagem de meta atingida. Ao reiniciar, o total volta para R$ 0
e a página informa que faltam R$ 100.
*/

const valorDigitado = document.querySelector("#valor")
const totalGuardado = document.querySelector("#totalGuardado")
const btnGuardar = document.querySelector("#bt1")
const btnReiniciar = document.querySelector("#bt2")
const mensagem = document.querySelector("#mensagem")
const metaFixa = 100
let total = 0

totalGuardado.textContent = "R$ 0"

valorDigitado.addEventListener("click", () => {
   valorDigitado.select()
})

btnGuardar.addEventListener("click", () => {
   const valor = Number(valorDigitado.value)
   if (Number.isInteger(valor) && valor > 0) {
      total += valor
      totalGuardado.textContent = `R$ ${total}`
      if (total >= metaFixa){
         mensagem.textContent = "Parabéns! Você atingiu sua meta!"
      }else{
         mensagem.textContent = `Faltam R$ ${metaFixa - total} para atingir sua meta`
      }
      valorDigitado.value = ""
   }else {
      mensagem.textContent = "Digite um valor inteiro maior que zero" 
   }
})

btnReiniciar.addEventListener("click", () => {
   total = 0
   valorDigitado.value = ""
   totalGuardado.textContent = "R$ 0"
   mensagem.textContent = "Faltam R$ 100 para atingir sua meta"
})