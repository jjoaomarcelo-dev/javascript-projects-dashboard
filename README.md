# JavaScript Projects Dashboard

Dashboard desenvolvido para organizar minha prática em JavaScript durante a retomada ao desenvolvimento de software.

## Sobre o projeto

O JavaScript Projects Dashboard reúne exercícios e projetos em um painel com cadastro, edição, remoção, busca, filtros e indicadores. Cada registro contém título, categoria, tema, data da prática, status e descrição.

A proposta é centralizar todo o trabalho realizado para facilitar a consulta. Os próximos incrementos incluem o acesso direto ao código-fonte e a execução dos exercícios e projetos pelo próprio navegador.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro, sem bibliotecas ou frameworks

## Desenvolvimento

O projeto evolui de forma incremental. Cada funcionalidade parte de uma necessidade do painel e envolve definir o comportamento, implementar, testar no navegador e revisar o código.

O código utiliza funções, arrays, objetos, eventos, manipulação do DOM, validação de formulários e persistência local. As funcionalidades de cadastro, edição, remoção, busca e filtros mantêm os dados e a interface sincronizados.

Cada registro documenta a prática realizada, sua data e os conceitos envolvidos.

## Decisões técnicas

- **JavaScript puro:** implementação direta da lógica e da manipulação do DOM, sem bibliotecas ou frameworks.
- **localStorage:** persistência dos registros no navegador, sem necessidade de servidor nesta versão.
- **Busca e filtros combinados:** título, tema, categoria e status podem ser usados em conjunto; o resumo mantém os totais gerais dos registros.
- **Renderização dos textos:** os campos dos registros são inseridos nos cards com `textContent`.

## Funcionalidades

- [x] Estrutura inicial do painel
- [x] Layout responsivo
- [x] Formulário para exercícios e projetos
- [x] Leitura e validação dos campos
- [x] Cadastro e listagem de exercícios e projetos
- [x] Armazenamento com localStorage
- [x] Edição e remoção de registros
- [x] Resumo de exercícios e projetos
- [x] Modal para cadastro e edição
- [x] Filtros por categoria e status
- [x] Busca por título ou tema
- [x] Melhorar o tratamento de falhas e dados inválidos na persistência local
- [ ] Links para visualizar o código
- [ ] Links para executar exercícios e projetos no navegador
- [ ] Publicação do dashboard

## Evolução full stack

- [ ] Criar uma API para gerenciar os registros
- [ ] Armazenar os dados em banco de dados
- [ ] Adicionar autenticação para proteger o cadastro e a edição
- [ ] Disponibilizar os mesmos registros para todos os visitantes
- [ ] Migrar gradualmente o projeto para TypeScript e React

A prioridade é concluir e publicar a primeira versão com HTML, CSS e JavaScript. A evolução full stack será avaliada em etapas posteriores.

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências.

## Estrutura de arquivos

```text
javascript-projects-dashboard/
├── index.html   # Estrutura da página
├── style.css    # Estilos e responsividade
├── script.js    # Lógica do painel
└── README.md    # Documentação do projeto
```

## Status

Em desenvolvimento. O fluxo de cadastro, listagem, edição e remoção está implementado, assim como a busca, os filtros e o resumo. A publicação e os demais itens da primeira versão permanecem pendentes.

Os dados ficam restritos ao navegador e à origem em que foram cadastrados; não há sincronização entre dispositivos nem uma lista compartilhada entre visitantes. O tratamento de falhas de armazenamento ainda precisa ser melhorado. O repositório ainda não possui uma suíte de testes automatizados.

## Apoio de IA

Utilizo IA como apoio para explicações, revisão de código e investigação de problemas.
