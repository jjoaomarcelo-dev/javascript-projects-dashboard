/*
DESAFIO 01 — Verificador de paridade

Objetivo
Praticar condicionais, funções e validação de entrada.

Enunciado
Desenvolva uma página que receba um número inteiro e informe sua paridade.

Requisitos e limites
- Aceitar inteiros positivos, negativos e zero.
- Informar quando a entrada estiver vazia ou não for um inteiro.

Exemplos para conferir
- 0 é par e -3 é ímpar.
- Ao digitar 2.5 ou deixar o campo vazio, a página deve pedir um número inteiro.
*/

const campoNumero = document.querySelector("#numero")
const btnVerificar = document.querySelector("#btnVerificar")
const resultado = document.querySelector("#resultado")

const verificarParidade = (numero) => numero % 2 === 0 ? "Par" : "Ímpar"

const mostrarResultado = () => {
    const numero = Number(campoNumero.value)

    if (campoNumero.value.trim() === "" || !Number.isInteger(numero)) {
        resultado.textContent = "Digite um número inteiro válido."
        return
    }

    resultado.textContent = `${numero} é ${verificarParidade(numero)}.`
}

btnVerificar.addEventListener("click", mostrarResultado)
