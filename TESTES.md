# Testes — versão 0.4.0, 16/11/2026

## Responsabilidade e ambiente

Configuração e execução dos testes feitas com apoio do ChatGPT/Codex. O estudante informou ter revisado todos os códigos; não foi atribuída a ele a execução desta suíte. Ambiente: Windows, Node 24.22.1, npm 10.9.4, @playwright/test 1.62.1 e Chromium 151.0.7922.34. Servidor do próprio projeto em 127.0.0.1:4321.

Foi executado npm ci com o lockfile, seguida a instalação do Chromium e executado npm test. Resultado da suíte completa: **35 testes aprovados, zero falhas**, com saída normal de código 0. A execução completa final levou 11,4 s; a execução anterior da suíte ampliada levou 12,0 s. A duração pode variar. As alterações testadas são as do commit 5, posteriores a ca53d6f.

## Casos, passos e resultados

| Grupo | Passos executados | Resultado esperado | Obtido |
| --- | --- | --- | --- |
| Abertura | Abrir início e carregar todas as imagens | Título correto, arquivos locais, sem erro JS ou HTTP | Aprovado |
| Navegação | Clicar em Eventos, Contato, Favoritos e Início | URLs corretas e indicação da página atual | Aprovado |
| Responsividade | Abrir quatro páginas em 320, 768 e 1280 px | Sem overflow e eventos em 1/2/3 colunas | Aprovado, 12 combinações |
| Salto | Tab no começo de cada página e Enter | Link recebe foco e transfere ao main | Aprovado nas três larguras |
| Teclado | Percorrer por Tab todos os links, botões e campos de cada página em 320 px | Ordem do documento e foco visível em cada controle | Aprovado nas quatro páginas |
| Formulário inválido | Enviar vazio, preencher com espaços e inserir e-mail malformado | Erros associados, campos marcados e foco no primeiro inválido | Aprovado |
| Formulário válido | Preencher e enviar por Enter, depois editar | Sucesso simulado, valores preservados, sem rede/recarga/persistência; sucesso antigo removido ao editar | Aprovado |
| Pesquisa de eventos | Buscar PRACA, basquete, COMUNITARIO, termo inexistente e limpar | Busca sem diferença de acentos/caixa, quantidade, zero resultados e restauração | Aprovado |
| Filtro jQuery | Buscar basquete, termo inexistente e limpar | 1, 0 e 4 notícias visíveis | Aprovado |
| Favoritos | Salvar dois itens, recarregar, abrir lista e remover todos | Persistência e foco no próximo botão ou resumo vazio | Aprovado |
| Dados antigos ou inválidos | Fornecer JSON corrompido, objeto, itens inválidos, duplicatas e URL externa | Aviso controlado, deduplicação, compatibilidade e imagem somente local | Aprovado |
| Segurança de renderização | Usar título salvo com marcação HTML | Exibir o texto, sem criar elementos HTML | Aprovado |
| Falhas de armazenamento | Bloquear getItem e setItem | Anunciar falha, não alterar estado nem mostrar sucesso falso | Aprovado |
| Bootstrap | Abrir accordion com Enter, esperar expansão e fechar com Espaço | Conteúdo, aria-expanded e foco coerentes | Aprovado |
| Imagens responsivas | Abrir contextos novos em 320 e 1280 px, DPR 1 | currentSrc de 400 e 1200 px | Aprovado |
| Sem JavaScript | Desativar scripts e abrir eventos/contato | Catálogo disponível e envio desabilitado | Aprovado |
| Servidor | Pedir README, .git/config, caminho indevido e enviar POST | 404 para arquivos internos e 405 para envio real | Aprovado |
| Zoom real | Selecionar 200% no controle nativo do Chromium e percorrer as quatro páginas | Escala 2 confirmada, viewport lógica reduzida, sem overflow, formulário utilizável | Aprovado |

## Inspeção visual assistida

Capturas completas das quatro páginas em 320, 768 e 1280 px foram inspecionadas com apoio da ferramenta, verificando distribuição, quebras de linha, campos, imagens e rodapé. Não foram observados cortes de layout ou sobreposição de conteúdo. O contorno do main nas capturas é o foco visível após ativar o link de salto. A captura nativa em zoom de 200% também foi inspecionada. Esse procedimento não foi apresentado como teste manual feito pelo estudante.

## Falhas encontradas e retestes

- A primeira execução passou em 29 de 31 casos. O teste do accordion tentava fechar durante a animação; passou a aguardar a classe estável collapse show. Não foi adicionado controle próprio ao Bootstrap.
- A preferência de perfil inicialmente usada para zoom não era aplicada. O teste passou a selecionar 200% na interface nativa chrome://settings/appearance, confirmando devicePixelRatio e largura lógica. Não usa apenas redução de viewport para representar zoom.
- A captura fullPage ficou recortada com zoom nativo; foi substituída pela captura nativa do Chromium e o caso de zoom foi retestado com aprovação.
- O sandbox bloqueou a finalização do processo em uma execução. A suíte foi repetida com as permissões necessárias, terminando com código 0.
- Foram acrescentados quatro casos de percurso completo de foco; a suíte ampliada terminou com 35 aprovações.

Instruções reproduzíveis no README. Histórico de etapas anteriores em docs/HISTORICO-TESTES.md; as antigas pendências de testes são substituídas pelos resultados atuais deste arquivo. Publicação HTTPS é a etapa de 17/11 e terá conferência própria após implantação.
