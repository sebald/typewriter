# 🎭 Typewriter Effect Library

A lightweight, modular JavaScript library that creates realistic typewriter effects for web forms and input fields.  
Ideal for automatically filling out forms during presentations or demos to showcase workflows and user interactions.

## 🚀 Demo

The included demo shows a cake order form that automatically fills itself with a typewriter effect:

1. Opens `index.html` in a browser
2. Watch as the form fields are filled automatically with realistic typing animation
3. Each field scrolls into view and receives focus before typing begins

## 🛠️ Installation & Usage

### Basic Setup

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser to see the demo
3. **Import the library** in your own projects:

```javascript
import { typewriter } from './lib.js';
```

### Using in Your HTML

Make sure to load your script as a module:

```html
<script type="module" src="script.js"></script>
```

### Basic Usage

```javascript
import { typewriter } from './lib.js';

const inputData = [
  {
    get: () => document.getElementById('username'),
    text: 'john_doe',
  },
  {
    get: () => document.getElementById('email'),
    text: 'john@example.com',
  },
];

// Start the typewriter effect
document.addEventListener('DOMContentLoaded', () => {
  typewriter(inputData);
});
```
