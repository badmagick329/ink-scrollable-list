import { ScrollableList } from "../src/ScrollableList";
import { render, Box, Text } from "ink";
import type { ScrollableItem } from "../src/types";

interface Task extends ScrollableItem {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
}

// Sample tasks
const tasks: Task[] = Array.from({ length: 30 }, (_, i) => {
  return {
    id: i,
    title: `Task #${i}`,
    completed: Math.random() > 0.5,
    priority: ["low", "medium", "high"][
      Math.floor(Math.random() * 3)
    ] as Task["priority"],
    dueDate:
      Math.random() > 0.7 ? new Date(Date.now() + i * 86400000) : undefined,
    toString() {
      return `${this.completed ? "✓" : "○"} ${this.title}`;
    },
  };
});

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "red";
    case "medium":
      return "yellow";
    case "low":
      return "green";
    default:
      return "white";
  }
};

const CustomRenderExample = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold underline>
        Comparison: Default vs Custom Rendering
      </Text>
      <Box marginTop={1} gap={2} flexDirection="column">
        {/* Default rendering using toString() */}
        <Box flexDirection="column">
          <Text bold>Default Rendering (toString)</Text>
          <ScrollableList items={tasks} visibleCount={8} />
        </Box>

        {/* Custom rendering with full control */}
        <Box flexDirection="column">
          <Text bold>Custom Rendering</Text>
          <ScrollableList
            items={tasks}
            visibleCount={8}
            renderItem={(task: Task) => (
              <Box gap={1}>
                <Text color={task.completed ? "green" : "white"}>
                  {task.completed ? "✓" : "○"}
                </Text>
                <Text strikethrough={task.completed} dimColor={task.completed}>
                  {task.title}
                </Text>
                <Text
                  color={getPriorityColor(task.priority)}
                  bold={task.priority === "high"}
                >
                  [{task.priority.toUpperCase()}]
                </Text>
                {task.dueDate && (
                  <Text dimColor>
                    (Due: {task.dueDate.toLocaleDateString()})
                  </Text>
                )}
              </Box>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

render(<CustomRenderExample />);
