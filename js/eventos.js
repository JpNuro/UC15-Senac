"use strict";

function normalizarTexto(texto) {
    return texto.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase("pt-BR")
        .trim();
}

function configurarPesquisaEventos() {
    const campo = document.querySelector("#buscar-evento");
    const resultado = document.querySelector("#resultado-eventos");
    const eventos = [...document.querySelectorAll("#lista-eventos > article")];
    if (!campo || !resultado) return;

    // O catálogo permanece no HTML; pesquisar só altera sua visibilidade.
    const catalogo = eventos.map((artigo) => ({
        artigo,
        texto: normalizarTexto(`${artigo.textContent} ${artigo.dataset.modalidade}`)
    }));

    function pesquisar() {
        const consulta = normalizarTexto(campo.value);
        let quantidade = 0;

        catalogo.forEach(({ artigo, texto }) => {
            const corresponde = texto.includes(consulta);
            artigo.hidden = !corresponde;
            if (corresponde) quantidade++;
        });

        resultado.textContent = quantidade === 0
            ? "Nenhum evento encontrado. Tente outro termo."
            : quantidade === 1 ? "1 evento encontrado." : `${quantidade} eventos encontrados.`;
    }

    campo.addEventListener("input", pesquisar);
    campo.disabled = false;
    pesquisar();
}

configurarPesquisaEventos();
