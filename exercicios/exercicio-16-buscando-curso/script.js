/*
DESAFIO 16 — Busca de curso

Objetivo
Praticar busca com find() e normalização de texto.

Enunciado
Permita consultar um curso no catálogo [HTML, CSS, JavaScript, React, Node.js].

Requisitos e limites
- Exibir o catálogo e buscar pelo nome completo, sem diferenciar maiúsculas e minúsculas.
- Desconsiderar espaços nas extremidades da consulta.
- Distinguir campo vazio, curso encontrado e curso inexistente; limpar o campo após consulta não vazia.

Exemplos para conferir
- Buscar "javascript" deve encontrar JavaScript.
- Buscar "Python" deve informar que o curso não foi encontrado.
- Deixar o campo vazio ou digitar apenas espaços deve pedir o nome de um curso.
*/

const listaCursos = document.querySelector("#listaCursos")
const nomeCurso = document.querySelector("#nomeCurso")
const btnBuscar = document.querySelector("#btnBuscar")
const resultado = document.querySelector("#resultado")

const cursos = ["HTML", "CSS", "JavaScript", "React", "Node.js"]

listaCursos.textContent = cursos.join(" - ")

btnBuscar.addEventListener("click", () => {
   const cursoDigitado = nomeCurso.value.trim().toUpperCase()
   if (cursoDigitado === "") {
      resultado.textContent = "Digite o nome de um curso."
      return
   }

   const cursoEncontrado = cursos.find((curso) => {
      return curso.toUpperCase() === cursoDigitado
   })
   if (cursoEncontrado){
      resultado.textContent = `Curso encontrado: ${cursoEncontrado}`
   } else {
      resultado.textContent = "Curso não encontrado."
   }
   nomeCurso.value = ""
})
