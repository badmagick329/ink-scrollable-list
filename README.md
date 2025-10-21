# ink-scrollable-list

A scrollable list component for [Ink](https://github.com/vadimdemedes/ink) with keyboard navigation, customizable styling, and scroll bars.

## Features

- 📜 **Smooth scrolling** - Navigate through long lists with keyboard controls
- ⌨️ **Custom key mappings** - Configure any keys for navigation. Uses arrow (↑/↓) and vim-style keys (j/k) by default
- 🎨 **Customizable styling** - Configure borders, colors, and scroll bar appearance
- 📏 **Flexible scroll bar** - Position on left or right, customize character and style
- 🎯 **Type-safe** - Built with TypeScript

## Installation

```bash
npm install ink-scrollable-list
```

Or with other package managers:

```bash
yarn add ink-scrollable-list ink react
bun add ink-scrollable-list ink react
```

## Usage

```tsx
import React from "react";
import { render } from "ink";
import { ScrollableList } from "ink-scrollable-list";

const items = [
  "Item 1",
  "Item 2",
  "Item 3",
  // ... more items
];

const App = () => {
  return (
    <ScrollableList items={items} visibleCount={10} showScrollBar={true} />
  );
};

render(<App />);
```

### With Custom Objects

```tsx
const items = [
  { id: 1, name: "Task 1", toString: () => "✓ Task 1" },
  { id: 2, name: "Task 2", toString: () => "✗ Task 2" },
  // ... more items
];

<ScrollableList items={items} visibleCount={5} />;
```

## API

### Props

| Prop                 | Type                | Default      | Description                                                      |
| -------------------- | ------------------- | ------------ | ---------------------------------------------------------------- |
| `items`              | `ScrollableItem[]`  | **Required** | Array of items to display. Items must have a `toString()` method |
| `visibleCount`       | `number`            | `10`         | Number of items visible at once                                  |
| `showScrollBar`      | `boolean`           | `true`       | Whether to show the scroll bar                                   |
| `scrollBarPosition`  | `'left' \| 'right'` | `'right'`    | Position of the scroll bar                                       |
| `scrollBarChar`      | `string`            | `'█'`        | Character used for the scroll bar indicator                      |
| `scrollBarStyle`     | `object`            | -            | Style object for scroll bar (see below)                          |
| `borderStyle`        | `BorderStyle`       | `'round'`    | Border style (`'single'`, `'double'`, `'round'`, etc.)           |
| `borderColor`        | `string`            | `'white'`    | Border color when not focused                                    |
| `focusedBorderColor` | `string`            | `'blue'`     | Border color when focused                                        |
| `keyMap`             | `object`            | -            | Custom key mappings for navigation (see below)                   |

#### ScrollBarStyle

```tsx
{
  color?: string;           // Color of the scroll bar indicator
  backgroundColor?: string; // Background color of the scroll bar track
}
```

#### KeyMap

Customize which keys trigger scrolling actions:

```tsx
{
  up?: string[];    // Keys that scroll up (default: ['up', 'k'])
  down?: string[];  // Keys that scroll down (default: ['down', 'j'])
}
```

**Supported Special Keys:**

You can use any single character (like `'a'`, `'j'`, `'w'`) or these special key names:

- `'up'`, `'down'`, `'left'`, `'right'` - Arrow keys
- `'return'` or `'enter'` - Enter/Return key
- `'escape'` or `'esc'` - Escape key
- `'space'` - Space bar
- `'tab'` - Tab key
- `'backspace'` - Backspace key
- `'delete'` - Delete key
- `'pageup'`, `'pagedown'` - Page Up/Down keys
- `'home'`, `'end'` - Home/End keys

**Examples:**

```tsx
// Use w/s instead of k/j for up/down
<ScrollableList
  items={items}
  keyMap={{
    up: ["w", "up"],
    down: ["s", "down"],
  }}
/>

// Use only arrow keys
<ScrollableList
  items={items}
  keyMap={{
    up: ["up"],
    down: ["down"],
  }}
/>
```

#### ScrollableItem

Items must implement:

```tsx
{
  id?: string | number;  // Optional unique identifier
  toString(): string;    // Method to render the item as text
}
```

## Full Example

```tsx
import React from "react";
import { render } from "ink";
import { ScrollableList } from "ink-scrollable-list";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const App = () => {
  return (
    <ScrollableList
      // Required:
      items={items}
      // Optionals with defaults:
      visibleCount={10}
      showScrollBar={true}
      scrollBarPosition="right"
      scrollBarChar="█"
      scrollBarStyle={{
        color: "white",
        backgroundColor: "gray",
      }}
      borderStyle={"round"}
      borderColor={"white"}
      focusedBorderColor={"blue"}
      keyMap={{ up: ["up", "k"], down: ["down", "j"] }}
    />
  );
};

render(<App />);
```

## Requirements

- **React** >= 18.0.0
- **Ink** >= 6.0.0

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
