/*
DESAFIO 08 — Relatório de notas

Objetivo
Praticar classificação, média e validação de dados.

Enunciado
Dadas as notas [8, 5, 9, 6, 4, 10, 7, 3], apresente um relatório da turma,
considerando aprovação a partir de 7.

Requisitos e limites
- Apresentar notas aprovadas e reprovadas, quantidades, soma e média.
- Considerar válidas somente notas numéricas entre 0 e 10; sinalizar e desconsiderar notas inválidas.
- Se não houver notas válidas, evitar divisão por zero.

Exemplos para conferir
Com as notas fornecidas, o relatório deve mostrar:
- 4 notas aprovadas e 4 reprovadas.
- Soma: 52.
- Média: 6,5.
*/

const notas = [8, 5, 9, 6, 4, 10, 7, 3]

document.querySelector("#dados").textContent = notas.join(", ")

document.querySelector("#btnExecutar").addEventListener("click", () => {
    const aprovadas = []
    const reprovadas = []
    let soma = 0
    let invalidas = 0

    for (const v of notas) {
        if (!Number.isFinite(v) || v < 0 || v > 10) {
            invalidas++
            continue
        }

        if (v >= 7) {
            aprovadas.push(v)
        } else {
            reprovadas.push(v)
        }

        soma += v
    }

    const quantidadeValidas = aprovadas.length + reprovadas.length
    const media = quantidadeValidas > 0 ? soma / quantidadeValidas : 0
    const resumo = [
        `Notas aprovadas: ${aprovadas.join(", ")}`,
        `Notas reprovadas: ${reprovadas.join(", ")}`,
        `Quantidade de notas aprovadas: ${aprovadas.length}`,
        `Quantidade de notas reprovadas: ${reprovadas.length}`,
        `Soma de todas as notas: ${soma}`,
        `Média de todas as notas: ${media}`
    ]

    if (invalidas > 0) {
        resumo.push(`Notas inválidas desconsideradas: ${invalidas}`)
    }
    document.querySelector("#resultado").textContent = resumo.join("\n")
})
