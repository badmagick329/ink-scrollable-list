import { Box, Text, useFocus, useInput } from "ink";
import { useState } from "react";
import { ScrollView } from "./scroll-view";
import { ScrollBar } from "./ScrollBar";
import type { ScrollableListProps } from "./types";

export function ScrollableList(props: ScrollableListProps) {
  const [visibleItems, setVisibleItems] = useState(
    new ScrollView(props.items, 0, props.visibleCount)
  );

  const { isFocused } = useFocus();
  const currentBorderColor = isFocused
    ? props.focusedBorderColor ?? "blue"
    : props.borderColor ?? "white";

  const upKeys = props.keyMap?.up ?? ["up", "k"];
  const downKeys = props.keyMap?.down ?? ["down", "j"];
  const pageUpKeys = props.keyMap?.pageUp ?? ["pageup"];
  const pageDownKeys = props.keyMap?.pageDown ?? ["pagedown"];

  useInput((input, key) => {
    if (!isFocused) {
      return;
    }

    if (matchesKey(downKeys, input, key)) {
      setVisibleItems(visibleItems.scrollDown());
    } else if (matchesKey(upKeys, input, key)) {
      setVisibleItems(visibleItems.scrollUp());
    } else if (matchesKey(pageDownKeys, input, key)) {
      setVisibleItems(visibleItems.pageDown());
    } else if (matchesKey(pageUpKeys, input, key)) {
      setVisibleItems(visibleItems.pageUp());
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

const matchesKey = (
  configuredKeys: string[],
  input: string,
  key: any
): boolean => {
  const keyMap: Record<string, boolean> = {
    up: key.upArrow,
    down: key.downArrow,
    left: key.leftArrow,
    right: key.rightArrow,
    return: key.return,
    enter: key.return,
    escape: key.escape,
    esc: key.escape,
    space: input === " ",
    tab: key.tab,
    backspace: key.backspace,
    delete: key.delete,
    pageup: key.pageUp,
    pagedown: key.pageDown,
    home: key.home,
    end: key.end,
  };

  return configuredKeys.some((configKey) => {
    const normalizedKey = configKey.toLowerCase();

    if (keyMap[normalizedKey]) {
      return keyMap[normalizedKey];
    }

    return input === configKey;
  });
};
