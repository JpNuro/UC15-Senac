# Recuperação UC15 — plano de execução

## Decisões confirmadas

- Portal de uma comunidade esportiva, aproveitando Sports Central e notícias variadas.
- Trabalho em 14, 15, 16 e 17/11/2026; sete commits no ciclo, começando pelo commit de organização do portal, revisto a pedido do estudante. O commit anterior `38f8446` fica fora dessa contagem.
- O enunciado de recuperação prevalece sobre tarefas antigas do semestre. Sem CMS, backend, banco ou APIs externas.
- Datas reais: não antecipar todos os commits nem alterar datas do Git. Este arquivo não agenda execuções futuras.
- Código legível, comentários de decisão e declaração de apoio somente na documentação `IA.md`.

## Etapas

| Data | Commit | Entrega | Verificação antes do commit |
| --- | --- | --- | --- |
| 14/11 | 1 — inicial, revisto em 15/11 | Portal na raiz, páginas, conteúdo, navegação, auditoria e execução local | Caminhos, âncoras, rótulos e integridade da movimentação |
| 15/11 | 2 — 736bb5c | CSS a partir de 320 px; breakpoints 768 e 1024 px; Flexbox, Grid; dependências locais; accordion Bootstrap | 320, 768 e 1280 px; teclado no componente |
| 15/11 | 3 — e3ff577 | Validação de contato e pesquisa de eventos em JS nativo | Campos vazios/espaços, e-mail inválido, sucesso sem recarga; pesquisa vazia/sem resultado |
| 16/11 | 4 — concluído nesta etapa | Robustez dos favoritos, imagens e acessibilidade; preservar filtro jQuery | Armazenamento inválido/indisponível, foco na remoção, imagens e licenças |
| 16/11 | 5 | Playwright, testes manuais e correções | Abertura, navegação, formulário, filtros, favoritos, teclado e responsividade |
| 17/11 | 6 | Documentação final e preparação da defesa | Registros coerentes com testes reais; suíte completa e estudo da defesa |
| 17/11 | 7 | Configuração de publicação e pacote final | HTTPS, navegação e conteúdo do pacote |

Criar a tag `v1.0.0` no commit final após conferir a publicação. Registrar a URL somente depois de abri-la e verificar o portal.

O commit inicial reúne o trabalho de 14/11 e a revisão documental solicitada em 15/11. Preservar as datas reais registradas pelo Git; a contagem acima define o ciclo da recuperação, sem apagar commits anteriores.

## Contrato das funcionalidades

- JavaScript nativo: formulário, pesquisa de eventos e favoritos de notícias.
- jQuery: somente filtro de notícias, com contagem e restauração ao limpar.
- Bootstrap: accordion de perguntas frequentes, sem duplicação de controle por outro script.
- Contato: nome, e-mail e mensagem obrigatórios; erros associados aos campos, foco no primeiro inválido, anúncio de status, sem envio real e sem persistência de dados pessoais.
- Favoritos: preservar chave `sportsCentralFavoritos`; validar itens antigos e tratar falhas sem anunciar sucesso falso. A mudança de caminho não muda a origem, mas a troca de domínio ou porta muda o armazenamento disponível.
- CSS: identidade atual, Flexbox na navegação e Grid nas grades; foco visível, contraste e movimento reduzido.
- Imagens: confirmar origem/licença; substituir imagens sem comprovação, otimizar e declarar dimensões.

## Aprovação e entrega

Buscar atendimento completo dos critérios. O mínimo formal é 70 pontos, sem NA em HTML, responsividade, JavaScript e testes, além de prazo e defesa individual. Documentação não substitui domínio demonstrado.

Preparar README, TESTES, ACESSIBILIDADE, AUDITORIA, IA e IMPLEMENTACAO. Conferir publicação HTTPS e pacote sem `.git`, materiais de aula, dependências de desenvolvimento e relatórios temporários. Estudar semântica, Flexbox/Grid, responsabilidades das bibliotecas, três correções da auditoria e execução de um teste; praticar uma alteração simples com reteste.

## Ambiente e pendências

Node/npm não foram encontrados no PATH em 14/11. Localizar instalação ou instalar Node LTS compatível (22 ou superior) antes de testar o servidor Node e instalar Playwright. O `package-lock.json` será gerado com as dependências da suíte; até lá não há dependências npm nem comando `npm test`.

## Progresso em 15/11/2026

Etapas 2 e 3 implementadas e verificadas por testes pontuais automatizados de layout, Bootstrap, contato e pesquisa. O commit inicial aplicado na branch compatível com main é ff1f072: o conteúdo foi trabalhado em 14/11, e o commit foi recriado em 15/11 para corrigir o histórico de PR. O estudante explicará essa distinção ao professor. Não alterar datas para simular distribuição.

Node 24.22.1 foi localizado no runtime e usado para executar o servidor; não houve instalação global ou mudança do PATH. A suíte reproduzível, com dependência de desenvolvimento e lockfile, permanece para 16/11.

## Ajuste de organização em 16/11

Atendendo à revisão do estudante, o commit 4 inclui adequação a css/, js/ e img/, documentos complementares em docs/, imagens responsivas com srcset/sizes e robustez dos favoritos. Sem commit adicional ao total de sete. O commit 5 entrega a suíte reproduzível.
