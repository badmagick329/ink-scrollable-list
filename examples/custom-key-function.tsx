import { render } from "ink";
import { ScrollableList } from "../src/index.js";

interface Task {
  timestamp: number;
  name: string;
  status: string;
  toString(): string;
}

// Items without an 'id' property - using timestamp as key instead
const tasks: Task[] = Array.from({ length: 30 }, (_, i) => ({
  timestamp: Date.now() - i * 1000,
  name: `Task ${i + 1}`,
  status: i % 3 === 0 ? "✓" : "○",
  toString() {
    return `${this.status} ${this.name}`;
  },
}));

function App() {
  return (
    <ScrollableList
      items={tasks}
      keyFn={(task) => task.timestamp}
      visibleCount={10}
    />
  );
}

render(<App />);
