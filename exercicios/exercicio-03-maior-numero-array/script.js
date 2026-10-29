/*
DESAFIO 03 — Maior número de um array

Objetivo
Praticar comparação e percurso de arrays com for...of.

Enunciado
Dado o array [12, 45, 7, 89, 23, 56], identifique o maior número.

Requisitos e limites
- Comparar os valores sem utilizar Math.max() nem ordenar o array.
- Preservar os números e sua ordem original.
- Considerar que o array fornecido possui pelo menos um número.

Exemplos para conferir
- No array do enunciado, o maior número é 89.
- Em [-8, -2, -5], o resultado é -2.
- Em [5, 5, 2], o resultado é 5. Os arrays devem continuar iguais após a análise.
*/

const numeros = [12, 45, 7, 89, 23, 56]
const dados = document.querySelector("#dados")
const resultado = document.querySelector("#resultado")
const btnAnalisar = document.querySelector("#btnAnalisar")

dados.textContent = numeros.join(", ")

const encontrarMaiorDoArray = (numeros) => {
    let maior = numeros[0]

    for (const valor of numeros) {
        if (valor > maior) {
            maior = valor
        }
    }

    return maior
}

btnAnalisar.addEventListener("click", () => {
    resultado.textContent = `Maior número: ${encontrarMaiorDoArray(numeros)}`
})
