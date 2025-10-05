// Helpers
// ---------------
const DEFAULT_TYPING_DELAYS = [50, 75, 100, 150, 200];

const getRandomDelay = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_TYPING_DELAYS.length);
  return DEFAULT_TYPING_DELAYS[randomIndex];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const typeIntoInput = async (elementId, text) => {
  const inputField = document.getElementById(elementId);

  if (!inputField) {
    throw new Error(`Input element with ID '${elementId}' not found`);
  }

  inputField.value = '';

  for (const char of text) {
    inputField.value += char;
    inputField.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(getRandomDelay());
  }
};

export const typewriter = async dataArray => {
  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i];
    const inputField = document.getElementById(item.id);

    if (!inputField) {
      console.error(`Input element with ID '${item.id}' not found. Skipping.`);
      continue;
    }

    inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    inputField.focus();

    await typeIntoInput(item.id, item.text);
  }
};
