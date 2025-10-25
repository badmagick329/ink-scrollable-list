import { ScrollableList, useListItemWidth } from "../src";
import { render, Box, Text } from "ink";

// Create test data with items that will definitely overflow
const createLongItems = (count: number) =>
  Array.from(
    { length: count },
    (_, i) =>
      `Item ${
        i + 1
      }: This is a very long text that would normally cause horizontal overflow and break the terminal layout when a scrollbar is present. The text needs to be properly truncated to account for the scrollbar space.`
  );

const ScrollbarLayoutDemo = () => {
  const longItems = createLongItems(20);

  // Get safe width accounting for scrollbar
  const safeWidth = useListItemWidth(true, "round");

  return (
    <Box flexDirection="column" gap={1} padding={1}>
      {/* Header */}
      <Text bold>Scrollbar Layout Demo</Text>
      <Text color="dim">
        Terminal columns: {process.stdout.columns || 80}, Safe item width:{" "}
        {safeWidth}
      </Text>

      {/* Problem demonstration */}
      <Box flexDirection="column">
        <Text color="red">
          ❌ Problem: Without truncation (items may overflow)
        </Text>
        <ScrollableList
          items={longItems.slice(0, 8)}
          visibleCount={4}
          showScrollBar={true}
          borderStyle="round"
          borderColor="red"
        />
      </Box>

      {/* Solution demonstration */}
      <Box flexDirection="column">
        <Text color="green">
          ✅ Solution: With proper truncation using useListItemWidth
        </Text>
        <ScrollableList
          items={longItems}
          visibleCount={6}
          showScrollBar={true}
          borderStyle="round"
          borderColor="green"
          renderItem={(item, index) => (
            <Text>
              {item.length > safeWidth
                ? `${item.slice(0, safeWidth - 3)}...`
                : item}
            </Text>
          )}
        />
      </Box>

      {/* Without scrollbar comparison */}
      <Box flexDirection="column">
        <Text color="blue">
          📋 Comparison: No scrollbar (more space available)
        </Text>
        <ScrollableList
          items={longItems.slice(0, 3)}
          visibleCount={3}
          showScrollBar={false}
          borderStyle="round"
          borderColor="blue"
          renderItem={(item, index) => {
            const widthWithoutScrollbar = useListItemWidth(false, "round");
            return (
              <Text>
                {item.length > widthWithoutScrollbar
                  ? `${item.slice(0, widthWithoutScrollbar - 3)}...`
                  : item}
              </Text>
            );
          }}
        />
      </Box>

      <Text color="yellow">
        💡 Use useListItemWidth(hasScrollbar, borderStyle) to get safe
        truncation width
      </Text>
    </Box>
  );
};

render(<ScrollbarLayoutDemo />);
