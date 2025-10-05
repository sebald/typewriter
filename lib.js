// Helpers
// ---------------
const TYPING_DELAYS = [50, 75, 100, 150, 200];
const FIELD_DELAYS = [300, 400, 500];

const pick = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const typeIntoInput = async (elementId, text) => {
  const el = document.getElementById(elementId);

  if (!el) {
    throw new Error(`Input element with ID '${elementId}' not found`);
  }

  el.value = '';

  for (const char of text) {
    el.value += char;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(pick(TYPING_DELAYS));
  }
};

export const typewriter = async list => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const el = document.getElementById(item.id);

    if (!el) {
      console.error(`Input element with ID '${item.id}' not found. Skipping.`);
      continue;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();

    await typeIntoInput(item.id, item.text);
    await delay(pick(FIELD_DELAYS));
  }
};
