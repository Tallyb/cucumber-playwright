import { Page } from 'playwright';

export async function hasClass(page: Page, selector: string, className: string): Promise<boolean> {
  await page.waitForSelector(selector);
  return await page.$eval(selector, (el, className) => el.classList.contains(className), className);
}

export async function getElementsCount(page: Page, selector: string): Promise<number> {
  return await page.$$eval(selector, (els) => els.length);
}

export async function waitForNthElement(
  page: Page,
  selector: string,
  index: number,
): Promise<void> {
  await page.waitForSelector(`${selector}:nth-of-type(${index})`);
}

export async function getNodeName(page: Page, selector: string): Promise<string> {
  return page.$eval(selector, (e) => e.nodeName);
}

export async function getText(page: Page, selector: string): Promise<string | null> {
  return page.$eval(selector, (e) => e.textContent);
}

export async function getBoundingBox(
  page: Page,
  selector: string,
): Promise<{
  x: number;
  y: number;
  width: number;
  height: number;
} | null> {
  const el = await page.waitForSelector(selector);
  await el.waitForElementState('stable');
  const box = await el.boundingBox();
  el.dispose();
  return box;
}

export async function getCenterPoint(
  page: Page,
  selector: string,
): Promise<{ x: number; y: number } | undefined> {
  const box = await getBoundingBox(page, selector);
  if (!box) return;
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

export async function getStyleValue(
  page: Page,
  selector: string,
  key: string,
): Promise<string | undefined | null> {
  await page.waitForSelector(selector);
  const styleAttribute = await page.getAttribute(selector, 'style');
  if (!styleAttribute) return;
  const exp = new RegExp(`${key}:(.+?);`);
  const res = exp.exec(styleAttribute);
  return res && res.pop()?.trim();
}

export async function getTexts(page: Page, selector: string): Promise<Array<string | null>> {
  return await page.$$eval(selector, (els) => els.map((e) => e.textContent));
}
