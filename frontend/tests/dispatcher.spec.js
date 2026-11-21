import { expect, test } from "@playwright/test";

async function login(page, username = "dispatcher") {
  await page.goto("/login/");
  await page.getByLabel("Логин").fill(username);
  await page.getByLabel("Пароль").fill("Demo-duty-2601!");
  await page.getByRole("button", { name: "Войти" }).click();
  await expect(page).toHaveURL(/\/home\/$/);
}

test("Vue: вход диспетчера и панель статистики", async ({ page }) => {
  await login(page);
  await expect(page.getByRole("heading", { name: "Главная" })).toBeVisible();
  await expect(page.getByText("Активные сотрудники")).toBeVisible();
});

test("Vue: позиции расписания и отмена подбора замены", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: "Расписание", exact: true }).click();
  await page.locator("[data-slot-editor]").first().click();
  const dialog = page.getByRole("dialog", { name: "Подбор замены" });
  await expect(dialog.getByRole("button", { name: "Подтвердить" })).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Доступные охранники" })).toBeVisible();
  await dialog.getByRole("button", { name: "Отмена" }).click();
  await expect(dialog).toBeHidden();
});

test("Vue: журнал скачивает Excel", async ({ page }) => {
  await login(page);
  await page.getByRole("link", { name: "Журнал", exact: true }).click();
  const download = page.waitForEvent("download");
  await page.getByRole("link", { name: "Экспорт в Excel" }).click();
  expect((await download).suggestedFilename()).toBe("audit-log.xlsx");
});

test("Vue: охранник видит только свой график", async ({ page }) => {
  await login(page, "guard01");
  await page.getByRole("link", { name: "Расписание", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Мои дежурства" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Сформировать" })).toHaveCount(0);
});
