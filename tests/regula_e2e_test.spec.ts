import { test } from '../fixtures/fixture';

test('Verify face image quality results', async ({ page, mainPage }) => {
  await page.goto('/');

  await mainPage.clickOnTab('Face image quality');
  await mainPage.uploadFile('testData/brad_pitt1.jpg');
  await mainPage.verifyResult('Non-compliant', 'rgb(220, 67, 67)', 'Failed parameters');
});