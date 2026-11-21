import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: process.env.DUTY_UI_BASE_URL || "http://127.0.0.1:8000",
    launchOptions: process.env.DUTY_CHROMIUM ? { executablePath: process.env.DUTY_CHROMIUM } : {},
  },
});
