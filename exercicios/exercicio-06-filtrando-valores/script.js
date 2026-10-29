/*
DESAFIO 06 — Valores acima de um limite

Objetivo
Praticar seleção, contagem e acumulação.

Enunciado
Analise [10, 25, 8, 42, 17, 60, 3, 31, 50] e produza um relatório dos valores maiores que 20.

Requisitos e limites
- Apresentar os valores selecionados, sua soma e sua quantidade.
- Excluir o próprio limite e preservar a coleção original.
- Resolver sem filter() e reduce().

Exemplos para conferir
- Valores maiores que 20: [25, 42, 60, 31, 50].
- Soma desses valores: 208.
- Quantidade encontrada: 5.
*/

const numeros = [10, 25, 8, 42, 17, 60, 3, 31, 50]

document.querySelector("#dados").textContent = numeros.join(", ")

document.querySelector("#btnExecutar").addEventListener("click", () => {
    const maioresQue20 =[]
    let soma = 0
    for (let cont of numeros){
        if (cont > 20){
            maioresQue20.push(cont)
            soma += cont
        }
    }


    document.querySelector("#resultado").textContent = [
        `Números maiores que 20: ${maioresQue20.join(", ")}`,
        `Soma: ${soma}`,
        `Quantidade: ${maioresQue20.length}`
    ].join("\n")
})
