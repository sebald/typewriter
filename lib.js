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
const typeText = async ({ el, text }) => {
  el.focus();
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
  el.focus();

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

// When chosen.js is used
const chooosen = async ({ el, select }) => {
  await choose({ el, select });
  if (jQuery) {
    jQuery(el).trigger('chosen:updated');
  }
};

const toggle = async ({ el, check }) => {
  el.focus();

  await delay(pick(TYPING_DELAYS) * 2);

  el.checked = check;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const setDate = async ({ el, date }) => {
  el.focus();

  await delay(pick(TYPING_DELAYS) * 2);
  el.value = date;
  el.dispatchEvent(new Event('change', { bubbles: true }));
};

const processElement = async ({ el, type, value }) => {
  switch (type) {
    case 'text':
      await typeText({ el, text: value });
      break;

    case 'select':
      await choose({ el, select: value });
      break;

    case 'chosen':
      await chooosen({ el, select: value });
      break;

    case 'check':
      await toggle({ el, check: value });
      break;

    case 'scroll':
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await delay(value);
      break;

    case 'date':
      await setDate({ el, date: value });
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

    // Auto-scroll to element (unless it's a scroll-only action)
    if (type !== 'scroll') {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    await processElement({ el, type, value });

    // Add pause between fields (except for the last one)
    if (i < list.length - 1) {
      await delay(pick(FIELD_DELAYS));
    }
  }
};
