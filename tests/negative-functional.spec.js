const { test, expect } = require('@playwright/test');

async function typeAndConvert(page, text) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.type(text, { delay: 100 });
  await inputBox.press(' ');
  await inputBox.press('Backspace');
  await page.waitForTimeout(800);
  return await inputBox.inputValue();
}

async function clearTextarea(page) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.press('Control+A');
  await inputBox.press('Delete');
  await page.waitForTimeout(300);
}

test.describe('Negative Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/');
    await page.waitForLoadState('networkidle');
  });

  async function runTest(page, testInfo, input, expectedOutput) {
    let actualOutput = '';

    try {
      await page.goto('https://tamil.changathi.com', {
        waitUntil: 'domcontentloaded'
      });

      const inputBox = page.locator('textarea, input[type="text"]').first();
      await inputBox.click();
      await inputBox.fill('');
      await inputBox.type(input + ' ', { delay: 80 });
      await page.waitForTimeout(2000);

      actualOutput = await inputBox.inputValue();

      if (expectedOutput) {
        expect(actualOutput.trim()).toContain(expectedOutput);
      } else {
        const hasTamil = /[\u0B80-\u0BFF]/.test(actualOutput);
        expect(hasTamil).toBe(true);
      }

    } finally {
      await testInfo.attach('test-data', {
        body: JSON.stringify(
          { input, actual: actualOutput.trim(), expected: expectedOutput || '<any Tamil>' },
          null,
          2
        ),
        contentType: 'application/json'
      });
    }
  }

  /* ---------------- NEGATIVE TEST CASES (structure like positive) ---------------- */

  test('Fail_IO_N001: Joined words - naanveetukuporen', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'naanveetukuporen', '');
  });

  test('Fail_IO_N002: Joined words - avanepdivaruvan', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'avanepdivaruvan', '');
  });

  test('Fail_IO_N003: Heavy slang - machaaa superrr daaa', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'machaaa superrr daaa', '');
  });

  test('Fail_IO_N004: Heavy slang - yo vanakkam da', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'yo vanakkam da', '');
  });

  test('Fail_IO_N005: Heavy slang - brooo semmaaaa', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'brooo semmaaaa', '');
  });

  test('Fail_IO_N006: Long paragraph - first part', async ({ page }, testInfo) => {
    const text = 'avan oru good doctor aan vaalkai katharkkaren appo hospital la work pannum patients kum medicine correct aa kodukkaren doctor aaganum venumna medical college la padippu seiyum school padippu romba mukkiyam appadi life full aa padippu seiyanum';
    await runTest(page, testInfo, text, '');
  });

  test('Fail_IO_N007: Long paragraph - second part', async ({ page }, testInfo) => {
    const text = 'aval padippula romba aarvam kaatturaa aana exam nerathula tension romba irukku veetla ellaarum nalla mark edukkanum nu pressure podraanga appadi irundhaalum aval future pathi enna seiyanum nu thelivaa decide panna mudiyala';
    await runTest(page, testInfo, text, '');
  });

  test('Fail_IO_N008: Long paragraph - third part', async ({ page }, testInfo) => {
    const text = 'avan doctor profession romba periya responsibility nu ninaikkiraan night duty emergency calls ellam handle panna vendum patients feelings purinjukkanum nu sollraanga ivai ellam kettapparam avan life style pathi yosikka aarambichaan';
    await runTest(page, testInfo, text, '');
  });

  test('Fail_IO_N009: Symbols - multiple spaces', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'naan    ippo    romba    busy    aa    irukken', '');
  });

  test('Fail_IO_N010: Formatting - special characters', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'yen??? ipdi!!! nadakkudhu---enna??', '');
  });

});