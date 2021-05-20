import { BasePage } from './base-page';
import { ElementHandle } from 'playwright';
export class HomePage extends BasePage {
  public get elements() {
    return {
      logoTopLeft: 'nav >> a >> text="Playwright"',
      themeToggle: '.navbar >> .react-toggle',
      navBar: '.navbar',
    };
  }

  public async goToHomePage(): Promise<ElementHandle<HTMLElement | SVGElement>> {
    await this.goto();
    return this.page.waitForSelector(this.elements.logoTopLeft);
  }

  public async changeThemeTo(theme: string): Promise<ElementHandle<HTMLElement | SVGElement>> {
    const current = await this.page.getAttribute('html', 'data-theme');
    if (current !== theme) {
      await this.page.click(this.elements.themeToggle);
    }

    return this.expect(await this.page.waitForSelector(`html[data-theme=${theme}]`)).toBeTruthy();
  }

  public async expectBackgroundColor(color: string): Promise<string> {
    const backgroundColor = await this.page.$eval(
      this.elements.navBar,
      (e) => getComputedStyle(e).backgroundColor,
    );
    return this.expect(color).toBe(backgroundColor);
  }
}
