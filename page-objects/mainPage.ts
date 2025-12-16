import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage  {
  readonly page: Page;
  readonly navigationTab: Locator;
  readonly uploadFileButton: Locator;
  readonly resultStatus: Locator;
  readonly resultIcon: Locator;
  readonly resultText: Locator;
  readonly errorPoints: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationTab = page.locator('[class*="NavTabs_link"]');
    this.uploadFileButton = page.locator('[data-test="button-upload-file"]');
    this.resultStatus = page.locator('[class*="Intro_status-text"]');
    this.resultIcon = page.locator('svg circle');
    this.resultText = page.locator('div[class*="Intro_checks"]');
    this.errorPoints = page.locator('[class*="ChecksList_value"][class*="ChecksList_red"]');
  }

  async clickOnTab(tabText: string) {
    await this.navigationTab.filter({hasText: tabText}).click();
  }

  async uploadFile(filePath: string){
  await this.page.setInputFiles('input[type="file"]', filePath);
  }

  async verifyResult(resultStatus: 'Complaint'|'Non-compliant', resultStatusColor: 'rgb(35, 120, 4)'|'rgb(220, 67, 67)', resultText: 'All parameters successfully'|'Failed parameters') {
    let errorPointsNumber;
    await expect(this.resultStatus).toHaveText(resultStatus);
    await expect(this.resultStatus).toHaveCSS('color', resultStatusColor);

    if(resultText === 'Failed parameters') {
        errorPointsNumber = await this.errorPoints.count();
        await expect(this.resultText).toHaveText(`${resultText}${errorPointsNumber}`);
    } else {
        await expect(this.resultText).toHaveText(resultText);
    }
  }
}
