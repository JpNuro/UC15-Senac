import { test, expect, chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const paginas = ["index.html", "eventos.html", "contato.html", "favoritos.html"];
const chave = "sportsCentralFavoritos";

test("abre o portal com recursos locais e sem erros", async ({ page }) => {
    const erros = [];
    page.on("pageerror", (erro) => erros.push(erro.message));
    page.on("response", (resposta) => {
        if (resposta.status() >= 400) erros.push(`${resposta.status()} ${resposta.url()}`);
    });
    const resposta = await page.goto("/");
    expect(resposta.status()).toBe(200);
    await expect(page).toHaveTitle(/Sports Central/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Esporte para reunir a comunidade");
    await page.locator("img").evaluateAll((imagens) => imagens.forEach((imagem) => { imagem.loading = "eager"; }));
    for (const imagem of await page.locator("img").all()) {
        await expect.poll(() => imagem.evaluate((elemento) => elemento.complete && elemento.naturalWidth > 0)).toBe(true);
    }
    expect(erros).toEqual([]);
});

test("navega entre as quatro páginas", async ({ page }) => {
    await page.goto("/");
    for (const [nome, arquivo] of [["Eventos", "eventos.html"], ["Contato", "contato.html"], ["Favoritos", "favoritos.html"], ["Início", "index.html"]]) {
        await page.getByRole("navigation").getByRole("link", { name: nome, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`${arquivo}$`));
        await expect(page.locator('nav [aria-current="page"]')).toHaveText(nome);
    }
});

for (const largura of [320, 768, 1280]) {
    for (const arquivo of paginas) {
        test(`${arquivo} funciona em ${largura} px e mantém o salto por teclado`, async ({ page }, informacoes) => {
            await page.setViewportSize({ width: largura, height: 900 });
            await page.goto(`/${arquivo}`);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            await page.keyboard.press("Tab");
            await expect(page.locator(".link-pular")).toBeFocused();
            await page.keyboard.press("Enter");
            await expect(page.locator("main")).toBeFocused();
            if (arquivo === "eventos.html") {
                const colunas = await page.locator(".grade-eventos").evaluate((elemento) => getComputedStyle(elemento).gridTemplateColumns.split(" ").length);
                expect(colunas).toBe(largura === 320 ? 1 : largura === 768 ? 2 : 3);
            }
            await page.locator("img").evaluateAll((imagens) => imagens.forEach((imagem) => { imagem.loading = "eager"; }));
            for (const imagem of await page.locator("img").all()) await imagem.evaluate((elemento) => elemento.decode());
            await page.screenshot({ path: informacoes.outputPath(`layout-${largura}.png`), fullPage: true });
        });
    }
}

for (const arquivo of paginas) {
    test(`teclado percorre todos os controles de ${arquivo} com foco visível`, async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 900 });
        await page.goto(`/${arquivo}`);
        const controles = await page.locator('a[href], button:not(:disabled), input:not(:disabled), textarea').all();
        for (const controle of controles) {
            await page.keyboard.press("Tab");
            await expect(controle).toBeFocused();
            expect(await controle.evaluate((elemento) => getComputedStyle(elemento).outlineStyle)).not.toBe("none");
        }
    });
}

test("formulário rejeita vazios, espaços e e-mail inválido, focando o erro", async ({ page }) => {
    await page.goto("/contato.html");
    const enviar = page.getByRole("button", { name: "Enviar mensagem" });
    await enviar.click();
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(3);
    await expect(page.locator("#nome")).toBeFocused();
    await page.locator("#nome").fill("   ");
    await enviar.click();
    await expect(page.locator("#nome")).toHaveAttribute("aria-invalid", "true");
    await page.locator("#nome").fill("Maria Silva");
    await page.locator("#email").fill("invalido");
    await page.locator("#mensagem").fill("Gostaria de conhecer a oficina.");
    await enviar.click();
    await expect(page.locator("#email")).toBeFocused();
    await expect(page.locator("#erro-email")).toContainText("e-mail válido");
    await page.locator("#email").fill("maria@exemplo.com");
    await page.locator("#mensagem").fill("   ");
    await enviar.click();
    await expect(page.locator("#mensagem")).toBeFocused();
});

test("Enter simula envio sem rede, recarga ou persistência dos dados pessoais", async ({ page }) => {
    await page.goto("/contato.html");
    const requisicoes = [];
    page.on("request", (requisicao) => requisicoes.push(requisicao.url()));
    await page.locator("#nome").fill("Maria Silva");
    await page.locator("#email").fill("maria@exemplo.com");
    await page.locator("#mensagem").fill("Quero participar da caminhada.");
    await page.locator("#nome").press("Enter");
    await expect(page.getByRole("status")).toContainText("Envio simulado");
    await expect(page).toHaveURL(/contato.html$/);
    await expect(page.locator("#mensagem")).toHaveValue("Quero participar da caminhada.");
    expect(await page.evaluate(() => localStorage.length)).toBe(0);
    expect(requisicoes).toEqual([]);
    await page.locator("#nome").fill("Maria Souza");
    await expect(page.getByRole("status")).toBeEmpty();
});

test("pesquisa eventos sem diferenciar acentos, por título, modalidade e local", async ({ page }) => {
    await page.goto("/eventos.html");
    const busca = page.getByRole("searchbox", { name: "Buscar evento" });
    for (const [consulta, quantidade] of [["PRACA", 1], ["basquete", 1], ["COMUNITARIO", 1], ["inexistente", 0], ["", 3]]) {
        await busca.fill(consulta);
        await expect(page.locator("#lista-eventos article:visible")).toHaveCount(quantidade);
        await expect(page.getByRole("status")).toContainText(quantidade ? String(quantidade) : "Nenhum evento");
    }
});

test("jQuery filtra notícias, anuncia zero resultados e restaura a lista", async ({ page }) => {
    await page.goto("/");
    const busca = page.getByRole("searchbox", { name: "Buscar notícia" });
    await busca.fill("basquete");
    await expect(page.locator("#noticias article:visible")).toHaveCount(1);
    await busca.fill("inexistente");
    await expect(page.locator("#noticias article:visible")).toHaveCount(0);
    await expect(page.locator("#resultado-filtro")).toContainText("0");
    await busca.fill("");
    await expect(page.locator("#noticias article:visible")).toHaveCount(4);
});

test("favoritos persistem e a remoção mantém o foco", async ({ page }) => {
    await page.goto("/");
    await page.locator("[data-favoritar]").nth(0).click();
    await page.locator("[data-favoritar]").nth(1).click();
    await page.reload();
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(2);
    await page.goto("/favoritos.html");
    await expect(page.locator("#lista-favoritos article")).toHaveCount(2);
    await expect(page.locator("#lista-favoritos img").first()).toHaveAttribute("srcset", /400w.*800w.*1200w/);
    await page.locator("[data-remover-favorito]").first().click();
    await expect(page.locator("[data-remover-favorito]")).toBeFocused();
    await page.locator("[data-remover-favorito]").click();
    await expect(page.locator("#lista-favoritos article")).toHaveCount(0);
    await expect(page.locator("#mensagem-favoritos")).toBeFocused();
    await page.reload();
    await expect(page.locator("#lista-favoritos article")).toHaveCount(0);
});

for (const valor of ["{json-invalido", '{"formato":"incorreto"}', '[null,42,{"id":"__proto__"}]']) {
    test(`favoritos toleram dados inválidos: ${valor}`, async ({ page }) => {
        await page.goto("/");
        await page.evaluate(({ chave, valor }) => localStorage.setItem(chave, valor), { chave, valor });
        await page.goto("/favoritos.html");
        await expect(page.locator("#lista-favoritos article")).toHaveCount(0);
        await expect(page.getByRole("status")).toContainText(/inválido/);
    });
}

test("favoritos antigos são deduplicados e não carregam URLs externas", async ({ page }) => {
    await page.goto("/");
    await page.evaluate((chave) => {
        const item = { id: "destaque-da-semana", titulo: "<b>Favorito antigo</b>", descricao: "Descrição salva", imagem: "https://example.com/rastrear.jpg" };
        localStorage.setItem(chave, JSON.stringify([item, item]));
    }, chave);
    const externos = [];
    page.on("request", (requisicao) => { if (!requisicao.url().startsWith("http://127.0.0.1:4321/")) externos.push(requisicao.url()); });
    await page.goto("/favoritos.html");
    await expect(page.locator("#lista-favoritos article")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 2 })).toHaveText("<b>Favorito antigo</b>");
    await expect(page.locator("#lista-favoritos h2 b")).toHaveCount(0);
    await expect(page.locator("#lista-favoritos img")).toHaveAttribute("src", /^img\//);
    expect(externos).toEqual([]);
});

test("falha de gravação não modifica o estado nem anuncia sucesso", async ({ page }) => {
    await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException("Bloqueado", "QuotaExceededError"); }; });
    await page.goto("/");
    const botao = page.locator("[data-favoritar]").first();
    await botao.click();
    await expect(page.locator("#status-favoritos")).toContainText("Não foi possível salvar");
    await expect(botao).toHaveAttribute("aria-pressed", "false");
});

test("falha de leitura é anunciada e não sobrescreve favoritos", async ({ page }) => {
    await page.addInitScript(() => { Storage.prototype.getItem = () => { throw new DOMException("Bloqueado", "SecurityError"); }; });
    await page.goto("/favoritos.html");
    await expect(page.getByRole("status")).toContainText("Não foi possível acessar");
    await page.goto("/");
    await page.locator("[data-favoritar]").first().click();
    await expect(page.locator("#status-favoritos")).toContainText("Não foi possível acessar");
    await expect(page.locator('[aria-pressed="true"]')).toHaveCount(0);
});

test("accordion funciona por teclado com estados e foco visível", async ({ page }) => {
    await page.goto("/");
    const botao = page.getByRole("button", { name: "Como participar das atividades?" });
    await botao.focus();
    await page.keyboard.press("Enter");
    await expect(botao).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#resposta-participacao")).toBeVisible();
    await expect(page.locator("#resposta-participacao")).toHaveClass(/collapse show/);
    await page.keyboard.press("Space");
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await expect(page.locator("#resposta-participacao")).toBeHidden();
    await expect(botao).toBeFocused();
    expect(await botao.evaluate((elemento) => getComputedStyle(elemento).outlineStyle)).not.toBe("none");
});

for (const largura of [320, 1280]) {
    test(`srcset escolhe imagem adequada em ${largura} px`, async ({ browser }) => {
        const contexto = await browser.newContext({ viewport: { width: largura, height: 900 }, deviceScaleFactor: 1 });
        try {
            const page = await contexto.newPage();
            await page.goto("http://127.0.0.1:4321/");
            const imagem = page.locator(".imagem-destaque");
            await imagem.evaluate((elemento) => elemento.decode());
            expect(await imagem.evaluate((elemento) => elemento.currentSrc)).toMatch(largura === 320 ? /-400.webp$/ : /-1200.webp$/);
        } finally { await contexto.close(); }
    });
}

test("sem JavaScript, catálogo permanece acessível e contato não envia", async ({ browser }) => {
    const contexto = await browser.newContext({ javaScriptEnabled: false });
    try {
        const page = await contexto.newPage();
        await page.goto("http://127.0.0.1:4321/eventos.html");
        await expect(page.locator("#lista-eventos article")).toHaveCount(3);
        await page.goto("http://127.0.0.1:4321/contato.html");
        await expect(page.getByRole("button", { name: "Enviar mensagem" })).toBeDisabled();
    } finally { await contexto.close(); }
});

test("servidor não expõe documentação e recusa envio real", async ({ request }) => {
    expect((await request.get("/README.md")).status()).toBe(404);
    expect((await request.get("/.git/config")).status()).toBe(404);
    expect((await request.get("/js/../package.json")).status()).toBe(404);
    expect((await request.post("/contato.html")).status()).toBe(405);
});

test("zoom real de 200% preserva conteúdo e uso das quatro páginas", async ({}, informacoes) => {
    const perfil = informacoes.outputPath("perfil-zoom");
    const contexto = await chromium.launchPersistentContext(perfil, {
        channel: "chromium", headless: true, viewport: null,
        args: ["--window-size=1280,900"]
    });
    try {
        const page = contexto.pages()[0];
        // Usa o controle nativo de zoom, em vez de simular uma viewport menor.
        await page.goto("chrome://settings/appearance");
        await page.locator("#zoomLevel").selectOption({ label: "200%" });
        await expect(page.locator("#zoomLevel")).toHaveValue("2");
        for (const arquivo of paginas) {
            await page.goto(`http://127.0.0.1:4321/${arquivo}`);
            expect(await page.evaluate(() => devicePixelRatio)).toBeCloseTo(2);
            expect(await page.evaluate(() => innerWidth)).toBeLessThanOrEqual(640);
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        }
        await page.goto("http://127.0.0.1:4321/contato.html");
        await page.getByRole("button", { name: "Enviar mensagem" }).click();
        await expect(page.locator("#nome")).toBeFocused();
        await expect(page.getByRole("status")).toContainText("Revise os campos");
        // Captura nativa evita o recorte incorreto de fullPage com zoom do navegador.
        const sessao = await contexto.newCDPSession(page);
        const captura = await sessao.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
        await writeFile(informacoes.outputPath("zoom-200.png"), Buffer.from(captura.data, "base64"));
    } finally { await contexto.close(); }
});
