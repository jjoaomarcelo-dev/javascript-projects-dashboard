/*
DESAFIO 09 — Contador de cliques

Objetivo
Praticar eventos, estado e atualização da interface.

Enunciado
Construa um contador que registre quantas vezes o usuário acionou um botão.

Requisitos e limites
- Iniciar em zero e incrementar uma unidade por acionamento.
- Exibir o total atualizado na página.
- Registrar eventos no JavaScript, sem manipuladores inline no HTML.

Exemplos para conferir
O contador começa em 0. Depois de três cliques, deve mostrar 3.
Ao recarregar a página, ele volta para 0.
*/

const botao = document.querySelector("#btn-contar")
const resultado = document.querySelector("#resultado")
let contador = 0

const contarClique = () =>{
    contador ++
    resultado.textContent = `Cliques: ${contador}`
}

botao.addEventListener("click", contarClique)
