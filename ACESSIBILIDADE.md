# Acessibilidade — 16/11/2026

## Implementado e verificado por automação

- Semântica e títulos, link de salto para main focável, navegação com página atual e labels associados.
- Layout mobile first, sem overflow nas quatro páginas em 320, 768 e 1280 px. Foco global visível e alvos principais de pelo menos 44 px de altura.
- Accordion operado por Enter/Espaço, com aria-expanded coerente e controle exclusivo de Bootstrap.
- Contato com erros em texto, aria-describedby e aria-invalid; foco no primeiro inválido e status de erro/sucesso.
- Resultados de pesquisa anunciados em status; favoritos com mensagens de erro e foco após remover itens, inclusive a lista vazia.
- Ilustrações com alt específico, dimensões proporcionais e arquivos responsivos. Os favoritos usam o mesmo tratamento das imagens estáticas.
- Regra prefers-reduced-motion preservada.

## Contrastes calculados em 15/11

| Uso | Cores | Razão |
| --- | --- | --- |
| Texto / superfície | #f5f5f5 / #1c2028 | 14,97:1 |
| Texto secundário / superfície | #b8c0cc / #1c2028 | 8,90:1 |
| Link / fundo e texto / botão | #ff6b35 / #111318 | 6,55:1 |
| Erro / superfície | #ff9999 / #1c2028 | 7,98:1 |
| Borda de campo / interior | #707b8c / #111318 | 4,34:1 |
| Foco / superfície | #ffb18f / #1c2028 | 9,28:1 |

São medições matemáticas das cores definidas, não auditoria completa de todos os estados. Histórico em docs/HISTORICO-ACESSIBILIDADE.md.

## Pendências manuais

Percorrer as quatro páginas com teclado, verificar foco em todos os estados e adequação dos textos alternativos, aplicar zoom real de 200% e conferir leitura das mensagens com tecnologia assistiva. Registrar os resultados em TESTES.md. Automação e capturas não comprovam conformidade integral nem execução manual pelo estudante.
