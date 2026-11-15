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
