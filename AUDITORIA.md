# Auditoria do esqueleto da recuperação UC15

Fonte: seção 5 de `Projeto_recuperacao_UC15.docx`, comparada com a estrutura da seção 6 e os requisitos técnicos da seção 7. Esta é a auditoria do **esqueleto do enunciado**, não uma lista de falhas atribuídas ao projeto antigo.

As correções abaixo correspondem à base inicial de 14/11/2026. Conferência estrutural não substitui teste de navegador. O enunciado original permanece entre os materiais locais de consulta.

## 1 — Idioma divergente do conteúdo

- Localização: `<html lang="en">`.
- Problema: conteúdo em português declarado como inglês.
- Impacto: pronúncia e interpretação inadequadas em tecnologias assistivas.
- Correção aplicada: `lang="pt-BR"` nos quatro HTMLs do portal, preservando a declaração correta do projeto reaproveitado.

## 2 — Caminho do CSS próprio divergente

- Localização: `href="css/styles.css"`, enquanto a estrutura indica `css/style.css`.
- Problema: referência não corresponde ao arquivo previsto.
- Impacto: os estilos próprios podem não carregar.
- Correção aplicada: todas as páginas apontam para o arquivo real `assets/css/style.css`, preservado da base. A organização adicional é permitida pela seção 6.

## 3 — Destino do link de salto inexistente

- Localização: `href="#conteudo"` e main com `id="conteudo-principal"`.
- Problema: o fragmento não identifica o destino.
- Impacto: impede pular a navegação repetida.
- Correção aplicada: link `href="#inicio"` e main `id="inicio" tabindex="-1"` nas quatro páginas; estilo revela o link ao receber foco. Funcionamento por teclado ainda exige teste manual.

## 4 — Nome da página de contato incorreto

- Localização: menu com `href="contatos.html"`.
- Problema: o arquivo exigido se chama `contato.html`.
- Impacto: navegação termina em página inexistente.
- Correção aplicada: menu aponta para `contato.html`, criado na raiz, em todas as páginas.

## 5 — Chamada de eventos sem destino útil

- Localização: link “Ver eventos” com `href="#"`.
- Problema: não leva ao catálogo anunciado.
- Impacto: visitante não encontra a atividade a partir da chamada.
- Correção aplicada: chamadas na apresentação e nos serviços apontam para `eventos.html`, que contém o catálogo comunitário.

## 6 — Nome acessível da seção com referência quebrada

- Localização: `aria-labelledby="titulo-eventos"`, mas título com `id="titulo-conteudos"`.
- Problema: referência ARIA aponta para ID inexistente.
- Impacto: a seção perde a associação pretendida com o título.
- Correção aplicada: seção de eventos usa `aria-labelledby="eventos-titulo"` e h1 correspondente; demais seções têm referências coerentes com os títulos existentes.

## 7 — Alternativa de imagem genérica

- Localização: imagem do card com `alt="Imagem do evento"`.
- Problema: não informa o conteúdo específico da imagem.
- Impacto: alternativa textual oferece pouca informação útil.
- Correção aplicada: imagens informativas reaproveitadas têm alternativas específicas, como estádio iluminado ou jogadores em treinamento. Não foram adicionadas imagens meramente ilustrativas ao catálogo de eventos. Adequação visual dos textos às fotografias ainda será revisada.

## 8 — Imagem sem dimensões declaradas

- Localização: `<img src="img/evento-exemplo.png" ...>` sem width e height.
- Problema: o navegador não recebe proporção explícita nesse elemento.
- Impacto: pode haver deslocamento de conteúdo durante o carregamento.
- Correção aplicada: imagens estáticas da página inicial preservam width e height, com CSS responsivo. A otimização dos arquivos e conferência de dimensões intrínsecas ficam para a etapa de imagens.

## 9 — Rótulo do e-mail não corresponde ao campo

- Localização: `label for="e-mail"` e `input id="email"`.
- Problema: os identificadores diferem.
- Impacto: clicar no rótulo não foca o campo; nome acessível pode ficar ausente.
- Correção aplicada: `label for="email"` e `input id="email"` em contato.

## 10 — Tipo de campo inadequado para e-mail

- Localização: campo de e-mail com `type="text"`.
- Problema: não declara o propósito e o formato de e-mail.
- Impacto: perde validação nativa de formato e teclado móvel apropriado.
- Correção aplicada: `type="email"`, `autocomplete="email"`, name e required em contato. A validação com mensagens próprias será implementada em 15/11.

## 11 — Mensagem sem nome de campo

- Localização: textarea `id="mensagem"` sem `name`.
- Problema: o campo não tem chave para serialização por APIs de formulário.
- Impacto: sua mensagem seria omitida ao montar dados por nome.
- Correção aplicada: textarea em contato inclui `name="mensagem"`, label correspondente e required. O projeto fará somente simulação, sem envio de dados.

## Ocorrências adicionais a resolver

- Os scripts próprios aparecem antes de jQuery no esqueleto; se usados imediatamente, podem executar antes da biblioteca. A base reaproveitada já carrega jQuery antes de app.js. Conferir novamente após integrar as cópias locais.
- O esqueleto referencia `js/bootstrap.min.js`, mas a estrutura exige `js/bootstrap.bundle.min.js`. O bundle local será integrado em 15/11 junto ao accordion, com a licença preservada. Não declarar essa correção concluída nesta etapa.

## Cuidados de interpretação

`novalidate` não é erro por si só: exige validação própria funcional. PNG também não é erro isolado, e não foi presumido que o arquivo citado existe. Não contar esses detalhes como inconsistências corrigidas sem evidência. Auditoria estrutural e testes de comportamento são evidências complementares.
