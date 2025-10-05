// Helpers
// ---------------
const TYPING_DELAYS = [10, 25, 50, 75, 100, 150];
const FIELD_DELAYS = [300, 400];

const pick = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const typeIntoInput = async ({ el, text }) => {
  el.value = '';

  for (const char of text) {
    el.value += char;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(pick(TYPING_DELAYS));
  }
};

export const typewriter = async list => {
  for (let i = 0; i < list.length; i++) {
    const { get, ...rest } = list[i];
    const el = get();

    if (!el) {
      console.error('Input element not found. Skipping.', rest);
      continue;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.focus();

    await typeIntoInput({ el, ...rest });
    await delay(pick(FIELD_DELAYS));
  }
};
