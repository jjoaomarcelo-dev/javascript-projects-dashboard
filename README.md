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

- **Estilo dos exercícios:** cada exercício tem seu próprio `style.css`, seguindo as cores e o visual do dashboard.
- **JavaScript puro:** implementação direta da lógica e da manipulação do DOM, sem bibliotecas ou frameworks.
- **localStorage:** persistência dos registros no navegador, sem necessidade de servidor nesta versão.
- **Busca e filtros combinados:** título, tema, categoria e status podem ser usados em conjunto; o resumo mantém os totais gerais dos registros.
- **Renderização dos textos:** os campos dos registros são inseridos nos cards com `textContent`.
- **Organização dos exercícios:** os arquivos ficam separados em pastas dentro do projeto, permitindo executar cada exercício e consultar seu código pelo Dashboard. Os registros são exibidos do mais recente para o mais antigo, sem retirar os exercícios iniciais que mostram minha evolução.
- **Dados compartilhados:** o catálogo inicial fica em `data/registros.json` e é carregado quando o visitante ainda não tem registros no `localStorage`. As alterações feitas pelo gerenciamento continuam salvas somente no navegador utilizado. Futuramente, a API e o banco de dados permitirão que os registros cadastrados sejam compartilhados entre todos os visitantes.

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
- [x] Carregar o catálogo inicial de `data/registros.json` para visitantes sem registros locais
- [x] Adicionar o dashboard como primeiro projeto do catálogo público
- [x] Adicionar exercícios ao catálogo público
- [ ] Publicação do dashboard

Os exercícios ficam na pasta `exercicios/`. Cada um tem seu enunciado no início do JavaScript e pode ser aberto pelo dashboard, com acesso ao código no GitHub. As datas foram organizadas para representar a sequência de estudo entre agosto e outubro de 2026 e podem ser estimativas quando não há um registro exato do dia em que cada exercício foi feito.

## Evolução full stack

- [ ] Criar uma API para gerenciar os registros
- [ ] Armazenar os dados em banco de dados
- [ ] Adicionar autenticação para proteger o cadastro e a edição
- [ ] Substituir o catálogo local por registros persistidos pela API
- [ ] Migrar gradualmente o projeto para TypeScript e React

A prioridade é concluir e publicar a primeira versão com HTML, CSS e JavaScript. A evolução full stack será avaliada em etapas posteriores.

## Como executar

1. Baixe ou clone o repositório.
2. No terminal, entre na pasta do projeto e execute `python3 -m http.server`.
3. Abra `http://localhost:8000` no navegador.

Não é necessário instalar dependências. Um servidor local é usado para permitir o carregamento de `data/registros.json`.

## Estrutura da primeira versão

```text
javascript-projects-dashboard/
├── exercicios/  # 28 exercícios, cada um em sua própria pasta
│   └── exercicio-NN-nome/
│       ├── index.html
│       ├── style.css
│       └── script.js
├── data/        # Catálogo inicial da versão pública
├── index.html   # Estrutura da página
├── style.css    # Estilos e responsividade
├── script.js    # Lógica do painel
└── README.md    # Documentação do projeto
```

## Status

Em desenvolvimento. O fluxo de cadastro, listagem, edição e remoção está implementado, assim como a busca, os filtros, o resumo, os links para código e execução e o carregamento do catálogo inicial com os 28 exercícios. A publicação permanece pendente.

Os registros criados pelo gerenciamento ainda ficam salvos somente no navegador utilizado. Não há sincronização entre dispositivos, e as alterações não são compartilhadas com outros visitantes. O carregamento e o salvamento já tratam dados inválidos e falhas de armazenamento.

## Apoio de IA

Utilizo IA como apoio para explicações, revisão de código e investigação de problemas. A revisão dos exercícios também contou com apoio de IA em correções de validação, adaptação para o navegador e organização da apresentação.
