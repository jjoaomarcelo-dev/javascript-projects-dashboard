/*
DESAFIO 21 — Registro de notas com Map

Objetivo
Praticar Map, eventos, validação de campos e atualização do DOM.

Enunciado
Desenvolva um registro de notas que permita cadastrar, consultar, atualizar e remover alunos.

Requisitos e limites
- Use um Map em que o nome do aluno seja a chave e a nota seja o valor.
- Não aceite nome vazio ou composto apenas por números.
- Aceite apenas notas numéricas entre 0 e 10.
- Trate nomes com letras maiúsculas, minúsculas e espaços extras como o mesmo aluno.
- Atualize a listagem e o total após cadastrar ou remover um aluno.

Exemplos para conferir
Cadastre Maria com nota 8. Depois cadastre "maria" com nota 9.
Deve existir apenas uma Maria, agora com nota 9.
Ao remover o último aluno, a lista deve informar que está vazia.
*/

const nomeAluno = document.querySelector("#nomeAluno")
const notaAluno = document.querySelector("#notaAluno")

const btnCadastrar = document.querySelector("#btnCadastrar")
const btnConsultar = document.querySelector("#btnConsultar")
const btnRemover = document.querySelector("#btnRemover")

const resultado = document.querySelector("#resultado")
const totalAlunos = document.querySelector("#totalAlunos")
const listaNotas = document.querySelector("#listaNotas")

const alunos = new Map([
    ["João", 8],
    ["Mari", 6],
    ["Zé", 9]
])

const formatarNome = (texto) => {
    return texto
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(" ")
}

const mostrarMensagem = (texto) => {
    resultado.textContent = texto
}

const limparCampos = () => {
    nomeAluno.value = ""
    notaAluno.value = ""
}

const atualizarLista = () => {
    totalAlunos.textContent = alunos.size
    listaNotas.textContent = ""

    if (alunos.size === 0) {
        listaNotas.textContent = "Nenhum aluno cadastrado."
        return
    }

    alunos.forEach((notaRegistrada, nomeRegistrado) => {
        const itemAluno = document.createElement("article")
        itemAluno.classList.add("nota-card")

        const tituloAluno = document.createElement("h3")
        tituloAluno.textContent = nomeRegistrado

        const textoNota = document.createElement("p")
        textoNota.textContent = `Nota: ${notaRegistrada}`

        itemAluno.append(tituloAluno, textoNota)
        listaNotas.append(itemAluno)
    })
}

const obterNomeValido = () => {
    const nomeFormatado = formatarNome(nomeAluno.value)

    if (nomeFormatado === "" || !Number.isNaN(Number(nomeFormatado))) {
        mostrarMensagem("Informe um nome de aluno válido.")
        return null
    }

    return nomeFormatado
}

const obterNotaValida = () => {
    if (notaAluno.value.trim() === "") {
        mostrarMensagem("Informe a nota do aluno.")
        return null
    }

    const notaDigitada = Number(notaAluno.value)

    if (!Number.isFinite(notaDigitada) || notaDigitada < 0 || notaDigitada > 10) {
        mostrarMensagem("Informe uma nota entre 0 e 10.")
        return null
    }

    return notaDigitada
}

btnCadastrar.addEventListener("click", () => {
    const nomeFormatado = obterNomeValido()

    if (nomeFormatado === null) {
        return
    }

    const notaDigitada = obterNotaValida()

    if (notaDigitada === null) {
        return
    }

    const jaExiste = alunos.has(nomeFormatado)
    alunos.set(nomeFormatado, notaDigitada)

    if (jaExiste) {
        mostrarMensagem(`A nota de ${nomeFormatado} foi atualizada para ${notaDigitada}.`)
    } else {
        mostrarMensagem(`${nomeFormatado} foi cadastrado com nota ${notaDigitada}.`)
    }

    limparCampos()
    atualizarLista()
})

btnConsultar.addEventListener("click", () => {
    const nomeFormatado = obterNomeValido()

    if (nomeFormatado === null) {
        return
    }

    if (!alunos.has(nomeFormatado)) {
        mostrarMensagem("Aluno não encontrado.")
        return
    }

    const nota = alunos.get(nomeFormatado)
    mostrarMensagem(`${nomeFormatado} tem nota ${nota}.`)
})

btnRemover.addEventListener("click", () => {
    const nomeFormatado = obterNomeValido()

    if (nomeFormatado === null) {
        return
    }

    if (!alunos.has(nomeFormatado)) {
        mostrarMensagem("Aluno não encontrado.")
        return
    }

    alunos.delete(nomeFormatado)
    mostrarMensagem(`${nomeFormatado} foi removido do registro.`)
    limparCampos()
    atualizarLista()
})

nomeAluno.addEventListener("click", () => nomeAluno.select())

atualizarLista()
