import { cp, lstat, mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const raiz = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), ".."));
const dist = join(raiz, "dist");
const destino = join(dist, "site");
const paginas = ["index.html", "eventos.html", "contato.html", "favoritos.html"];

// O build só pode substituir sua própria saída dentro deste projeto.
for (const caminho of [dist, destino]) {
    const estado = await lstat(caminho).catch((erro) => {
        if (erro.code !== "ENOENT") throw erro;
    });
    if (estado?.isSymbolicLink()) throw new Error("A saída do build não pode ser um link simbólico.");
}
if (dirname(destino) !== resolve(raiz, "dist")) throw new Error("Destino de build inválido.");
await rm(destino, { recursive: true, force: true });
await mkdir(destino, { recursive: true });

for (const arquivo of [...paginas, "LICENSE"]) await cp(join(raiz, arquivo), join(destino, arquivo));
for (const pasta of ["css", "js", "img"]) await cp(join(raiz, pasta), join(destino, pasta), { recursive: true });
await cp(join(raiz, "docs", "licencas"), join(destino, "licencas"), { recursive: true });
await writeFile(join(destino, ".nojekyll"), "");

const pacote = JSON.parse(await readFile(join(raiz, "package.json"), "utf8"));
const commit = execFileSync("git", ["rev-parse", "HEAD"], { cwd: raiz, encoding: "utf8" }).trim();
await writeFile(join(destino, "versao.json"), JSON.stringify({ versao: pacote.version, commit }, null, 2) + "\n");

for (const pagina of paginas) {
    const html = await readFile(join(destino, pagina), "utf8");
    const referencias = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((resultado) => resultado[1]);
    for (const resultado of html.matchAll(/srcset="([^"]+)"/g)) {
        referencias.push(...resultado[1].split(",").map((item) => item.trim().split(/\s+/)[0]));
    }
    for (const referencia of referencias) {
        const url = new URL(referencia, `https://portal.local/${pagina}`);
        if (url.origin !== "https://portal.local") throw new Error(`Recurso externo inesperado: ${referencia}`);
        await lstat(join(destino, decodeURIComponent(url.pathname)));
    }
}
console.log(`Publicação preparada em dist/site — versão ${pacote.version}, commit ${commit.slice(0, 7)}.`);
