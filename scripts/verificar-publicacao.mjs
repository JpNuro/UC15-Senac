import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const raiz = fileURLToPath(new URL("../", import.meta.url));
const pacote = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: raiz, encoding: "utf8" }).trim();
const base = new URL(process.env.PORTAL_URL || "https://jpnuro.github.io/UC15-Senac/");
if (base.protocol !== "https:" && !["127.0.0.1", "localhost"].includes(base.hostname)) {
    throw new Error("A publicação remota deve usar HTTPS.");
}

async function buscar(caminho) {
    const url = new URL(caminho, base);
    url.searchParams.set("v", commit);
    return fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15000) });
}

// O CDN pode levar alguns segundos para expor o artefato recém-publicado.
let versao;
for (let tentativa = 0; tentativa < 18; tentativa++) {
    try {
        const resposta = await buscar("versao.json");
        if (resposta.ok) versao = await resposta.json();
        if (versao?.commit === commit && versao.versao === pacote.version) break;
    } catch { /* A próxima tentativa verifica novamente a disponibilidade. */ }
    if (tentativa === 17) throw new Error("A publicação não corresponde ao commit e à versão esperados.");
    await new Promise((resolver) => setTimeout(resolver, 5000));
}

const recursos = new Set(["LICENSE", "licencas/bootstrap-LICENSE.txt", "licencas/jquery-LICENSE.txt"]);
for (const pagina of ["index.html", "eventos.html", "contato.html", "favoritos.html"]) {
    const resposta = await buscar(pagina);
    if (!resposta.ok) throw new Error(`${pagina}: HTTP ${resposta.status}`);
    const html = await resposta.text();
    if (!html.includes("Sports Central") || !html.includes('<main id="inicio"')) throw new Error(`Conteúdo incorreto em ${pagina}.`);
    for (const resultado of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
        const url = new URL(resultado[1], base);
        if (url.origin !== base.origin) throw new Error(`Recurso externo inesperado: ${url.origin}`);
        recursos.add(url.pathname.slice(base.pathname.length));
    }
    for (const resultado of html.matchAll(/srcset="([^"]+)"/g)) {
        for (const item of resultado[1].split(",")) recursos.add(item.trim().split(/\s+/)[0]);
    }
}
for (const recurso of recursos) {
    const resposta = await buscar(recurso);
    if (!resposta.ok) throw new Error(`${recurso}: HTTP ${resposta.status}`);
}
const raizPublicada = await buscar("");
if (!raizPublicada.ok || !(await raizPublicada.text()).includes("Esporte para reunir a comunidade")) {
    throw new Error("O endereço raiz não abre a página inicial do portal.");
}
console.log(`Endereço e versão conferidos: ${base.href}`);
console.log(`Quatro páginas e ${recursos.size} recursos locais responderam sem erro. Commit: ${commit}.`);
