# Testes — versão 0.3.0, 16/11/2026

## Verificações automatizadas do commit 4

Ambiente: Windows, Node 24.22.1, Playwright 1.62.1 e Chromium Headless Shell 151 do runtime/cache local. Servidor do projeto em 127.0.0.1:4321. Scripts temporários em .cache; a suíte reproduzível do projeto entra no commit 5.

| Caso executado | Resultado |
| --- | --- |
| Quatro páginas em 320, 768 e 1280 px, sem overflow horizontal | PASS, 12 combinações |
| Grid de eventos em uma, duas e três colunas | PASS |
| Accordion por Enter/Espaço, filtro jQuery, formulário e pesquisa de eventos | PASS, sem regressões |
| Adicionar favoritos, recarregar e abrir a lista | PASS |
| Remover itens e manter foco no próximo botão ou resumo vazio | PASS |
| JSON corrompido, itens inválidos e favorito antigo com URL externa de imagem | PASS: recuperação controlada e imagem apenas local |
| Falha de gravação no armazenamento | PASS: anúncio de erro e estado anterior preservado |
| Seleção de imagem do destaque com DPR 1 em 320 e 1280 px | PASS: currentSrc de 400 e 1200 px |
| Formulário por Enter, sem rede, recarga ou armazenamento de dados pessoais | PASS |
| Fallback sem JavaScript, salto por teclado e servidor 404/405 | PASS |

Captura do destaque em 320 px inspecionada após a troca das imagens. Histórico anterior em docs/HISTORICO-TESTES.md.

## Testes manuais a realizar pelo estudante

| Caso | Passos | Esperado | Obtido |
| --- | --- | --- | --- |
| Larguras | Abrir as quatro páginas em 320, 768 e 1280 px | Sem cortes e sem rolagem horizontal | Pendente manualmente |
| Teclado | Tab, Shift+Tab, Enter e Espaço em navegação, accordion, filtros e favoritos | Ordem previsível, foco visível e ações disponíveis | Pendente manualmente |
| Formulário | Enviar vazio, inválido e válido | Erros associados e envio apenas simulado | Pendente manualmente |
| Funções | Filtrar notícias/eventos, salvar/remover favoritos e recarregar | Resultados e estados coerentes | Pendente manualmente |
| Zoom real 200% | Usar o zoom do navegador e percorrer as páginas | Conteúdo e controles utilizáveis | Pendente |
| HTTPS | Abrir o portal publicado e navegar | Página inicial e recursos funcionando | Pendente de publicação |

Os testes automatizados não são apresentados como testes manuais realizados pelo estudante. Registrar data, navegador, resultado e reteste de cada verificação manual antes da entrega.
