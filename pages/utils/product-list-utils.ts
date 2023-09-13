import { Page } from "@playwright/test";

export async function getAllNames(page: Page, nameSelector: string): Promise<string[]> {
    const nameElements = await page.$$(nameSelector);
    const names: string[] = [];

    for (const nameElement of nameElements) {
        if (nameElement) {
            const nameText = await nameElement.textContent();
            if (nameText) {
                names.push(nameText);
            }
        }
    }

    return names;
}