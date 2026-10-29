/*
DESAFIO 04 — Análise de array

Objetivo
Praticar acumulação e comparação em um percurso.

Enunciado
Analise a sequência [12, 45, 7, 89, 23, 56, 18, 91, 4] e apresente um resumo estatístico.

Requisitos e limites
- Informar maior, menor, soma e quantidade de números pares.
- Realizar a análise em um único percurso, sem alterar os dados.
- Não utilizar Math.max(), Math.min(), reduce() ou filter().

Exemplos para conferir
Para os números do enunciado, o resultado é:
- Maior: 91.
- Menor: 4.
- Soma: 345.
- Quantidade de pares: 4.
*/

const numeros = [12, 45, 7, 89, 23, 56, 18, 91, 4]

document.querySelector("#dados").textContent = numeros.join(", ")

document.querySelector("#btnExecutar").addEventListener("click", () => {
    let maior = numeros[0]
    let menor = numeros[0]
    let pares = 0
    let soma = 0

    for (const valor of numeros){
        if (valor > maior){
            maior = valor
        }
        if (valor < menor){
            menor = valor
        }
        if (valor % 2 === 0){
            pares ++
        }
        soma += valor
    }

    document.querySelector("#resultado").textContent = [
        `Maior número: ${maior}`,
        `Menor número: ${menor}`,
        `Soma: ${soma}`,
        `Quantidade de pares: ${pares}`
    ].join("\n")
})
