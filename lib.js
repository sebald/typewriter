// Helpers
// ---------------
const TYPING_DELAYS = [10, 25, 50, 75, 100, 150];
const FIELD_DELAYS = [300, 400];

const pick = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Interaction Map
// ---------------
const interactions = {
  scroll: async ({ el, value }) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await delay(value);
  },

  text: async ({ el, value }) => {
    await interactions.scroll({ el, value: pick(FIELD_DELAYS) });
    el.focus();
    el.value = '';

    for (const char of value) {
      el.value += char;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      const isTextarea = el.tagName === 'TEXTAREA';
      const delayMs = pick(TYPING_DELAYS) / (isTextarea ? 2 : 1);
      await delay(delayMs);
    }
  },

  select: async ({ el, value }) => {
    await interactions.scroll({ el, value: pick(FIELD_DELAYS) });
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
  },

  chosen: async ({ el, value }) => {
    await interactions.select({ el, value });
    if (jQuery) {
      jQuery(el).trigger('chosen:updated');
    }
  },

  check: async ({ el, value }) => {
    await interactions.scroll({ el, value: pick(FIELD_DELAYS) });
    el.focus();

    await delay(pick(TYPING_DELAYS) * 2);

    el.checked = value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
  },

  date: async ({ el, value }) => {
    await interactions.scroll({ el, value: pick(FIELD_DELAYS) });
    el.focus();

    await delay(pick(TYPING_DELAYS) * 2);
    el.value = value;
    el.dispatchEvent(new Event('change', { bubbles: true }));
  },
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

    const interaction = interactions[type];
    if (!interaction) {
      console.error(
        `Unknown interaction type "${type}". Supported types: ${Object.keys(
          interactions
        ).join(', ')}`
      );
      continue;
    }

    await interaction({ el, value });
  }
};
