/*
DESAFIO 14 — Transferência de cursos

Objetivo
Praticar movimentação de elementos e estado de seleção no DOM.

Enunciado
Organize HTML, CSS, JavaScript, PHP, React e MySQL entre duas listas: disponíveis e transferidos.

Requisitos e limites
- Permitir alternar a seleção de cada curso nas duas listas.
- Ao confirmar, os selecionados devem ficar na lista de transferidos e os não selecionados na de disponíveis.
- Cada curso deve existir uma única vez, sem perda ou duplicação após operações repetidas.

Exemplos para conferir
Selecione dois cursos e confirme: os dois devem ir para a lista de transferidos.
Desmarque um deles e confirme novamente: esse curso deve voltar aos disponíveis,
sem desaparecer nem aparecer duas vezes.
*/

const caixa1 = document.querySelector("#caixa1")
const caixa2 = document.querySelector("#caixa2")
const botaoTransferir = document.querySelector("#btn-transferir")
const todosCursos = document.querySelectorAll(".curso")

for (const curso of todosCursos) {
    curso.addEventListener("click", () => {
        curso.classList.toggle("selecionado")
        curso.setAttribute("aria-pressed", String(curso.classList.contains("selecionado")))
    })
}

botaoTransferir.addEventListener("click", () => {
    const cursosSelecionados = document.querySelectorAll(".curso.selecionado")
    const cursosNaoSelecionados = document.querySelectorAll(".curso:not(.selecionado)")

    for (const curso of cursosSelecionados) {
        caixa2.appendChild(curso)
    }
    for (const curso of cursosNaoSelecionados) {
        caixa1.appendChild(curso)
    }
})
