# Sports Central — recuperação UC15

Portal mobile first de serviços, eventos e notícias de uma comunidade esportiva. Conteúdos e locais fictícios, sem inscrições nem atendimento real. Projeto exclusivamente de interface, sem backend, banco, APIs externas ou CMS.

## Estado atual — 16/11/2026

Versão 0.4.0. Quatro páginas navegáveis, layout a partir de 320 px, accordion Bootstrap, pesquisa de notícias com jQuery, pesquisa de eventos com JavaScript, contato validado com envio simulado e favoritos no navegador. As imagens têm versões WebP e srcset/sizes, incluindo os favoritos. Publicação HTTPS e tag final estão previstas para 17/11.

## Organização

```text
UC15-Senac/
├── index.html
├── eventos.html
├── contato.html
├── favoritos.html
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── js/
│   ├── jquery.min.js
│   ├── bootstrap.bundle.min.js
│   ├── script.js
│   ├── contato.js
│   └── eventos.js
├── img/                 # WebP de 400, 800 e 1200 px; fontes SVG em fontes/
├── docs/                # planejamento, decisões, implementação e licenças
├── tests/portal.spec.js
├── playwright.config.js
├── package-lock.json
├── scripts/servir.mjs
├── README.md
├── TESTES.md
├── ACESSIBILIDADE.md
├── AUDITORIA.md
├── IA.md
├── package.json
└── .gitignore
```

A suíte fica em `tests/portal.spec.js`, com configuração na raiz. Os arquivos adicionais têm responsabilidades próprias; a organização de CSS, JS, imagens e documentos obrigatórios segue o modelo do enunciado.

## Executar

Com Node.js 22 ou superior instalado e disponível no PATH:

```sh
npm start
```

Abra http://127.0.0.1:4321 e encerre com Ctrl+C. O servidor não exige dependências de produção e só disponibiliza páginas e recursos de css/, js/ e img/. Nesta máquina foi usado Node 24.22.1 do runtime local; não foi alterada a instalação global.

## Interações e limites

- Bootstrap 5.3.8 controla exclusivamente o accordion; jQuery 4.0.0 controla exclusivamente o filtro de notícias. Bibliotecas locais, com licenças MIT em docs/licencas/.
- Contato valida campos obrigatórios e e-mail; mostra erros associados, foca o primeiro inválido e anuncia o resultado. Não envia nem armazena dados pessoais.
- Pesquisa de eventos ignora maiúsculas e acentos, anuncia a quantidade e restaura a lista ao limpar.
- Favoritos usam sportsCentralFavoritos no localStorage. Itens da versão anterior são compatíveis quando válidos; endereços de imagens armazenados não são reutilizados. A persistência depende do mesmo navegador e origem e não sincroniza dispositivos. JSON inválido pode ser substituído por uma nova seleção; falhas de acesso ou gravação são anunciadas sem sucesso falso.
- Sem JavaScript, as páginas e o catálogo continuam disponíveis, mas pesquisa, favoritos e simulação de contato ficam indisponíveis.

## Imagens: origem, licença e otimização

As fotografias antigas não tinham licença comprovada e foram retiradas da entrega. Foram substituídas por cinco ilustrações geométricas criadas para este repositório: estádio, futebol, treinamento, basquete e automobilismo. Fontes editáveis em img/fontes/, licenciadas sob MIT junto ao projeto, conforme LICENSE. Não são fotografias de eventos reais.

As quinze versões WebP (400×225, 800×450 e 1200×675) somam 93.724 bytes. srcset oferece as alternativas; sizes descreve o espaço ocupado pela imagem de destaque ou pelos cards. O CSS continua responsável pelo layout. As dimensões width/height reservam a proporção 16:9; notícias e favoritos usam carregamento adiado.

## Instalar e executar os testes

Na pasta do projeto, com Node.js 22 ou superior e npm disponíveis:

```sh
npm ci
npx playwright install chromium
npm test
```

`npm ci` instala exatamente as versões registradas no lockfile. O segundo comando instala o Chromium necessário aos testes, incluindo a versão completa usada para conferir zoom real. Os testes iniciam e encerram o servidor automaticamente; feche um eventual `npm start` antes para liberar a porta 4321.

Para repetir apenas um caso e abrir o relatório:

```sh
npm test -- --grep "navega entre as quatro páginas"
npm run test:report
```

O resultado `35 passed` indica que os 35 casos passaram na execução completa. Uma execução filtrada mostra apenas a quantidade selecionada. Em caso de falha, confira o nome do caso, a linha apontada e a comparação entre esperado e recebido; relatório, capturas e traces ficam fora do Git. Nesta máquina, Node/npm foram usados por caminhos locais do runtime, e os navegadores/cache ficaram em .cache/; isso não é necessário em uma instalação padrão.

## Validação e documentação

Resultados reais e pendências em [TESTES.md](TESTES.md) e [ACESSIBILIDADE.md](ACESSIBILIDADE.md). A suíte reproduzível foi configurada e executada no commit 5, com 35 casos aprovados. [AUDITORIA.md](AUDITORIA.md) registra as inconsistências do esqueleto; [IA.md](IA.md) declara o apoio utilizado.

Documentos complementares: [planejamento](docs/PLANEJAMENTO.md), [decisões](docs/DECISOES.md) e [implementação e motivos](docs/IMPLEMENTACAO.md). Registros históricos de testes e acessibilidade estão em docs/ e não substituem a avaliação da versão atual.

## Publicação e entrega

URL HTTPS e tag v1.0.0: pendentes. A publicação deve conter apenas os HTMLs e css/, js/ e img/; o pacote de entrega também inclui documentação e testes, sem .git, node_modules ou cache. Fontes locais de consulta (aula-frontend-mobile-limpo/, enunciado e texto.md) são ignoradas pelo Git e não fazem parte da publicação.
