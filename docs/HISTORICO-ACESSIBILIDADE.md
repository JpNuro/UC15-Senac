# Acessibilidade — verificações e pendências

## Revisão estrutural em 14/11/2026

Incluídos link de salto com destino no main focável, navegação consistente, indicação da página atual e rótulos associados aos campos de nome, e-mail e mensagem. O e-mail usa type=email e a mensagem tem name. Inspeção estrutural com HTMLParser confirmou um h1 e um main por página, IDs únicos, destinos ARIA existentes, rótulos associados e referência correta do link de salto nas quatro páginas. Isso não comprova a experiência com teclado ou leitor de tela.

Os estilos de foco, cores e preferência por movimento reduzido foram reaproveitados. Sua presença não comprova adequação de todos os estados ou conformidade integral.

## Roteiro manual obrigatório

| Verificação | Procedimento | Esperado | Obtido |
| --- | --- | --- | --- |
| Teclado e salto | Tab desde o início de cada página; ativar salto e continuar | Destino correto e sequência previsível | Pendente |
| Foco | Percorrer links, campos, filtros e botões | Foco visível em todos os controles | Pendente |
| Formulário | Enviar vazio e corrigir campo a campo | Erros associados e anúncio; foco no primeiro inválido | Pendente, função prevista para 15/11 |
| Zoom | Aplicar zoom real de 200% no navegador | Conteúdo utilizável sem perda de controles | Pendente |
| Contraste | Medir texto, botões, foco e estados | Texto normal ≥4,5:1; texto grande ≥3:1; controles/foco ≥3:1 onde aplicável | Pendente |
| Larguras | 320, 768 e 1280 px, em todas as páginas | Sem rolagem horizontal da página | Pendente |
| Bootstrap | Abrir/fechar accordion por teclado | Estado e conteúdo coerentes | Pendente, componente previsto para 15/11 |
| Favoritos | Remover primeiro, intermediário e último item | Foco permanece em destino útil | Pendente, revisão prevista para 16/11 |
| Imagens | Conferir finalidade, alt e conteúdo visual | Alternativas adequadas e dimensões corretas | Pendente |

Registrar navegador, data, etapa testada, resultado e reteste após as correções. Não substituir zoom real por simples mudança de viewport.

## Atualização de 15/11/2026 — layout

CSS com foco global, bordas de campos mais contrastantes, navegação com alvos de pelo menos 44 px de altura e preferência por movimento reduzido preservada. Chromium headless confirmou ausência de overflow nas quatro páginas em 320, 768 e 1280 px. Accordion testado por Enter/Espaço, com estado aria-expanded coerente. Resultados automatizados em TESTES.md; a tabela de verificações manuais não está automaticamente aprovada.

## Atualização de 15/11/2026 — formulário, pesquisa e cores

Erros do formulário associados por aria-describedby, aria-invalid e texto explícito. Primeiro campo inválido recebe foco. Status anuncia resultado do formulário e quantidade de eventos. Testes automatizados confirmaram foco, correção dos estados, envio por Enter e link de salto; captura do contato em 320 px foi inspecionada.

Contrastes calculados pela luminância relativa sRGB das cores CSS (não uma auditoria completa de todos os estados):

| Uso | Cores | Razão |
| --- | --- | --- |
| Texto / superfície | #f5f5f5 / #1c2028 | 14,97:1 |
| Texto secundário / superfície | #b8c0cc / #1c2028 | 8,90:1 |
| Link / fundo e texto / botão | #ff6b35 / #111318 | 6,55:1 |
| Erro / superfície | #ff9999 / #1c2028 | 7,98:1 |
| Borda de campo / interior | #707b8c / #111318 | 4,34:1 |
| Foco / superfície | #ffb18f / #1c2028 | 9,28:1 |

Zoom real de 200%, leitor de tela, contraste de estados adicionais e navegação manual completa continuam pendentes. Não foram marcados como realizados pelo estudante.
