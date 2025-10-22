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

## Quick Start

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

**Default Controls:**

- `↑` or `k` - Scroll up one line
- `↓` or `j` - Scroll down one line
- `PageUp` - Jump up by one page
- `PageDown` - Jump down by one page

> **Note:** The list must be focused to respond to keyboard input. Use `Tab` to cycle focus between components in your Ink app. The border color changes (blue by default) when the list is focused.

### With Custom Objects

```tsx
const items = [
  { id: 1, name: "Task 1", toString: () => "✓ Task 1" },
  { id: 2, name: "Task 2", toString: () => "✗ Task 2" },
  // ... more items
];

<ScrollableList items={items} visibleCount={5} />;
```

### With Custom Rendering

For more complex item rendering, use the `renderItem` prop to provide a custom render function:

```tsx
import { Box, Text } from "ink";

interface AppEvent {
  id: number;
  timestamp: number;
  type: "info" | "warning" | "error" | "success";
  message: string;
  toString(): string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "error":
      return "red";
    case "warning":
      return "yellow";
    case "success":
      return "green";
    default:
      return "blue";
  }
};

const events: AppEvent[] = [
  // ... your events
];

<ScrollableList
  items={events}
  visibleCount={10}
  renderItem={(event: AppEvent, index: number) => {
    const time = new Date(event.timestamp).toLocaleTimeString();
    return (
      <Box gap={1}>
        <Text dimColor>{time}</Text>
        <Text color={getLevelColor(event.type)} bold>
          [{event.type.toUpperCase()}]
        </Text>
        <Text>{event.message}</Text>
      </Box>
    );
  }}
/>;
```

When using `renderItem`, the component will use your custom rendering instead of calling `toString()` on each item. This gives you full control over the appearance of each list item.

## API

### Props

| Prop                 | Type                                    | Default      | Description                                                      |
| -------------------- | --------------------------------------- | ------------ | ---------------------------------------------------------------- |
| `items`              | `ScrollableItem[]`                      | **Required** | Array of items to display. Items must have a `toString()` method |
| `visibleCount`       | `number`                                | `10`         | Number of items visible at once                                  |
| `renderItem`         | `(item: T, index: number) => ReactNode` | -            | Custom render function for each item                             |
| `showScrollBar`      | `boolean`                               | `true`       | Whether to show the scroll bar                                   |
| `scrollBarPosition`  | `'left' \| 'right'`                     | `'right'`    | Position of the scroll bar                                       |
| `scrollBarChar`      | `string`                                | `'█'`        | Character used for the scroll bar indicator                      |
| `scrollBarStyle`     | `object`                                | -            | Style object for scroll bar (see below)                          |
| `borderStyle`        | `BorderStyle`                           | `'round'`    | Border style (`'single'`, `'double'`, `'round'`, etc.)           |
| `borderColor`        | `string`                                | `'white'`    | Border color when not focused                                    |
| `focusedBorderColor` | `string`                                | `'blue'`     | Border color when focused                                        |
| `keyMap`             | `object`                                | -            | Custom key mappings for navigation (see below)                   |

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
  up?: string[];       // Keys that scroll up one line (default: ['up', 'k'])
  down?: string[];     // Keys that scroll down one line (default: ['down', 'j'])
  pageUp?: string[];   // Keys that scroll up one page (default: ['pageup'])
  pageDown?: string[]; // Keys that scroll down one page (default: ['pagedown'])
}
```

**Supported Special Keys:**

You can use any single character (like `'a'`, `'j'`, `'w'`) or these special key names:

- `'up'`, `'down'`, `'left'`, `'right'` - Arrow keys
- `'pageup'`, `'pagedown'` - Page Up/Down keys
- `'home'`, `'end'` - Home/End keys
- `'return'` or `'enter'` - Enter/Return key
- `'escape'` or `'esc'` - Escape key
- `'space'` - Space bar
- `'tab'` - Tab key
- `'backspace'` - Backspace key
- `'delete'` - Delete key

**Examples:**

```tsx
// Use WASD-style navigation
<ScrollableList
  items={items}
  keyMap={{
    up: ["w", "up"],
    down: ["s", "down"],
    pageUp: ["W"],      // Shift+W for page up
    pageDown: ["S"],    // Shift+S for page down
  }}
/>

// Use only arrow and page keys (disable vim-style)
<ScrollableList
  items={items}
  keyMap={{
    up: ["up"],
    down: ["down"],
    pageUp: ["pageup"],
    pageDown: ["pagedown"],
  }}
/>

// Custom configuration
<ScrollableList
  items={items}
  keyMap={{
    up: ["up", "k", "w"],
    down: ["down", "j", "s"],
    pageUp: ["pageup", "home"],
    pageDown: ["pagedown", "end", "space"],
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

const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

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
      borderStyle="round"
      borderColor="white"
      focusedBorderColor="blue"
      keyMap={{
        up: ["up", "k"],
        down: ["down", "j"],
        pageUp: ["pageup"],
        pageDown: ["pagedown"],
      }}
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
