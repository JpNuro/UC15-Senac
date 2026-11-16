# Decisões técnicas — recuperação UC15

## Base e escopo

Sports Central continua como comunidade esportiva, com notícias variadas, serviços e eventos locais demonstrativos. O enunciado específico da recuperação prevalece sobre a proposta antiga de CMS: não usar WordPress, backend, banco ou APIs externas. A pasta de aulas é somente referência.

## Estrutura

Portal na raiz, css/ com estilos próprios e Bootstrap, js/ com bibliotecas e scripts de página, img/ com WebP e fontes SVG, e tests/ para a suíte. Em 16/11, essa estrutura substituiu assets/ para seguir diretamente o modelo do enunciado. Os cinco documentos obrigatórios permanecem na raiz; planejamento, implementação, decisões, históricos e licenças ficam em docs/. scripts/ contém ferramentas de desenvolvimento, não lógica de interface.

## Responsabilidades das tecnologias

- JavaScript nativo: favoritos já existentes; formulário e pesquisa de eventos implementados em scripts próprios por página.
- jQuery: filtro de notícias já existente, isolado e sem duplicar outras funções.
- Bootstrap: estilos existentes; accordion de perguntas frequentes integrado, controlado apenas pelo bundle.

As cópias locais de Bootstrap 5.3.8 e jQuery 4.0.0 e suas licenças estão no material fornecido e foram integradas em 15/11. Não trocar versões sem necessidade verificada.

## Dados e acessibilidade

Favoritos continuam em `sportsCentralFavoritos`; preservar compatibilidade com os itens existentes ao acrescentar validação. Usar criação de elementos e `textContent`, não interpretar conteúdo armazenado como HTML. Leitura e gravação protegidas, descarte de itens inválidos, catálogo local de imagens e foco após remoção implementados em 16/11.

Contato não salva dados pessoais nem realiza envio real. O botão começa desabilitado no HTML e só é habilitado após conectar o tratamento de submit, inclusive envio por Enter. Validar nome e mensagem após trim e e-mail usando validade do campo HTML.

Link de salto presente em todas as páginas, destino focável, rótulos associados e indicação da página atual. Verificações visuais e de teclado ainda pendentes.

## Execução e processo

Servidor local Node sem dependências de produção, restrito aos recursos do portal e a loopback. Node 22 ou superior é a base escolhida. Node/npm não estão no PATH, mas foi localizado Node 24.22.1 no runtime e o servidor foi executado com ele.

Sete commits em quatro datas reais, começando pelo commit revisto de organização do portal; `38f8446` fica fora da contagem; calendário em PLANEJAMENTO. Não antecipar histórico nem declarar testes e publicação que não ocorreram.

## Imagens responsivas

Fotografias sem licença comprovada foram substituídas por ilustrações geométricas originais do repositório, sob MIT. SVGs editáveis preservados em img/fontes e WebP em três larguras. sizes foi calculado a partir da largura máxima do main, padding e bordas dos cards; não é uma regra de CSS nem um tamanho escolhido arbitrariamente. Favoritos não usam URLs vindas do armazenamento.
