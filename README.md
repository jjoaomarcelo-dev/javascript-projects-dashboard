# JavaScript Projects Dashboard

Dashboard desenvolvido para organizar minha prática em JavaScript durante a retomada ao desenvolvimento de software.

## Sobre o projeto

O JavaScript Projects Dashboard reúne exercícios e projetos em um painel com cadastro, edição, remoção, busca, filtros e indicadores. Cada registro contém título, categoria, tema, data da prática, status, descrição e, quando disponível, links para execução e código.

A proposta é centralizar todo o trabalho realizado para facilitar a consulta e acessar cada exercício ou projeto diretamente pelo painel.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro, sem bibliotecas ou frameworks

## Desenvolvimento

O projeto evolui de forma incremental. Cada funcionalidade parte de uma necessidade do painel e envolve definir o comportamento, implementar, testar no navegador e revisar o código.

O código utiliza funções, arrays, objetos, eventos, manipulação do DOM, validação de formulários e persistência local. As funcionalidades de cadastro, edição, remoção, busca, filtros e links mantêm os dados e a interface sincronizados.

Cada registro documenta a prática realizada, sua data e os conceitos envolvidos.

## Decisões técnicas

- **JavaScript puro:** implementação direta da lógica e da manipulação do DOM, sem bibliotecas ou frameworks.
- **localStorage:** persistência dos registros no navegador, sem necessidade de servidor nesta versão.
- **Busca e filtros combinados:** título, tema, categoria e status podem ser usados em conjunto; o resumo mantém os totais gerais dos registros.
- **Renderização dos textos:** os campos dos registros são inseridos nos cards com `textContent`.
- **Organização dos exercícios:** os arquivos ficarão separados em pastas dentro do projeto, permitindo executar cada exercício e consultar seu código pelo Dashboard. Os registros serão exibidos do mais recente para o mais antigo, sem retirar os exercícios iniciais que mostram minha evolução.
- **Dados compartilhados:** a primeira versão pública terá um catálogo inicial incluído no projeto. As alterações feitas pelo gerenciamento continuarão salvas no navegador. Futuramente, a API e o banco de dados permitirão que os registros cadastrados sejam compartilhados entre todos os visitantes.

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
- [x] Tratamento de dados inválidos e falhas no armazenamento
- [x] Ordenação dos registros do mais recente para o mais antigo
- [x] Links para visualizar o código
- [x] Links para executar exercícios e projetos no navegador
- [ ] Catálogo inicial compartilhado entre os visitantes
- [ ] Publicação do dashboard

## Evolução full stack

- [ ] Criar uma API para gerenciar os registros
- [ ] Armazenar os dados em banco de dados
- [ ] Adicionar autenticação para proteger o cadastro e a edição
- [ ] Substituir o catálogo local por registros persistidos pela API
- [ ] Migrar gradualmente o projeto para TypeScript e React

A prioridade é concluir e publicar a primeira versão com HTML, CSS e JavaScript. A evolução full stack será avaliada em etapas posteriores.

## Como executar

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador.

Não é necessário instalar dependências.

## Estrutura planejada para a primeira versão

```text
javascript-projects-dashboard/
├── exercicios/  # Exercícios executáveis organizados em pastas
├── data/        # Catálogo inicial da versão pública
├── index.html   # Estrutura da página
├── style.css    # Estilos e responsividade
├── script.js    # Lógica do painel
└── README.md    # Documentação do projeto
```

## Status

Em desenvolvimento. O fluxo de cadastro, listagem, edição e remoção está implementado, assim como a busca, os filtros, o resumo e os links para código e execução. A publicação e os demais itens da primeira versão permanecem pendentes.

Os registros criados pelo gerenciamento ainda ficam salvos somente no navegador utilizado. Não há sincronização entre dispositivos, e as alterações não são compartilhadas com outros visitantes. O carregamento e o salvamento já tratam dados inválidos e falhas de armazenamento.

## Apoio de IA

Utilizo IA como apoio para explicações, revisão de código e investigação de problemas.
