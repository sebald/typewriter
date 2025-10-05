import { typewriter } from './lib.js';

const INPUT_DATA = [
  {
    get: () => document.getElementById('cakeName'),
    text: 'Classic Black Forest Cake',
  },
  {
    get: () => document.getElementById('frostingType'),
    text: 'Vanilla Whipped Cream',
  },
  {
    get: () => document.getElementById('instructions'),
    text: 'Please add a cherry on top 🍒',
  },
];

window.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
    e.preventDefault();
    typewriter(INPUT_DATA);
  }
});
