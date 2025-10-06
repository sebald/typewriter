// Helpers
// ---------------
const TYPING_DELAYS = [10, 25, 50, 75, 100, 150];
const FIELD_DELAYS = [300, 400];

const pick = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Emulate User Interactions
// ---------------
const type = async ({ el, text }) => {
  el.value = '';

  for (const char of text) {
    el.value += char;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    const isTextarea = el.tagName === 'TEXTAREA';
    const delayMs = pick(TYPING_DELAYS) / (isTextarea ? 2 : 1);
    await delay(delayMs);
  }
};

const choose = async ({ el, select }) => {
  // Find the option that matches the value
  const option =
    el.querySelector(`option[value="${select}"]`) ||
    Array.from(el.options).find(opt => opt.textContent.trim() === select);

  if (!option) {
    console.error(
      `Option with value or text "${select}" not found in select element`
    );
    return;
  }

  // Add visual delay to simulate thinking/searching
  await delay(pick(TYPING_DELAYS) * 3);

  el.value = option.value;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const toggle = async ({ el, check }) => {
  await delay(pick(TYPING_DELAYS) * 2);

  el.checked = check;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const processElement = async ({ el, text, select, check }) => {
  // Handle text input (input, textarea)
  if (text !== undefined) {
    await type({ el, text });
    return;
  }

  // Handle select elements
  if (select !== undefined) {
    await choose({ el, select });
    return;
  }

  // Handle checkbox elements
  if (check !== undefined) {
    await toggle({ el, check });
    return;
  }

  console.error(
    'No valid action specified. Use "text", "select", or "check" property.'
  );
};

// Main Typewriter Function
// ---------------
export const typewriter = async list => {
  for (let i = 0; i < list.length; i++) {
    const { get, ...rest } = list[i];
    const el = get();

    if (!el) {
      console.error('Element not found. Skipping.', rest);
      continue;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();

    await processElement({ el, ...rest });

    // Add pause between fields (except for the last one)
    if (i < list.length - 1) {
      await delay(pick(FIELD_DELAYS));
    }
  }
};
