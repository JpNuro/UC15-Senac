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
