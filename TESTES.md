# Testes da recuperação UC15

## Ambiente — 14/11/2026

Windows, PowerShell, Python 3.13 e Git disponíveis. Node/npm não encontrados no PATH. Ainda não há Playwright instalado ou configurado no projeto; testes automatizados de navegador estão previstos para 16/11. Não foram realizados testes visuais, de teclado, zoom ou contraste nesta etapa.

## Verificação da base inicial

Executada em 14/11/2026 nos arquivos da base inicial, antes do commit, usando Python 3.13 (HTMLParser, servidor HTTP temporário e cliente HTTP) e Git:

| Verificação executada | Resultado obtido |
| --- | --- |
| Quatro páginas, um h1 e um main por página, idioma pt-BR | Aprovado na inspeção estrutural |
| IDs únicos, destinos ARIA, labels, página atual e main focável para o salto | Aprovado na inspeção estrutural |
| 40 referências locais em href/src, incluindo fragmentos | Todas apontam para arquivos e IDs existentes |
| Imagens da página inicial com alt, width e height | Atributos presentes; adequação visual ainda pendente |
| Comparação de hashes das cinco imagens e app.js com a base Git | Conteúdo preservado integralmente na movimentação |
| HTTP na raiz, quatro páginas, CSS e JavaScript | HTTP 200 e conteúdo não vazio em todos os caminhos, com servidor Python temporário em loopback |
| Sintaxe JSON e comando start do package.json | Válidos na leitura estrutural |
| git diff --check | Sem erros de whitespace; Git informou conversão futura de LF para CRLF |

O servidor temporário foi encerrado ao final. Esse tipo de verificação não executa JavaScript nem comprova aparência ou comportamento no navegador. O servidor Node de `npm start` não foi executado por indisponibilidade de Node/npm no PATH; o teste HTTP acima verifica apenas os arquivos pelo servidor Python.

## Casos manuais planejados

| Caso | Passos | Resultado esperado | Resultado obtido |
| --- | --- | --- | --- |
| Páginas | Abrir início, eventos, contato e favoritos; usar toda a navegação | Páginas e links corretos | Pendente no navegador |
| Larguras | Percorrer cada página em 320, 768 e 1280 px | Sem transbordamento horizontal | Pendente |
| Teclado | Tab, Shift+Tab, Enter e Espaço nos controles | Foco visível, ordem e ações previsíveis | Pendente |
| Contato inválido | Enviar vazio, somente espaços e e-mail inválido | Impedir envio e identificar erros | Pendente de implementação |
| Contato válido | Preencher campos e enviar também por Enter | Sucesso simulado sem recarga nem persistência | Pendente de implementação |
| Eventos | Buscar título/modalidade, termo inexistente e limpar | Filtragem, zero resultados e restauração | Pendente de implementação |
| Notícias | Buscar futebol, basquete, termo inexistente e limpar | Filtro jQuery e mensagem coerentes | Pendente no navegador |
| Favoritos | Adicionar, recarregar, abrir favoritos e remover todos | Persistência local, estado e lista vazia corretos | Pendente no navegador |
| Falhas de armazenamento | Fornecer JSON inválido, itens inválidos e bloquear gravação | Sem exceções não tratadas ou sucesso falso | Pendente de correção/teste |
| Accordion | Abrir e fechar por teclado | Bootstrap controla o estado corretamente | Pendente de implementação |
| Zoom e contraste | Seguir ACESSIBILIDADE.md | Conteúdo utilizável e cores medidas | Pendente |
| HTTPS | Abrir URL final e navegar entre páginas | Portal na raiz, recursos sem erro | Pendente de publicação |

## Suíte Playwright — etapa 6

Criar casos de abertura, navegação, validação/envio de formulário, pesquisas, favoritos persistidos e suas falhas, accordion por teclado e ausência de overflow. Instalar dependência de desenvolvimento e navegador Chromium, gerar lockfile e configurar servidor de testes usando `npm start`.

Instruções finais deverão permitir `npm ci`, `npx playwright install chromium` e `npm test` em clone limpo. Esses comandos não são executáveis como suíte nesta versão intermediária.

## Registro de evidências

Em cada execução, registrar data, navegador ou ferramenta, casos, resultados, problemas encontrados, correções e retestes. Não marcar pendências como aprovadas por haver implementação ou documentação. Vincular resultados ao commit testado ou identificar explicitamente arquivos da etapa ainda não commitada.
