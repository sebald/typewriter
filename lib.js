// --- Configuration Constants ---
export const DEFAULT_TYPING_DELAYS = [50, 75, 100, 150, 200];
export const DEFAULT_FIELD_PAUSE_MIN = 300;
export const DEFAULT_FIELD_PAUSE_MAX = 800;

// --- Utility Functions ---

/**
 * Gets a random delay from either an array of delays or a min/max range
 * @param {number|null} min - Minimum delay (when using range)
 * @param {number|null} max - Maximum delay (when using range)
 * @param {number[]|null} delaysArray - Array of predefined delays
 * @returns {number} Random delay in milliseconds
 */
export const getRandomDelay = (min, max, delaysArray) => {
  if (delaysArray) {
    const randomIndex = Math.floor(Math.random() * delaysArray.length);
    return delaysArray[randomIndex];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Promise-based delay function
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after the delay
 */
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// --- Core Typewriter Logic ---

/**
 * Simulates a typewriter effect in a single form input field
 * @param {string} elementId - The ID of the input element
 * @param {string} text - The text to type
 * @param {number[]} typingDelays - Array of delays for typing rhythm
 * @returns {Promise} Promise that resolves when typing is complete
 */
export const typeIntoInput = async (
  elementId,
  text,
  typingDelays = DEFAULT_TYPING_DELAYS
) => {
  const inputField = document.getElementById(elementId);

  if (!inputField) {
    throw new Error(`Input element with ID '${elementId}' not found`);
  }

  inputField.value = '';

  for (const char of text) {
    inputField.value += char;
    inputField.dispatchEvent(new Event('input', { bubbles: true }));
    const nextTypingDelay = getRandomDelay(null, null, typingDelays);
    await delay(nextTypingDelay);
  }
};

/**
 * Configuration options for the typewriter
 * @typedef {Object} TypewriterConfig
 * @property {number[]} typingDelays - Array of delays for typing rhythm
 * @property {number} fieldPauseMin - Minimum pause between fields
 * @property {number} fieldPauseMax - Maximum pause between fields
 * @property {boolean} scrollToField - Whether to scroll to each field
 * @property {boolean} focusField - Whether to focus each field
 */

/**
 * Input data item
 * @typedef {Object} InputData
 * @property {string} id - The ID of the input element
 * @property {string} text - The text to type into the input
 */

/**
 * Fills multiple input fields sequentially with typewriter effect
 * @param {InputData[]} dataArray - Array of input data objects
 * @param {TypewriterConfig} config - Configuration options
 * @returns {Promise} Promise that resolves when all inputs are filled
 */
export const fillInputsSequentially = async (dataArray, config = {}) => {
  const {
    typingDelays = DEFAULT_TYPING_DELAYS,
    fieldPauseMin = DEFAULT_FIELD_PAUSE_MIN,
    fieldPauseMax = DEFAULT_FIELD_PAUSE_MAX,
    scrollToField = true,
    focusField = true,
  } = config;

  for (let i = 0; i < dataArray.length; i++) {
    const item = dataArray[i];
    const inputField = document.getElementById(item.id);

    if (!inputField) {
      console.error(`Input element with ID '${item.id}' not found. Skipping.`);
      continue;
    }

    if (scrollToField) {
      inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (focusField) {
      inputField.focus();
    }

    await typeIntoInput(item.id, item.text, typingDelays);

    if (i < dataArray.length - 1) {
      const fieldPauseTime = getRandomDelay(fieldPauseMin, fieldPauseMax);
      await delay(fieldPauseTime);
    }
  }
};

/**
 * Creates a typewriter instance with default configuration
 * @param {TypewriterConfig} defaultConfig - Default configuration
 * @returns {Object} Typewriter instance with bound methods
 */
export const createTypewriter = (defaultConfig = {}) => {
  return {
    typeIntoInput: (elementId, text, config = {}) =>
      typeIntoInput(
        elementId,
        text,
        { ...defaultConfig, ...config }.typingDelays
      ),
    fillInputsSequentially: (dataArray, config = {}) =>
      fillInputsSequentially(dataArray, { ...defaultConfig, ...config }),
  };
};
