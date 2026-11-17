# Implementação e motivos das escolhas

## 14/11/2026 — base do portal (commit inicial, revisto em 15/11)

### Reaproveitado

- Identidade Sports Central, cores, tipografia, propriedades CSS, notícias de futebol, basquete e Fórmula 1: preservam a base estudada e evitam uma reescrita desnecessária.
- Filtro de notícias com jQuery e favoritos de notícias com JavaScript: já são funções separadas e aproveitáveis. Não foram declarados novamente testados no navegador nesta etapa.
- Arquivos de imagens e chave de favoritos: preservados. Licenças das imagens e robustez do armazenamento ainda precisam de revisão.

### Alterado

- Arquivos do portal movidos de `prototipo/` para a raiz, preservando caminhos relativos entre HTML, CSS, JS e imagens. Isso prepara uma URL cuja raiz abre o site.
- Navegação compartilhada entre início, eventos, contato e favoritos, com indicação da página atual. O link de salto aponta para o `main` existente, que pode receber foco.
- Página inicial contextualizada como comunidade esportiva, com serviços fictícios de orientação e empréstimo de materiais. Notícias variadas foram mantidas como conteúdo secundário.
- Calendário e classificação antigos foram preservados como demonstrações; a classificação agora se identifica como fictícia também na legenda da tabela.
- Novo catálogo de eventos em HTML: futebol, basquete e caminhada, com data, horário, local, modalidade e descrição. A pesquisa será implementada em 15/11.
- Nova página de contato com nome, e-mail e mensagem, rótulos associados e atributos de formulário. Envio desabilitado nesta versão intermediária até implementar validação e simulação sem recarga em 15/11.
- Retirado o cadastro de novidades sem tratamento, que afirmava salvar dados sem implementar essa persistência. O contato não fará cadastro nem envio real.
- Servidor estático Node sem dependências: `npm start`, porta 4321, restrito ao portal e acessível apenas na máquina local. Não serve documentos internos nem arquivos Git. Execução Node ainda pendente no ambiente atual.
- `.gitignore` separa materiais locais de consulta, dependências e saídas geradas. Nenhum material original foi apagado.

### Organização e estudo

- `PLANEJAMENTO.md`: calendário dos sete commits, contratos e condições de entrega.
- `AUDITORIA.md`: comparação com o esqueleto do enunciado, separada do diagnóstico do projeto antigo.
- `DECISOES.md`: escolhas atuais e limites de cada tecnologia.
- `TESTES.md` e `ACESSIBILIDADE.md`: resultados reais separados de verificações pendentes.
- `IA.md`: declaração exigida pelo professor; não há necessidade de assinatura de ferramenta no código.

As aulas 2, 7 e 8 apoiam semântica e layouts; 11–14 apoiam responsividade, imagens e Bootstrap; 15–17 apoiam DOM, jQuery e acessibilidade; 22 orienta testes. Aulas sobre CMS não integram a recuperação, pois o enunciado específico o exclui.

### Validação desta etapa

Inspeção estrutural das quatro páginas aprovada, com 40 referências locais válidas e rótulos/IDs coerentes. Os cinco JPGs e app.js mantiveram os mesmos hashes da base. Raiz, páginas, CSS e JS responderam HTTP 200 por um servidor Python temporário, encerrado após a verificação. `git diff --check` não apontou erros de whitespace. Detalhes e limites estão em TESTES.md; não houve execução de JavaScript, validação visual ou execução do servidor Node.

## Próximas atualizações

Após cada etapa do cronograma, registrar aqui o comportamento entregue, o motivo das escolhas, validações e limitações. Não registrar itens futuros como concluídos. O detalhe dos resultados fica em TESTES e ACESSIBILIDADE para evitar divergências entre relatos.

## 15/11/2026 — layout e dependências (commit 2)

CSS reorganizado em base mobile first e expansões em 768 e 1024 px. Removidas regras antigas duplicadas, regras de campos do cadastro retirado e container query que tentava estilizar o próprio contêiner. Flexbox organiza a navegação e Grid distribui notícias, eventos e favoritos. Os eventos têm uma, duas ou três colunas conforme o espaço. O foco agora é visível também em botões fora do formulário; as bordas de controles receberam maior contraste.

Bootstrap 5.3.8 e jQuery 4.0.0 foram copiados do material das aulas para assets/vendor, com licenças MIT preservadas. Não há mais chamadas a CDN no HTML. Um accordion de perguntas frequentes na página inicial demonstra Bootstrap: apenas o bundle controla a expansão, via atributos data-bs. O filtro de notícias continua isolado em jQuery.

Node 24.22.1 e Playwright foram encontrados no runtime local. Foi baixado Chromium Headless Shell para a pasta .cache ignorada pelo Git. O servidor Node foi executado e os testes pontuais passaram em 12 combinações de página/largura (320, 768 e 1280 px), sem overflow. Confirmadas as colunas dos eventos, accordion com Enter/Espaço e filtro jQuery, sem erros JS ou respostas HTTP de erro. Capturas de início mobile e eventos desktop foram inspecionadas. Isso não substitui zoom real, leitor de tela ou testes manuais pelo estudante.

## 15/11/2026 — contato e pesquisa (commit 3)

Criados scripts específicos de página: js/contato.js e js/eventos.js. Isso evita carregar a lógica de contato ou pesquisa onde ela não é usada, sem misturá-la ao filtro jQuery e aos favoritos existentes.

O formulário habilita o botão apenas depois de conectar o tratamento de submit. Nome, e-mail e mensagem não podem conter apenas espaços; o e-mail também usa a verificação de formato do próprio campo HTML. Cada erro fica ligado ao campo por aria-describedby e aria-invalid; o primeiro inválido recebe foco e uma região de status anuncia erro ou sucesso. A submissão por clique e Enter passa pelo mesmo evento. Valores são preservados para revisão, sem envio real nem armazenamento. Sem JavaScript, o envio continua bloqueado com explicação em noscript.

A pesquisa de eventos usa o catálogo já presente em HTML, inclusive títulos, descrições, modalidades e locais. A normalização remove diferenças de maiúsculas e acentos; hidden controla visibilidade e a região de status informa a quantidade ou nenhum resultado. Limpar o campo restaura a lista. Sem JavaScript, os três eventos permanecem disponíveis.

A versão passa a 0.2.0. Os testes pontuais de contato, pesquisa, fallback e salto passaram no Chromium; as 12 combinações de layout e o accordion foram testados novamente após as mudanças. Permanecem pendentes a suíte entregue e reproduzível, imagens/licenças, robustez de favoritos e publicação, conforme os próximos dias do plano.

## 16/11/2026 — organização, favoritos e imagens (commit 4)

Aplicada a estrutura do enunciado: css/, js/, img/ e documentos obrigatórios na raiz. app.js renomeado para script.js; servidor, HTML e referências atualizados. Documentos complementares e licenças foram reunidos em docs/. Removidos diretório prototipo vazio e relatório final vazio; a nota antiga de CMS foi arquivada em docs/historico-cms.md.

Favoritos mantêm a chave e os IDs antigos. Dados são validados e deduplicados; textos usam textContent. Imagens vêm de um catálogo conhecido, mesmo se o item antigo guardar um caminho JPG ou uma URL externa. Falhas de acesso e gravação são anunciadas em status e não produzem confirmação falsa. Após remover, o foco passa ao próximo botão, ao anterior ou ao resumo da lista vazia. Outra aba pode atualizar os estados pelo evento storage.

As fotografias sem comprovação de licença saíram da entrega. Foram criadas cinco ilustrações geométricas SVG e rasterizadas com Sharp em WebP de 400, 800 e 1200 px, qualidade 82. Fontes SVG incluídas sob MIT. Quinze arquivos totalizam 93.724 bytes. HTML e favoritos usam srcset/sizes; o navegador escolheu 400 px no mobile e 1200 px no desktop com DPR 1. Não houve alteração por CSS a partir de srcset: CSS e sizes descrevem o mesmo layout para finalidades diferentes.

Testes pontuais de favoritos, falhas, imagens, layout, formulário, filtros e accordion passaram; resultados em TESTES.md. A suíte versionada e executável em clone limpo será incluída no commit 5, também em 16/11. Revisões manuais pelo estudante continuam registradas separadamente.

## 16/11/2026 — suíte reproduzível (commit 5)

Adicionados @playwright/test 1.62.1 como dependência de desenvolvimento, package-lock.json, playwright.config.js e tests/portal.spec.js. A configuração inicia o servidor local e impede uso acidental de testes marcados como exclusivos. A suíte usa contextos isolados, dois workers e gera relatório HTML, capturas e traces de falhas fora do Git.

npm ci foi executado antes da suíte. Os 35 casos cobrem páginas, links, três larguras, salto, todos os controles por teclado, formulário, pesquisas, persistência e falhas dos favoritos, imagens responsivas, Bootstrap, ausência de JavaScript, restrições do servidor e zoom real de 200%. A interface nativa de configurações do Chromium define o zoom; o teste confirma escala e largura lógica. Capturas das quatro páginas nas três larguras e da tela ampliada foram inspecionadas com apoio da ferramenta.

O primeiro teste de accordion precisou aguardar o fim da animação; o teste de zoom deixou de usar uma preferência não aplicada e passou a usar a configuração nativa. A captura de zoom usa o protocolo do Chromium para evitar recorte de fullPage. Os resultados finais e os limites estão em TESTES.md. O estudante informou que revisou os códigos; configuração e execução dos testes foram feitas pela ferramenta, conforme IA.md.

A versão passa a 0.4.0. Hoje foram concluídos os commits 4 e 5; documentação final de entrega, publicação e tag permanecem no dia 17, conforme o cronograma.

## 17/11/2026 — documentação e preparação da entrega (commit 6)

Revisados os documentos obrigatórios contra o código e os testes atuais. A auditoria agora descreve no passado as correções de teclado, imagens e validação já concluídas. docs/ENTREGA.md relaciona os dez critérios de avaliação às evidências, sem atribuir nota ou presumir domínio demonstrado. O guia pessoal de defesa fica apenas em .estudo/, fora do Git.

A branch foi avançada por fast-forward até a main já integrada pelo estudante, sem criar outro merge nem mudar o conteúdo. Foram executados npm ci e a suíte completa: 35 testes aprovados em 13,0 s, com saída zero. A documentação registra a autoria da execução dos testes como apoio da ferramenta. A implantação, pacote e versão final ficam no commit 7.

## 17/11/2026 — publicação e pacote final (commit 7)

Versão 1.0.0 definida em package.json e lockfile. scripts/preparar-publicacao.mjs recria apenas dist/site, copia páginas e recursos de uma lista explícita e inclui as licenças e versao.json. Documentos internos e guias pessoais não são publicados. O build verifica as referências locais, inclusive srcset.

.github/workflows/publicar.yml executa npm ci e a suíte no Ubuntu, prepara o artefato e usa as ações oficiais de GitHub Pages. scripts/verificar-publicacao.mjs aguarda a versão exata do commit e confere as quatro páginas, recursos, licenças e abertura do portal na raiz, exigindo HTTPS fora de localhost. A configuração do Pages usa GitHub Actions; o resultado de implantação é registrado pela execução do workflow.

scripts/empacotar.py usa somente blobs dos arquivos versionados, recusa alterações locais e links, gera ZIP com manifesto de hashes e confere a integridade. O pacote não contém .git, dependências instaladas, cache, guias pessoais ou arquivos locais de consulta. A tag final identifica o commit de origem, sem alterar datas do histórico.

Antes do commit, o build foi servido em loopback e suas quatro páginas e 30 recursos responderam corretamente; a lista de arquivos públicos foi conferida. A verificação HTTPS e os testes da publicação são executados após a implantação. O manifesto do pacote e o workflow registram a referência exata, evitando declarar como entregue um conteúdo diferente do versionado.
