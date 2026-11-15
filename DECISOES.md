# Decisões técnicas — recuperação UC15

## Base e escopo

Sports Central continua como comunidade esportiva, com notícias variadas, serviços e eventos locais demonstrativos. O enunciado específico da recuperação prevalece sobre a proposta antiga de CMS: não usar WordPress, backend, banco ou APIs externas. A pasta de aulas é somente referência.

## Estrutura

Portal na raiz para facilitar publicação sem pasta intermediária. Preservar `assets/css/`, `assets/img/` e `js/` para reduzir alterações desnecessárias em caminhos. O enunciado permite organização adicional coerente. Manter quatro páginas, incluindo favoritos como recurso reaproveitado.

## Responsabilidades das tecnologias

- JavaScript nativo: favoritos já existentes; formulário e pesquisa de eventos a implementar.
- jQuery: filtro de notícias já existente, isolado e sem duplicar outras funções.
- Bootstrap: estilos existentes; accordion de perguntas frequentes planejado, controlado apenas pelo bundle.

As cópias locais de Bootstrap 5.3.8 e jQuery 4.0.0 e suas licenças estão no material fornecido e serão integradas em 15/11. Não trocar versões sem necessidade verificada.

## Dados e acessibilidade

Favoritos continuam em `sportsCentralFavoritos`; preservar compatibilidade com os itens existentes ao acrescentar validação. Usar criação de elementos e `textContent`, não interpretar conteúdo armazenado como HTML. Tratar indisponibilidade de armazenamento e foco após remoção em 16/11.

Contato não salva dados pessoais nem realiza envio real. Enquanto a validação e a simulação não existem, manter submit desabilitado; habilitá-lo apenas com tratamento do evento submit, inclusive envio por Enter. Validar nome e mensagem após trim e e-mail usando validade do campo HTML.

Link de salto presente em todas as páginas, destino focável, rótulos associados e indicação da página atual. Verificações visuais e de teclado ainda pendentes.

## Execução e processo

Servidor local Node sem dependências de produção, restrito aos recursos do portal e a loopback. Node 22 ou superior é a base escolhida. Node/npm ainda precisam ser disponibilizados no ambiente e o servidor testado.

Sete commits em quatro datas reais, começando pelo commit revisto de organização do portal; `38f8446` fica fora da contagem; calendário em PLANEJAMENTO. Não antecipar histórico nem declarar testes e publicação que não ocorreram.
