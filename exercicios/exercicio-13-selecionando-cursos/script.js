/*
DESAFIO 13 — Seleção de cursos

Objetivo
Praticar eventos e representação visual de seleção.

Enunciado
Uma página apresenta HTML, CSS, JavaScript e React. Permita selecionar cursos e consultar a quantidade selecionada.

Requisitos e limites
- Acionar um curso alterna sua seleção e seu destaque visual.
- O botão de contagem deve considerar a seleção atual.
- Repetir a contagem não pode alterar nem duplicar a seleção.

Exemplos para conferir
Selecionar HTML e JavaScript deve mostrar 2 cursos selecionados.
Ao desmarcar os dois, a contagem deve voltar para 0.
*/

const todosCursos = document.querySelectorAll(".curso")
const botao = document.querySelector("#btn-contar")


for (const curso of todosCursos) {
    curso.addEventListener("click", () => {
        curso.classList.toggle("selecionado")
        curso.setAttribute("aria-pressed", String(curso.classList.contains("selecionado")))
    })
}

const contar = () => {
    const selecionados = document.querySelectorAll(".selecionado")
    const quantidade = selecionados.length
    const resultado = document.querySelector("#resultado")
    resultado.textContent = `Cursos selecionados: ${quantidade}`
}

botao.addEventListener("click", contar)