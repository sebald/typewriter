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

document.addEventListener('DOMContentLoaded', () => typewriter(INPUT_DATA));
