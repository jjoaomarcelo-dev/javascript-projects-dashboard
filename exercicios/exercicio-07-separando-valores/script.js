/*
DESAFIO 07 — Análise de pares e ímpares

Objetivo
Praticar classificação e acumuladores independentes.

Enunciado
Produza um relatório de paridade para [12, 7, 25, 18, 3, 40, 11, 22, 9, 30].

Requisitos e limites
- Apresentar separadamente os pares, os ímpares e a soma de cada grupo.
- Manter os dados originais e a ordem dos elementos.
- Resolver sem filter() e reduce().

Exemplos para conferir
- Pares: [12, 18, 40, 22, 30]. Soma: 122.
- Ímpares: [7, 25, 3, 11, 9]. Soma: 55.
*/

const numeros = [12, 7, 25, 18, 3, 40, 11, 22, 9, 30]

document.querySelector("#dados").textContent = numeros.join(", ")

document.querySelector("#btnExecutar").addEventListener("click", () => {
    const pares = []
    const impares = []
    let somaPar = 0
    let somaImpar = 0

    for (let cont of numeros){
        if (cont % 2 === 0) {
            pares.push(cont)
            somaPar += cont
        } else{
            impares.push(cont)
            somaImpar += cont
        }
    }


    document.querySelector("#resultado").textContent = [
        `Pares: ${pares.join(", ")}`,
        `Soma dos pares: ${somaPar}`,
        `Ímpares: ${impares.join(", ")}`,
        `Soma dos ímpares: ${somaImpar}`
    ].join("\n")
})
