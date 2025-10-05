import { fillInputsSequentially } from './lib.js';

// --- Application-Specific Data ---
const INPUT_DATA = [
  { id: 'cakeName', text: 'Classic Black Forest Cake' },
  { id: 'frostingType', text: 'Vanilla Whipped Cream' },
  { id: 'instructions', text: 'Please add a cherry on top 🍒' },
];

// --- Execution Block ---

document.addEventListener('DOMContentLoaded', () => {
  fillInputsSequentially(INPUT_DATA);
});
