# JavaScript Projects Dashboard

**[Acessar o Dashboard](https://jjoaomarcelo-dev.github.io/javascript-projects-dashboard/)**

Dashboard desenvolvido para organizar e acompanhar minha prática em JavaScript durante a retomada ao desenvolvimento de software.

## Sobre o projeto

O JavaScript Projects Dashboard reúne exercícios e projetos em um painel com cadastro, edição, remoção, busca, filtros e indicadores.

Cada registro contém título, categoria, tema, data da prática, status, descrição e, quando disponíveis, links para execução e código.

A proposta é centralizar as atividades realizadas, facilitar a consulta aos conteúdos estudados e permitir o acesso direto aos exercícios e projetos.

O Dashboard também funciona como um registro da minha evolução técnica, recebendo novas atividades conforme avanço nos estudos.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro, sem bibliotecas ou frameworks

## Desenvolvimento

O projeto evolui de forma incremental. Cada funcionalidade parte de uma necessidade do painel e envolve definir o comportamento esperado, implementar, testar no navegador e revisar o código.

A implementação utiliza funções, arrays, objetos, eventos, manipulação do DOM, validação de formulários e persistência local.

As funcionalidades de cadastro, edição, remoção, busca, filtros e links mantêm os dados e a interface sincronizados.

Cada registro documenta a prática realizada, sua data e os conceitos envolvidos.

## Decisões técnicas

- **JavaScript puro:** implementação direta da lógica e da manipulação do DOM, sem bibliotecas ou frameworks.
- **localStorage:** persistência dos registros no navegador, sem necessidade de servidor nesta versão.
- **Catálogo inicial:** os registros públicos ficam em `data/registros.json` e são carregados quando o visitante ainda não possui dados armazenados localmente.
- **Busca e filtros combinados:** permitem localizar registros por título, tema, categoria e status. O resumo mantém os totais gerais dos registros.
- **Renderização dos textos:** os campos dos registros são inseridos nos cards utilizando `textContent`.
- **Organização dos exercícios:** cada exercício possui sua própria pasta, contendo HTML, CSS e JavaScript, permitindo execução independente e consulta ao código.
- **Estilo dos exercícios:** cada exercício possui seu próprio `style.css`, seguindo a identidade visual do Dashboard.
- **Ordenação:** os registros são exibidos do mais recente para o mais antigo, preservando os exercícios anteriores como parte do histórico de aprendizado.
- **Dados locais e compartilhamento:** as alterações realizadas pelo gerenciamento são armazenadas somente no navegador utilizado. Uma futura API com banco de dados permitirá compartilhar registros entre diferentes visitantes.

## Funcionalidades

- [x] Estrutura inicial do painel
- [x] Layout responsivo
- [x] Formulário para exercícios e projetos
- [x] Leitura e validação dos campos
- [x] Cadastro e listagem de exercícios e projetos
- [x] Armazenamento com `localStorage`
- [x] Edição e remoção de registros
- [x] Resumo de exercícios e projetos
- [x] Modal para cadastro e edição
- [x] Filtros por categoria e status
- [x] Busca por título ou tema
- [x] Tratamento de dados inválidos e falhas no armazenamento
- [x] Ordenação dos registros do mais recente para o mais antigo
- [x] Links para visualizar o código
- [x] Links para executar exercícios e projetos no navegador
- [x] Carregamento do catálogo inicial de `data/registros.json`
- [x] Inclusão do próprio Dashboard no catálogo público
- [x] Inclusão de exercícios no catálogo público
- [x] Publicação do Dashboard no GitHub Pages

Os exercícios ficam organizados na pasta `exercicios/`. Cada um possui seu enunciado no início do arquivo JavaScript e pode ser acessado pelo Dashboard, com links para execução e consulta ao código no GitHub.

As datas dos registros representam a sequência de estudo e podem ser estimativas quando não existe um registro exato do dia em que cada exercício foi realizado.

## Evolução full stack

As próximas etapas planejadas incluem:

- [ ] Criar uma API para gerenciar os registros
- [ ] Armazenar os dados em banco de dados
- [ ] Adicionar autenticação para proteger o cadastro e a edição
- [ ] Substituir o catálogo local por registros persistidos pela API
- [ ] Migrar gradualmente o projeto para TypeScript e React

A primeira versão foi desenvolvida com HTML, CSS e JavaScript puro, priorizando a prática dos fundamentos da linguagem e a compreensão do funcionamento da aplicação.

A evolução full stack será realizada gradualmente, conforme o avanço dos estudos e as necessidades do projeto.

## Como executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/jjoaomarcelo-dev/javascript-projects-dashboard.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd javascript-projects-dashboard
   ```

3. Inicie um servidor local:

   ```bash
   python3 -m http.server 8000
   ```

4. Abra no navegador:

   http://localhost:8000

Não é necessário instalar dependências.

O servidor local permite o carregamento do catálogo inicial armazenado em `data/registros.json`.

## Estrutura do projeto

```text
javascript-projects-dashboard/
├── exercicios/
│   └── exercicio-NN-nome/
│       ├── index.html
│       ├── style.css
│       └── script.js
├── data/
│   └── registros.json
├── index.html
├── style.css
├── script.js
├── .gitignore
├── .gitattributes
└── README.md
```

- **`exercicios/`:** exercícios organizados individualmente.
- **`data/registros.json`:** catálogo inicial de exercícios e projetos.
- **`index.html`:** estrutura principal do Dashboard.
- **`style.css`:** estilos e responsividade.
- **`script.js`:** lógica do painel, eventos, validações e gerenciamento dos registros.
- **`.gitignore`:** configuração dos arquivos ignorados pelo Git.
- **`.gitattributes`:** configuração de detecção de linguagens no GitHub.
- **`README.md`:** documentação do projeto.

## Status

**Primeira versão publicada e em evolução contínua.**

O Dashboard reúne exercícios de JavaScript e projetos pessoais, com funcionalidades de cadastro, edição, remoção, busca, filtros, indicadores e acesso ao código e à execução das atividades.

Novos exercícios e projetos serão adicionados conforme avanço nos estudos e na prática de desenvolvimento.

Os registros criados pelo gerenciamento ficam armazenados no navegador por meio do `localStorage`, sem sincronização entre dispositivos ou compartilhamento das alterações com outros visitantes.

O carregamento e o salvamento dos registros incluem tratamento de dados inválidos e falhas de armazenamento.

A evolução para uma arquitetura full stack está planejada para etapas futuras.
