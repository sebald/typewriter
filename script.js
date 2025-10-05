import { typewriter } from './lib.js';

const INPUT_DATA = [
  { id: 'cakeName', text: 'Classic Black Forest Cake' },
  { id: 'frostingType', text: 'Vanilla Whipped Cream' },
  { id: 'instructions', text: 'Please add a cherry on top 🍒' },
];

document.addEventListener('DOMContentLoaded', () => typewriter(INPUT_DATA));
