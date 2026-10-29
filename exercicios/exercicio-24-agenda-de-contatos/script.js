/*
DESAFIO 24 — Agenda de contatos

Objetivo
Praticar objetos literais, some(), find(), validação e atualização do DOM.

Enunciado
Desenvolva uma agenda que permita cadastrar, consultar, atualizar e remover contatos.

Requisitos e limites
- Represente cada contato como um objeto literal com nome, telefone e cidade.
- Não aceite nome ou cidade vazios, nem campos compostos apenas por números.
- Aceite telefones com 8 ou 9 dígitos.
- Trate nomes com diferenças de caixa e espaços extras como o mesmo contato.
- Atualize a lista e o total após cadastrar ou remover um contato.

Exemplos para conferir
Cadastre Maria com o telefone 99999-1111. Depois cadastre "maria" com outro telefone.
Deve existir apenas uma Maria com os dados atualizados.
Ao remover o último contato, a lista deve informar que está vazia.
*/

const nomeContato = document.querySelector("#nomeContato")
const telefoneContato = document.querySelector("#telefoneContato")
const cidadeContato = document.querySelector("#cidadeContato")

const btnCadastrar = document.querySelector("#btnCadastrar")
const btnConsultar = document.querySelector("#btnConsultar")
const btnRemover = document.querySelector("#btnRemover")

const resultado = document.querySelector("#resultado")
const totalContatos = document.querySelector("#totalContatos")
const listaContatos = document.querySelector("#listaContatos")

const contatos = [
    { nome: "João", telefone: "99999-1111", cidade: "Curitiba" },
    { nome: "Mari", telefone: "99999-2222", cidade: "São Paulo" },
    { nome: "Zé", telefone: "99999-3333", cidade: "Florianópolis" }
]

const formatarTexto = (texto) => {
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
    nomeContato.value = ""
    telefoneContato.value = ""
    cidadeContato.value = ""
}

const obterNomeValido = () => {
    const nomeFormatado = formatarTexto(nomeContato.value)

    if (nomeFormatado === "" || !Number.isNaN(Number(nomeFormatado))) {
        mostrarMensagem("Informe um nome válido.")
        return null
    }

    return nomeFormatado
}

const obterCidadeValida = () => {
    const cidadeFormatada = formatarTexto(cidadeContato.value)

    if (cidadeFormatada === "" || !Number.isNaN(Number(cidadeFormatada))) {
        mostrarMensagem("Informe uma cidade válida.")
        return null
    }

    return cidadeFormatada
}

const obterTelefoneValido = () => {
    const telefoneSomenteNumeros = telefoneContato.value.replace(/\D/g, "")

    if (telefoneSomenteNumeros.length !== 8 && telefoneSomenteNumeros.length !== 9) {
        mostrarMensagem("Informe um telefone com 8 ou 9 números.")
        return null
    }

    if (telefoneSomenteNumeros.length === 8) {
        return `${telefoneSomenteNumeros.slice(0, 4)}-${telefoneSomenteNumeros.slice(4)}`
    }

    return `${telefoneSomenteNumeros.slice(0, 5)}-${telefoneSomenteNumeros.slice(5)}`
}

const atualizarLista = () => {
    totalContatos.textContent = contatos.length
    listaContatos.textContent = ""

    if (contatos.length === 0) {
        listaContatos.textContent = "Nenhum contato cadastrado."
        return
    }

    contatos.forEach((contato) => {
        const cardContato = document.createElement("article")
        cardContato.classList.add("contato-card")

        const nome = document.createElement("h3")
        nome.textContent = contato.nome

        const detalhes = document.createElement("p")
        detalhes.textContent = `${contato.telefone} · ${contato.cidade}`

        cardContato.append(nome, detalhes)
        listaContatos.append(cardContato)
    })
}

btnCadastrar.addEventListener("click", () => {
    const nomeFormatado = obterNomeValido()

    if (nomeFormatado === null) {
        return
    }

    const telefoneFormatado = obterTelefoneValido()

    if (telefoneFormatado === null) {
        return
    }

    const cidadeFormatada = obterCidadeValida()

    if (cidadeFormatada === null) {
        return
    }

    const jaExiste = contatos.some(contato => contato.nome === nomeFormatado)

    if (jaExiste) {
        const contatoEncontrado = contatos.find(contato => contato.nome === nomeFormatado)
        contatoEncontrado.telefone = telefoneFormatado
        contatoEncontrado.cidade = cidadeFormatada
        mostrarMensagem(`Os dados de ${nomeFormatado} foram atualizados.`)
    } else {
        const novoContato = {
            nome: nomeFormatado,
            telefone: telefoneFormatado,
            cidade: cidadeFormatada
        }
        contatos.push(novoContato)
        mostrarMensagem(`${nomeFormatado} foi adicionado à agenda.`)
    }

    limparCampos()
    atualizarLista()
})

btnConsultar.addEventListener("click", () => {
    const nomeFormatado = obterNomeValido()

    if (nomeFormatado === null) {
        return
    }

    const contatoEncontrado = contatos.find(contato => contato.nome === nomeFormatado)

    if (!contatoEncontrado) {
        mostrarMensagem("Contato não encontrado.")
        return
    }

    mostrarMensagem(`${contatoEncontrado.nome}: ${contatoEncontrado.telefone} · ${contatoEncontrado.cidade}.`)
})

btnRemover.addEventListener("click", () => {
    const nomeFormatado = obterNomeValido()

    if (nomeFormatado === null) {
        return
    }

    const contatoEncontrado = contatos.find(contato => contato.nome === nomeFormatado)

    if (!contatoEncontrado) {
        mostrarMensagem("Contato não encontrado.")
        return
    }

    const indiceContato = contatos.indexOf(contatoEncontrado)
    contatos.splice(indiceContato, 1)
    mostrarMensagem(`${nomeFormatado} foi removido da agenda.`)
    limparCampos()
    atualizarLista()
})

nomeContato.addEventListener("click", () => nomeContato.select())
telefoneContato.addEventListener("click", () => telefoneContato.select())
cidadeContato.addEventListener("click", () => cidadeContato.select())

atualizarLista()
