/*
DESAFIO 10 — Contador com controles

Objetivo
Praticar transições de estado e limites.

Enunciado
Desenvolva um contador com ações de aumentar, diminuir e reiniciar.

Requisitos e limites
- Iniciar em zero; aumentar e diminuir em uma unidade.
- Impedir valores negativos.
- A ação de reiniciar deve restaurar zero em qualquer estado.

Exemplos para conferir
- Aumentar duas vezes e diminuir uma vez deixa o contador em 1.
- Diminuir quando ele já está em 0 não deve deixá-lo negativo.
- Zerar deve devolver o contador a 0.
*/

"use strict";

const botaoAumentar = document.querySelector("#bt1");
const botaoDiminuir = document.querySelector("#bt2");
const botaoZerar = document.querySelector("#bt3");
const resultado = document.querySelector("#numero")
let cont = Number(resultado.textContent)

const aumentar = () => {
    cont++
    resultado.textContent = cont
}

const diminuir = () => {
    if (cont > 0) {
        cont--
        resultado.textContent = cont
    }
}

const zerar = () => {
    cont = 0
    resultado.textContent = cont
}

botaoAumentar.addEventListener("click", aumentar)
botaoDiminuir.addEventListener("click", diminuir)
botaoZerar.addEventListener("click", zerar)

