# ink-scrollable-list

A scrollable list component for [Ink](https://github.com/vadimdemedes/ink) with keyboard navigation, customizable styling, and scroll bars.

## Features

- 📜 **Smooth scrolling** - Navigate line-by-line or jump by pages through long lists
- ⌨️ **Custom key mappings** - Configure any keys for navigation, including special keys
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

### Basic Example

```tsx
import React from "react";
import { render } from "ink";
import { ScrollableList } from "ink-scrollable-list";

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

const App = () => {
  return <ScrollableList items={items} visibleCount={10} />;
};

render(<App />);
```

**Default Controls:** `↑`/`k` (up), `↓`/`j` (down), `PageUp`, `PageDown`

> **Note:** The list must be focused to respond to keyboard input. Use `Tab` to cycle focus. Border color changes when focused (blue by default).

### Custom Objects

Items need an `id` property or `toString()` method:

```tsx
const items = [
  { id: 1, name: "Task 1", toString: () => "✓ Task 1" },
  { id: 2, name: "Task 2", toString: () => "✗ Task 2" },
];

<ScrollableList items={items} visibleCount={5} />;
```

If your items don't have an `id` property, use `keyFn` to specify which property to use as the unique key:

```tsx
interface Task {
  timestamp: number;
  name: string;
  toString(): string;
}

<ScrollableList
  items={tasks}
  keyFn={(task) => task.timestamp}
  visibleCount={10}
/>;
```

### Custom Rendering

Use `renderItem` for custom item layouts:

```tsx
<ScrollableList
  items={events}
  renderItem={(event, index) => (
    <Box gap={1}>
      <Text dimColor>{new Date(event.timestamp).toLocaleTimeString()}</Text>
      <Text bold>[{event.type.toUpperCase()}]</Text>
      <Text>{event.message}</Text>
    </Box>
  )}
/>
```

## API

| Prop                 | Type                                    | Default      | Description                                           |
| -------------------- | --------------------------------------- | ------------ | ----------------------------------------------------- |
| `items`              | `T[]`                                   | **Required** | Array of items to display                             |
| `visibleCount`       | `number`                                | `10`         | Number of items visible at once                       |
| `renderItem`         | `(item: T, index: number) => ReactNode` | -            | Custom render function for each item                  |
| `keyFn`              | `(item: T) => string \| number`         | -            | Function to extract unique key from item              |
| `showScrollBar`      | `boolean`                               | `true`       | Whether to show the scroll bar                        |
| `scrollBarPosition`  | `'left' \| 'right'`                     | `'right'`    | Position of the scroll bar                            |
| `scrollBarChar`      | `string`                                | `'█'`        | Character used for the scroll bar indicator           |
| `scrollBarStyle`     | `object`                                | -            | `{ color?: string, backgroundColor?: string }`        |
| `borderStyle`        | `BorderStyle`                           | `'round'`    | Border style (`'single'`, `'double'`, `'round'`, etc) |
| `borderColor`        | `string`                                | `'white'`    | Border color when not focused                         |
| `focusedBorderColor` | `string`                                | `'blue'`     | Border color when focused                             |
| `keyMap`             | `object`                                | -            | Custom key mappings (see below)                       |

### keyMap

Customize keyboard controls:

```tsx
{
  up?: string[];       // default: ['up', 'k']
  down?: string[];     // default: ['down', 'j']
  pageUp?: string[];   // default: ['pageup']
  pageDown?: string[]; // default: ['pagedown']
}
```

**Example:**

```tsx
<ScrollableList
  items={items}
  keyMap={{
    up: ["w", "up"],
    down: ["s", "down"],
  }}
/>
```

**Supported keys:** Single characters (e.g., `'j'`, `'w'`), `'up'`, `'down'`, `'left'`, `'right'`, `'pageup'`, `'pagedown'`, `'home'`, `'end'`, `'return'`/`'enter'`, `'escape'`/`'esc'`, `'space'`, `'tab'`, `'backspace'`, `'delete'`

### ScrollableItem Type

Items must have a `toString()` method. Optionally include an `id` property or use `keyFn`:

```tsx
interface ScrollableItem {
  id?: string | number;
  toString(): string;
}
```

## Requirements

- **React** >= 18.0.0
- **Ink** >= 6.0.0

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or create an Issue.
