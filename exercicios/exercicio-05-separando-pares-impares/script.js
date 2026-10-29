/*
DESAFIO 05 — Separação de pares e ímpares

Objetivo
Praticar classificação de dados e construção de arrays.

Enunciado
Classifique os números de [12, 5, 8, 21, 16, 7, 30, 11, 42] em duas coleções: pares e ímpares.

Requisitos e limites
- Preservar a sequência original e a ordem relativa dos elementos.
- Cada elemento deve pertencer a exatamente um dos grupos.
- Resolver com estruturas de repetição e decisão, sem filter().

Exemplos para conferir
As duas listas devem ficar assim:
- Pares: [12, 8, 16, 30, 42].
- Ímpares: [5, 21, 7, 11].
*/

const numeros = [12, 5, 8, 21, 16, 7, 30, 11, 42]

document.querySelector("#dados").textContent = numeros.join(", ")

document.querySelector("#btnExecutar").addEventListener("click", () => {
    const pares = []
    const impares = []

    for (const valor of numeros) {
        if (valor % 2 === 0) {
            pares.push(valor)
        } else {
            impares.push(valor)
        }
    }

    document.querySelector("#pares").textContent = pares.join(", ")
    document.querySelector("#impares").textContent = impares.join(", ")
})
