import { Box, Text, useFocus, useInput } from "ink";
import { useState } from "react";
import { ScrollView } from "./scroll-view";
import { ScrollBar } from "./ScrollBar";
import type { ScrollableListProps } from "./types";

export function ScrollableList(props: ScrollableListProps) {
  const [visibleItems, setVisibleItems] = useState(
    new ScrollView(props.items, 0, props.visibleCount, props.visibleCount)
  );

  const { isFocused } = useFocus();
  const currentBorderColor = isFocused
    ? props.focusedBorderColor ?? "blue"
    : props.borderColor ?? "white";

  useInput((input, key) => {
    if (!isFocused) {
      return;
    }

    if (key.downArrow || input === "j") {
      setVisibleItems(visibleItems.scrollDown());
    }

    if (key.upArrow || input === "k") {
      setVisibleItems(visibleItems.scrollUp());
    }
  });
  const isLeftScrollBar = props.scrollBarPosition === "left";

  return (
    <Box
      borderStyle={props.borderStyle ?? "round"}
      borderColor={currentBorderColor}
      gap={isLeftScrollBar ? 1 : 0}
      justifyContent={isLeftScrollBar ? "flex-end" : "space-between"}
      flexDirection={isLeftScrollBar ? "row-reverse" : "row"}
    >
      <Box flexDirection="column">
        {visibleItems.values.map((item) => {
          return (
            <Text key={item.id || item.toString()}>{item.toString()}</Text>
          );
        })}
      </Box>
      <ScrollBar
        scrollView={visibleItems}
        scrollBarChar={props.scrollBarChar}
        showScrollBar={props.showScrollBar}
        scrollBarStyle={props.scrollBarStyle}
      />
    </Box>
  );
}
