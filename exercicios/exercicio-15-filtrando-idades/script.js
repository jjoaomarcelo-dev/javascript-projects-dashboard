/*
DESAFIO 15 — Filtro de maioridade

Objetivo
Praticar seleção de elementos com filter().

Enunciado
A partir de [12, 18, 25, 16, 30, 14, 21, 17], apresente as pessoas com idade suficiente para a maioridade, considerada aos 18 anos.

Requisitos e limites
- Exibir a lista original, as idades encontradas e a quantidade.
- Preservar a coleção original e incluir quem possui exatamente 18 anos.
- Repetir a consulta não pode duplicar o resultado.

Exemplos para conferir
O resultado para a lista fornecida é [18, 25, 30, 21], com 4 idades.
Se nenhuma idade chegar a 18, a quantidade deve ser 0.
*/

const listaIdades = document.querySelector("#idades")
const btn = document.querySelector("#btnFiltrar")
const resultado = document.querySelector("#resultado")
const quantidade = document.querySelector("#quantidade")

const idades = [12, 18, 25, 16, 30, 14, 21, 17]

listaIdades.textContent = idades.join(", ")

btn.addEventListener("click", () => {
    const maioresDeIdade = idades.filter((valor) => valor >= 18)

    resultado.textContent = `Idades encontradas: ${maioresDeIdade.join(", ")}`
    quantidade.textContent = `Quantidade: ${maioresDeIdade.length}`
})
