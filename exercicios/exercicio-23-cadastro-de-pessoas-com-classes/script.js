/*
DESAFIO 23 — Cadastro de pessoas com classes

Objetivo
Praticar modelagem de entidades com classes e objetos.

Enunciado
Construa um cadastro de pessoas com nome e idade, apresentando a relação de pessoas registradas.

Requisitos e limites
- Modelar cada pessoa por uma classe com comportamento para consultar e atualizar seus dados.
- Exigir nome não vazio e não composto apenas por números.
- Aceitar somente idades inteiras não negativas; exibir os cadastros e limpar os campos após uma inclusão válida.

Exemplos para conferir
- Cadastrar João com 20 anos deve incluí-la na lista.
- A idade 0 também deve ser aceita.
- Idade negativa, decimal ou campo vazio não deve permitir o cadastro.
*/

const f_nome = document.querySelector("#f_nome")
const f_idade = document.querySelector("#f_idade")

const btnAdicionar = document.querySelector("#btnAdicionar")

const res = document.querySelector(".res")

class Pessoa {
    constructor(nome, idade) {
        this.nome = nome
        this.idade = idade
    }

    getNome() {
        return this.nome
    }

    getIdade() {
        return this.idade
    }

    setNome(nome) {
        this.nome = nome
    }

    setIdade(idade) {
        this.idade = idade
    }

    info() {
        return `Nome: ${this.nome} | Idade: ${this.idade}`
    }
}

const pessoas = []

const mostrarPessoas = () => {
    let textoPessoas = ""
    pessoas.forEach(pessoa => textoPessoas += pessoa.info() + "\n")
    return textoPessoas
}

f_nome.addEventListener("click", () => f_nome.select())
f_idade.addEventListener("click", () => f_idade.select())

btnAdicionar.addEventListener("click", () => {
    const nomeDigitado = f_nome.value
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ")

    if (nomeDigitado === "") {
        res.textContent = "Por favor informe o nome."
        return
    }
    if (!Number.isNaN(Number(nomeDigitado))) {
        res.textContent = "Por favor informe um nome válido."
        return
    }
    if (f_idade.value.trim() === "") {
        res.textContent = "Por favor, informe a idade."
        return
    }

    const idadeDigitada = Number(f_idade.value.trim())
    if (!Number.isInteger(idadeDigitada) || idadeDigitada < 0) {
        res.textContent = "Por favor informe uma idade inteira válida."
        return
    }

    const pessoa = new Pessoa(nomeDigitado, idadeDigitada)
    pessoas.push(pessoa)

    res.textContent = mostrarPessoas()
    f_nome.value = ""
    f_idade.value = ""
})