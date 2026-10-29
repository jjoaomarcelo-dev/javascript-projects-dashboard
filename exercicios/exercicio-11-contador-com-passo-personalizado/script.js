/*
DESAFIO 11 — Contador com passo personalizado

Objetivo
Praticar validação e operações sobre estado.

Enunciado
Amplie o contador para permitir que o usuário escolha o tamanho do incremento e do decremento.

Requisitos e limites
- O passo inicial é 1 e deve ser um inteiro maior que zero.
- Uma entrada inválida deve gerar uma mensagem sem alterar o contador.
- O contador não pode ser negativo; operações válidas devem limpar a mensagem de erro.
- Reiniciar deve funcionar mesmo com passo inválido, zerar o contador e limpar o erro.

Exemplos para conferir
- Com passo 3, aumentar duas vezes leva o contador a 6.
- Se o contador estiver em 3 e o passo for 5, diminuir deve deixá-lo em 0.
- Passo vazio, zero ou decimal deve gerar uma mensagem sem mudar o contador.
*/

"use strict";

const inputPasso = document.querySelector("#passo");
const botaoAumentar = document.querySelector("#bt1");
const botaoDiminuir = document.querySelector("#bt2");
const botaoZerar = document.querySelector("#bt3");
const numero = document.querySelector("#numero");
const mensagem = document.querySelector("#mensagem");

let cont = 0;
numero.textContent = cont;

const aumentar = () => {
    mensagem.textContent = "";
    const passo = Number(inputPasso.value);
    if (Number.isInteger(passo) && passo > 0) {
        cont += passo;
        numero.textContent = cont;
    } else {
        mensagem.textContent = "Digite um passo inteiro maior que zero"
    }
}

const diminuir = () => {
    mensagem.textContent = ""
    const passo = Number(inputPasso.value)
    if (Number.isInteger(passo) && passo > 0) {
        cont -= passo
        if (cont < 0) {
            cont = 0
        }
        numero.textContent = cont
    } else {
        mensagem.textContent = "Digite um passo inteiro maior que zero"
    }
}

const zerar = () => {
    inputPasso.value = 1
    mensagem.textContent = ""
    cont = 0
    numero.textContent = cont

}

botaoAumentar.addEventListener("click", aumentar);
botaoDiminuir.addEventListener("click", diminuir);
botaoZerar.addEventListener("click", zerar);
