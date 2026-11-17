# Conferência da entrega UC15

## Referências

O projeto atende ao escopo de interface do enunciado de recuperação: sem backend, banco, APIs externas ou WordPress. A referência de código é a tag final v1.0.0, a criar após a conferência da publicação. O pacote final será produzido a partir dos arquivos versionados dessa referência.

## Evidências por critério

| Critério | Peso | Onde conferir |
| --- | ---: | --- |
| HTML semântico e estrutura | 15 | Quatro páginas com idioma, hierarquia de títulos, landmarks e labels; AUDITORIA.md registra 11 inconsistências e correções |
| CSS, Flexbox, Grid e mobile first | 20 | css/style.css; base em uma coluna, expansões em 768/1024 px; testes em 320/768/1280 px |
| JavaScript | 15 | js/script.js, js/contato.js e js/eventos.js: favoritos, pesquisas e contato validado com envio simulado |
| jQuery | 5 | Filtro de notícias, separado das demais funções |
| Bootstrap | 5 | Accordion de perguntas frequentes, controlado pelo bundle local e utilizável por teclado |
| Acessibilidade | 10 | ACESSIBILIDADE.md e testes de foco, labels, mensagens e zoom real de 200% |
| Testes | 15 | tests/portal.spec.js; 35 casos, lockfile e instruções de instalação/execução no README; TESTES.md com passos e resultados |
| Git | 5 | Sete commits de desenvolvimento planejados, com integrações separadas; datas reais e tag final |
| Documentação e declaração de IA | 5 | README, TESTES, ACESSIBILIDADE, AUDITORIA e IA na raiz; registros complementares em docs/ |
| Publicação e entrega | 5 | URL HTTPS e pacote final conferidos no fechamento da publicação |

A tabela mapeia evidências, não atribui nota. O professor avalia A/PA/NA e a defesa. Aprovação exige ao menos 70 pontos, nenhum NA em HTML, responsividade, JavaScript ou testes, entrega no prazo e domínio demonstrado.

## Histórico do processo

O conteúdo inicial foi trabalhado em 14/11. O commit foi recriado em 15/11 para corrigir o repositório de destino e permitir PR contra main. Essa distinção deve ser explicada ao professor; não foram fabricadas datas. Os commits seguintes registram as etapas de 15, 16 e 17/11. Os merges feitos na main são integrações e não substituem os sete commits de desenvolvimento.

## Reprodução e limites

Usar Node 22 ou superior, npm ci, npx playwright install chromium e npm test. O servidor de testes é iniciado automaticamente na porta 4321; fechar npm start antes de executar a suíte. Foram testados Chromium 151, teclado, três larguras, imagens e zoom real. Não é certificação integral de WCAG nem garantia para todos os navegadores.

O estudante informou revisão dos códigos; configuração e execução dos testes foram feitas com apoio da ferramenta e declaradas em IA.md. Guias pessoais em .estudo/ são locais, ignorados pelo Git e excluídos do pacote. A defesa e o envio ao professor são atividades do estudante, não fatos presumidos a partir da documentação.
