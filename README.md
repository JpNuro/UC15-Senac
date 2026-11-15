# Sports Central — recuperação UC15

Portal demonstrativo de serviços, eventos e notícias de uma comunidade esportiva. Todos os serviços, locais, notícias, jogos e resultados são fictícios; não há inscrições nem atendimento real.

## Estado atual — 15/11/2026

Versão intermediária `0.1.0`, com a base inicial e o layout do segundo commit da recuperação. Há quatro páginas na raiz: início, eventos, contato e favoritos. O filtro de notícias usa jQuery; favoritos usam JavaScript e `localStorage`. A página de eventos apresenta o catálogo; a pesquisa será acrescentada em 15/11. O contato permanece com envio desabilitado até implementar a validação e simulação na mesma data.

Não há backend, banco de dados, APIs externas ou CMS. Nenhum dado de contato será armazenado ou enviado.

## Execução local

Com Node.js 22 ou superior:

```sh
npm start
```

Abra **http://127.0.0.1:4321**. Encerre com Ctrl+C. Não há dependências npm nesta etapa; não é necessário instalar pacotes para iniciar o servidor. Node/npm não estão no PATH desta sessão; o servidor foi verificado usando Node 24.22.1 localizado no runtime. Em outra máquina, instale Node 22 ou superior para usar o comando acima.

Alternativa temporária com Python 3, apenas na máquina local:

```sh
python -m http.server 4321 --bind 127.0.0.1
```

O servidor Python serve toda a pasta, inclusive documentos; não o exponha à rede. Para comparar favoritos, mantenha o mesmo navegador e a mesma origem (protocolo, domínio e porta). Evite usar abertura direta por `file://` para verificar persistência.

## Organização

- `index.html`: apresentação, serviços e notícias, calendário e classificação demonstrativos.
- `eventos.html`: catálogo de atividades comunitárias.
- `contato.html`: estrutura do formulário demonstrativo.
- `favoritos.html`: notícias salvas no navegador.
- `assets/css/style.css`, `assets/img/` e `js/app.js`: estilos, imagens e interações reaproveitados.
- `scripts/servir.mjs`: servidor local sem dependências de produção.

O material do professor em `aula-frontend-mobile-limpo/`, o enunciado original e `texto.md` são fontes locais de consulta ignoradas pelo Git. Não fazem parte do portal a publicar.

## Tecnologias e limites

HTML semântico, CSS próprio, JavaScript no navegador, Bootstrap 5.3.8 e jQuery 4.0.0. As bibliotecas são locais, em `assets/vendor/`, com licenças preservadas do material das aulas. O accordion de perguntas frequentes usa o bundle Bootstrap; o filtro de notícias usa jQuery. Nenhuma dessas interações depende de CDN.

Favoritos são locais ao navegador e não sincronizam entre dispositivos. A validação dos itens armazenados e o foco após remoção serão revisados em 16/11. Não há comprovação de conformidade integral de acessibilidade, compatibilidade ou desempenho.

## Imagens e licenças

As cinco imagens JPG foram reaproveitadas do projeto anterior. A origem e a licença individual ainda **não foram comprovadas**. Elas devem ser comprovadas ou substituídas antes da publicação final; a licença MIT do código não comprova licença dessas fotografias.

| Arquivo em `assets/img/` | Origem/licença | Situação |
| --- | --- | --- |
| estadio-destaque.jpg | Pendente | Não liberada para entrega final |
| noticia-internacional.jpg | Pendente | Não liberada para entrega final |
| noticia-treinamento.jpg | Pendente | Não liberada para entrega final |
| noticia-basquete.jpg | Pendente | Não liberada para entrega final |
| noticia-formula-1.jpg | Pendente | Não liberada para entrega final |

Código do projeto sob MIT, conforme `LICENSE`. As licenças MIT das bibliotecas estão em `assets/vendor/bootstrap-LICENSE.txt` e `assets/vendor/jquery-LICENSE.txt`.

## Testes e acompanhamento

Consulte [TESTES.md](TESTES.md), [ACESSIBILIDADE.md](ACESSIBILIDADE.md) e [AUDITORIA.md](AUDITORIA.md). Nesta etapa não há suíte Playwright nem comando `npm test`. Em 16/11 serão adicionados a dependência de desenvolvimento, lockfile, configuração e casos; as instruções finais incluirão `npm ci`, `npx playwright install chromium` e `npm test`.

O calendário está em [PLANEJAMENTO.md](PLANEJAMENTO.md); as mudanças e motivos, em [IMPLEMENTACAO.md](IMPLEMENTACAO.md); decisões técnicas, em [DECISOES.md](DECISOES.md); declaração de apoio, em [IA.md](IA.md).

## Publicação e entrega

**URL HTTPS: pendente.** Publicação prevista para 17/11, preferencialmente pelo GitHub Pages, servindo somente os quatro HTMLs e recursos do portal. Não publicar a pasta inteira com materiais de consulta. Criar a tag `v1.0.0` no commit final após validar a URL. A versão atual não é a entrega final.
