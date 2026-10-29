/*
DESAFIO 19 — Calculadora de inteiros

Objetivo
Praticar funções, operações aritméticas e validação.

Enunciado
Desenvolva uma calculadora com dois operandos e operações de soma, subtração, multiplicação e divisão.

Requisitos e limites
- Exigir dois números inteiros, permitindo negativos e zero.
- Rejeitar divisão por zero e entradas vazias ou inválidas.
- Apresentar o resultado, inclusive fracionário na divisão, e limpar os campos após uma operação válida.

Exemplos para conferir
Com os números 8 e 2:
- Soma: 10.
- Subtração: 6.
- Multiplicação: 16.
- Divisão: 4.
Confira também que 5 dividido por 2 resulta em 2,5 e que dividir por zero
mostra uma mensagem, sem realizar a operação.
*/

const numero1 = document.querySelector("#numero1")
const numero2 = document.querySelector("#numero2")
const resultado = document.querySelector("#resultado")
const mensagem = document.querySelector("#mensagem")

const operacoes = [
    (n1, n2) => n1 + n2,
    (n1, n2) => n1 - n2,
    (n1, n2) => n1 * n2,
    (n1, n2) => n1 / n2
]

const calcular = (indiceOperacao) => {
    const n1 = Number(numero1.value)
    const n2 = Number(numero2.value)

    if (numero1.value.trim() === "" || numero2.value.trim() === ""
        || !Number.isInteger(n1) || !Number.isInteger(n2)) {
        mensagem.textContent = "Preencha os dois campos com números inteiros."
        return
    }

    if (indiceOperacao === 3 && n2 === 0) {
        mensagem.textContent = "Não é possível dividir por zero."
        return
    }

    const valor = operacoes[indiceOperacao](n1, n2)
    if (!Number.isFinite(valor)) {
        mensagem.textContent = "O resultado ultrapassa o limite numérico permitido."
        return
    }

    resultado.textContent = valor
    mensagem.textContent = ""
    numero1.value = ""
    numero2.value = ""
}

const botoes = ["#somar", "#subtrair", "#multiplicar", "#dividir"]
botoes.forEach((seletor, indice) => {
    document.querySelector(seletor).addEventListener("click", () => calcular(indice))
})
