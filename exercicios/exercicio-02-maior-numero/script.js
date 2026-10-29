/*
DESAFIO 02 — Maior entre três números

Objetivo
Praticar comparação de valores e funções com retorno.

Enunciado
Desenvolva uma ferramenta que receba três números e apresente o maior deles.

Requisitos e limites
- Exigir o preenchimento dos três valores.
- Tratar números negativos e empates.
- Determinar o maior por comparações, sem Math.max().

Exemplos para conferir
- Entre 15, 37 e 22, o maior é 37.
- Entre -8, -2 e -5, o maior é -2.
- Para 5, 5 e 2, o resultado continua sendo 5.
*/

const campoN1 = document.querySelector("#n1")
const campoN2 = document.querySelector("#n2")
const campoN3 = document.querySelector("#n3")
const btnEncontrar = document.querySelector("#btnEncontrar")
const resultado = document.querySelector("#resultado")

const encontrarMaior = (n1, n2, n3) => {
    let maior = n1

    if (n2 > maior) {
        maior = n2
    }
    if (n3 > maior) {
        maior = n3
    }

    return maior
}

btnEncontrar.addEventListener("click", () => {
    if (campoN1.value.trim() === "" || campoN2.value.trim() === "" || campoN3.value.trim() === "") {
        resultado.textContent = "Preencha os três campos com números válidos."
        return
    }

    const n1 = Number(campoN1.value)
    const n2 = Number(campoN2.value)
    const n3 = Number(campoN3.value)

    if (!Number.isFinite(n1) || !Number.isFinite(n2) || !Number.isFinite(n3)) {
        resultado.textContent = "Preencha os três campos com números válidos."
        return
    }

    resultado.textContent = `O maior número é ${encontrarMaior(n1, n2, n3)}.`
})
