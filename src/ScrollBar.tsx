import { Box, Text } from "ink";
import type { ScrollBarProps } from "./types";

export function ScrollBar(props: ScrollBarProps) {
  if (props.showScrollBar === false) return null;
  const maxScroll = props.scrollView.windowSize - 1;
  const scrollPosition = Math.floor(
    maxScroll * (props.scrollView.progress / 100)
  );

  return (
    <Box
      paddingTop={scrollPosition}
      backgroundColor={props.scrollBarStyle?.backgroundColor ?? "gray"}
    >
      <Text
        color={props.scrollBarStyle?.color ?? "white"}
        dimColor={props.scrollView.isScrollable()}
      >
        {props.scrollBarChar || "█"}
      </Text>
    </Box>
  );
}
