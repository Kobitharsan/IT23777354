const { test, expect } = require('@playwright/test');

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
    expect(actualOutput.trim()).toContain(expectedOutput);

  } finally {
    await testInfo.attach('test-data', {
      body: JSON.stringify(
        { input, actual: actualOutput.trim(), expected: expectedOutput },
        null,
        2
      ),
      contentType: 'application/json'
    });
  }
}

/* ---------------- NEW POSITIVE TEST CASES ---------------- */

test('Pass_IO_01: Greeting sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nanri vanakkam',
    'நன்றி வணக்கம்'
  );
});

test('Pass_IO_02: Question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nee eppo varuvai?',
    'நீ எப்போ வருவாய்?'
  );
});

test('Pass_IO_03: Office sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'innaiku office leave eduthen',
    'இன்னைக்கு ஆபீஸ் லீவு எடுத்தேன்'
  );
});

test('Pass_IO_04: Polite sentences', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'please anuppu',
    'ப்ளீஸ் அனுப்பு'
  );
});

test('Pass_IO_05: Informal sentences', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'romba bore adikkudhu',
    'ரொம்ப போர் அடிக்குது'
  );
});

test('Pass_IO_06: Daily statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan ippo veetla iruken',
    'நான் இப்போ வீட்ல இருக்கேன்'
  );
});

test('Pass_IO_07: Hunger expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'enakku romba pasikithu',
    'எனக்கு ரொம்ப பசிக்கிது'
  );
});

test('Pass_IO_08: Asking location', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nee enga iruka',
    'நீ எங்க இருக்க'
  );
});

test('Pass_IO_09: Time related question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'bus eppo varum',
    'பஸ் எப்போ வரும்'
  );
});

test('Pass_IO_10: Command sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'seekram vaa',
    'சீக்ரம் வா'
  );
});

test('Pass_IO_11: Polite command', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'konjam ukkarunga',
    'கொஞ்சம் உக்காருங்க'
  );
});

test('Pass_IO_12: Past tense', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan netru office ponen',
    'நான் நேற்று ஆபீஸ் போனேன்'
  );
});

test('Pass_IO_13: Future tense', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan nalaikku varuven',
    'நான் நாளைக்கு வருவேன்'
  );
});

test('Pass_IO_14: Mixed language sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'innaiku meeting irukku',
    'இன்னைக்கு மீட்டிங் இருக்கு'
  );
});

test('Pass_IO_15: App related sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'whatsapp message anuppu',
    'வாட்ஸாப்ப் மெசேஜ் அனுப்பு'
  );
});

test('Pass_IO_16: Currency usage', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nooru roobhai anuppu',
    'நூறு ரூபாய் அனுப்பு'
  );
});

test('Pass_IO_17: Time format', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'paththu maniku varom',
    'பத்து மணிக்கு வரோம்'
  );
});

test('Pass_IO_18: Emotional state', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan romba santhoshama irukken',
    'நான் ரொம்ப சந்தோஷமா இருக்கேன்'
  );
});

test('Pass_IO_19: Tired expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'enakku romba tired aa irukku',
    'எனக்கு ரொம்ப டிரேட் ஆ இருக்கு'
  );
});

test('Pass_IO_20: Casual statement', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan ippo free aa irukken',
    'நான் இப்போ பிரீ ஆ இருக்கேன்'
  );
});

test('Pass_IO_21: Asking status', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'ellam sriyaa nadakuthaa?',
    'எல்லாம் சரியா நடக்குதா?'
  );
});

test('Pass_IO_22: Instruction sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'andha file anupu',
    'அந்த பைலை அனுப்பு'
  );
});

test('Pass_IO_23: Simple command', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'inga vah!',
    'இங்க வாஹ்!'
  );
});

test('Pass_IO_24: Sad feeling', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'enakku romba kastama iruku',
    'எனக்கு ரொம்ப கஷ்டமா இருக்கு'
  );
});

