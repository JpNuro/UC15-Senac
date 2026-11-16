"use strict";

const CHAVE_FAVORITOS = "sportsCentralFavoritos";
const TAMANHOS_CARDS = "(min-width: 1184px) 534px, (min-width: 768px) calc(50vw - 58px), calc(100vw - 66px)";
const IMAGENS_NOTICIAS = {
    "destaque-da-semana": ["estadio-destaque", "Ilustração de um estádio com campo de futebol e refletores"],
    "internacional-vence-em-jogo-disputado": ["noticia-internacional", "Ilustração de uma bola de futebol sobre um campo"],
    "preparacao-para-a-proxima-rodada": ["noticia-treinamento", "Ilustração de cones organizados para treino em um campo de futebol"],
    "basquete-confronto-promete-equilibrio-ate-o-fim": ["noticia-basquete", "Ilustração de uma bola de basquete sobre uma quadra"],
    "formula-1-estrategia-pode-decidir-a-proxima-corrida": ["noticia-formula-1", "Ilustração de um carro de corrida em um circuito"]
};

function anunciarFavoritos(texto) {
    const status = document.querySelector("#mensagem-favoritos, #status-favoritos");
    if (status) status.textContent = texto;
}

function lerFavoritos() {
    let texto;
    try {
        texto = localStorage.getItem(CHAVE_FAVORITOS) || "[]";
    } catch {
        return { itens: [], aviso: "Não foi possível acessar os favoritos neste navegador.", bloqueado: true };
    }
    try {
        if (texto.length > 20000) throw new Error("Dados muito grandes");
        const dados = JSON.parse(texto);
        if (!Array.isArray(dados)) throw new Error("Formato inválido");

        const ids = new Set();
        const itens = [];
        for (const item of dados) {
            if (!item || !Object.hasOwn(IMAGENS_NOTICIAS, item.id)
                || typeof item.titulo !== "string" || !item.titulo.trim()
                || item.titulo.length > 200 || typeof item.descricao !== "string"
                || item.descricao.length > 2000 || ids.has(item.id)) continue;
            ids.add(item.id);
            // A imagem vem do catálogo local, nunca de um endereço armazenado.
            itens.push({ id: item.id, titulo: item.titulo.trim(), descricao: item.descricao });
        }
        return {
            itens,
            aviso: itens.length === dados.length ? "" : "Alguns favoritos inválidos foram ignorados.",
            bloqueado: false
        };
    } catch {
        return {
            itens: [], bloqueado: false,
            aviso: "Os favoritos salvos estão inválidos. Você pode escolher novas notícias."
        };
    }
}

function salvarFavoritos(itens) {
    try {
        localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(itens));
        return true;
    } catch {
        anunciarFavoritos("Não foi possível salvar a alteração. Seus favoritos não foram modificados.");
        return false;
    }
}

function obterDadosNoticia(artigo) {
    return {
        id: artigo.dataset.id,
        titulo: artigo.querySelector("h2, h3").textContent.trim(),
        descricao: artigo.querySelector("p").textContent.trim()
    };
}

function atualizarBotoesFavoritos(itens) {
    document.querySelectorAll("[data-favoritar]").forEach((botao) => {
        const id = botao.closest("article").dataset.id;
        const salvo = itens.some((item) => item.id === id);
        botao.setAttribute("aria-pressed", String(salvo));
        botao.textContent = salvo ? "★ Remover dos favoritos" : "☆ Favoritar notícia";
    });
}

function alternarFavorito(botao) {
    const estado = lerFavoritos();
    if (estado.bloqueado) {
        anunciarFavoritos(estado.aviso);
        return;
    }
    const noticia = obterDadosNoticia(botao.closest("article"));
    const salvo = estado.itens.some((item) => item.id === noticia.id);
    const itens = salvo
        ? estado.itens.filter((item) => item.id !== noticia.id)
        : [...estado.itens, noticia];
    if (!salvarFavoritos(itens)) return;
    atualizarBotoesFavoritos(itens);
    anunciarFavoritos(`${noticia.titulo}: ${salvo ? "removida dos" : "adicionada aos"} favoritos.`);
}

function criarImagemNoticia(id) {
    const [nome, alt] = IMAGENS_NOTICIAS[id];
    const imagem = document.createElement("img");
    imagem.src = `img/${nome}-800.webp`;
    imagem.srcset = [400, 800, 1200].map((largura) => `img/${nome}-${largura}.webp ${largura}w`).join(", ");
    imagem.sizes = TAMANHOS_CARDS;
    imagem.alt = alt;
    imagem.width = 1200;
    imagem.height = 675;
    imagem.loading = "lazy";
    imagem.decoding = "async";
    imagem.className = "imagem-noticia";
    return imagem;
}

function renderizarFavoritos(estado) {
    const lista = document.querySelector("#lista-favoritos");
    if (!lista) return;
    lista.replaceChildren();
    const resumo = estado.itens.length
        ? `${estado.itens.length} notícia(s) salva(s) nos favoritos.`
        : "Você ainda não favoritou nenhuma notícia. Volte à página inicial e escolha suas favoritas.";
    anunciarFavoritos([estado.aviso, resumo].filter(Boolean).join(" "));

    estado.itens.forEach((noticia) => {
        const artigo = document.createElement("article");
        const titulo = document.createElement("h2");
        titulo.textContent = noticia.titulo;
        const descricao = document.createElement("p");
        descricao.textContent = noticia.descricao;
        const botao = document.createElement("button");
        botao.type = "button";
        botao.dataset.removerFavorito = noticia.id;
        botao.textContent = "Remover dos favoritos";
        botao.setAttribute("aria-label", `Remover dos favoritos: ${noticia.titulo}`);
        artigo.append(criarImagemNoticia(noticia.id), titulo, descricao, botao);
        lista.append(artigo);
    });
}

function removerFavorito(botao) {
    const estado = lerFavoritos();
    if (estado.bloqueado) {
        anunciarFavoritos(estado.aviso);
        return;
    }
    const indice = estado.itens.findIndex((item) => item.id === botao.dataset.removerFavorito);
    const itens = estado.itens.filter((item) => item.id !== botao.dataset.removerFavorito);
    if (!salvarFavoritos(itens)) return;
    renderizarFavoritos({ itens, aviso: "" });
    // Após remover, o foco segue para o próximo botão, o anterior ou o resumo vazio.
    const botoes = [...document.querySelectorAll("[data-remover-favorito]")];
    const destino = botoes[Math.min(indice, botoes.length - 1)] || document.querySelector("#mensagem-favoritos");
    destino.focus();
}

function configurarFiltroNoticias() {
    const campo = document.querySelector("#buscar-noticia");
    if (!campo) return;
    if (typeof window.jQuery === "undefined") {
        campo.disabled = true;
        document.querySelector("#resultado-filtro").textContent = "Pesquisa indisponível. Todas as notícias estão listadas abaixo.";
        return;
    }
    const $ = window.jQuery;
    $(campo).off("input.sportsCentralFiltro").on("input.sportsCentralFiltro", function () {
        const consulta = String($(this).val()).trim().toLocaleLowerCase("pt-BR");
        let quantidade = 0;
        $("#noticias > article").each(function () {
            const texto = `${$(this).find("h3").text()} ${$(this).find("p").first().text()}`.toLocaleLowerCase("pt-BR");
            const corresponde = texto.includes(consulta);
            $(this).prop("hidden", !corresponde);
            if (corresponde) quantidade++;
        });
        $("#resultado-filtro").text(!consulta ? "Exibindo todas as notícias." : `${quantidade} notícia(s) encontrada(s).`);
    });
}

document.addEventListener("click", (evento) => {
    if (!(evento.target instanceof Element)) return;
    const favoritar = evento.target.closest("[data-favoritar]");
    const remover = evento.target.closest("[data-remover-favorito]");
    if (favoritar) alternarFavorito(favoritar);
    if (remover) removerFavorito(remover);
});

function atualizarFavoritos() {
    const estado = lerFavoritos();
    atualizarBotoesFavoritos(estado.itens);
    renderizarFavoritos(estado);
    if (estado.aviso && !document.querySelector("#lista-favoritos")) anunciarFavoritos(estado.aviso);
}

window.addEventListener("storage", (evento) => {
    if (evento.key === CHAVE_FAVORITOS || evento.key === null) atualizarFavoritos();
});
atualizarFavoritos();
configurarFiltroNoticias();
