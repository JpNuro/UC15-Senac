import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: true,
    workers: 2,
    timeout: 30000,
    reporter: [["list"], ["html", { open: "never" }]],
    use: {
        baseURL: "http://127.0.0.1:4321",
        browserName: "chromium",
        viewport: { width: 1280, height: 900 },
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    },
    webServer: {
        command: "node scripts/servir.mjs",
        url: "http://127.0.0.1:4321",
        reuseExistingServer: false
    }
});
