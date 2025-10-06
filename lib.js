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
const interactText = async ({ el, value }) => {
  await interactScroll({ el, value: pick(FIELD_DELAYS) });
  el.focus();
  el.value = '';

  for (const char of value) {
    el.value += char;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    const isTextarea = el.tagName === 'TEXTAREA';
    const delayMs = pick(TYPING_DELAYS) / (isTextarea ? 2 : 1);
    await delay(delayMs);
  }
};

const interactSelect = async ({ el, value }) => {
  await interactScroll({ el, value: pick(FIELD_DELAYS) });
  el.focus();

  // Find the option that matches the value
  const option =
    el.querySelector(`option[value="${value}"]`) ||
    Array.from(el.options).find(opt => opt.textContent.trim() === value);

  if (!option) {
    console.error(
      `Option with value or text "${value}" not found in select element`
    );
    return;
  }

  // Add visual delay to simulate thinking/searching
  await delay(pick(TYPING_DELAYS) * 3);

  el.value = option.value;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

// When chosen.js is used
const interactChosen = async ({ el, value }) => {
  await interactSelect({ el, value });
  if (jQuery) {
    jQuery(el).trigger('chosen:updated');
  }
};

const interactCheck = async ({ el, value }) => {
  await interactScroll({ el, value: pick(FIELD_DELAYS) });
  el.focus();

  await delay(pick(TYPING_DELAYS) * 2);

  el.checked = value;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const interactDate = async ({ el, value }) => {
  await interactScroll({ el, value: pick(FIELD_DELAYS) });
  el.focus();

  await delay(pick(TYPING_DELAYS) * 2);
  el.value = value;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const interactScroll = async ({ el, value }) => {
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  await delay(value);
};

const processElement = async ({ el, type, value }) => {
  switch (type) {
    case 'text':
      await interactText({ el, value });
      break;

    case 'select':
      await interactSelect({ el, value });
      break;

    case 'chosen':
      await interactChosen({ el, value });
      break;

    case 'check':
      await interactCheck({ el, value });
      break;

    case 'scroll':
      await interactScroll({ el, value });
      break;

    case 'date':
      await interactDate({ el, value });
      break;

    default:
      console.error(
        `Unknown interaction type "${type}". Supported types: text, select, chosen, check, scroll, date`
      );
  }
};

// Main Typewriter Function
// ---------------
export const typewriter = async list => {
  for (let i = 0; i < list.length; i++) {
    const { get, type, value } = list[i];
    const el = await get();

    if (!el) {
      console.error('Element not found. Skipping.', { type, value });
      continue;
    }

    await processElement({ el, type, value });
  }
};
