import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const paginas = new Set(["index.html", "eventos.html", "contato.html", "favoritos.html"]);
const tipos = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".png": "image/png",
    ".svg": "image/svg+xml"
};

const servidor = createServer(async (requisicao, resposta) => {
    if (!["GET", "HEAD"].includes(requisicao.method)) {
        resposta.writeHead(405, { Allow: "GET, HEAD" }).end();
        return;
    }

    try {
        const url = new URL(requisicao.url, "http://localhost");
        const caminho = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
        const arquivo = resolve(raiz, caminho);
        // Só recursos do portal são servidos; documentos e metadados Git ficam fora.
        const permitido = paginas.has(caminho)
            || caminho.startsWith("assets/") || caminho.startsWith("js/");
        if (!permitido || !arquivo.startsWith(raiz + sep) || !tipos[extname(arquivo)]) {
            resposta.writeHead(404).end("Recurso não encontrado.");
            return;
        }

        const conteudo = await readFile(arquivo);
        resposta.writeHead(200, { "Content-Type": tipos[extname(arquivo)] });
        resposta.end(requisicao.method === "HEAD" ? undefined : conteudo);
    } catch (erro) {
        const status = erro instanceof URIError ? 400 : 404;
        resposta.writeHead(status).end("Não foi possível abrir o recurso.");
    }
});

servidor.on("error", (erro) => {
    console.error(`Não foi possível iniciar o servidor: ${erro.message}`);
    process.exitCode = 1;
});

servidor.listen(4321, "127.0.0.1", () => {
    console.log("Sports Central: http://127.0.0.1:4321");
});
