import { Box } from "ink";
import type React from "react";
import type { ScrollView } from "./scroll-view";

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ScrollableItem = {
  id?: string | number;
  toString(): string;
};

export type BorderStyle = Prettify<
  React.ComponentProps<typeof Box>["borderStyle"]
>;

export type InkColor = React.ComponentProps<typeof Box>["borderColor"];

export interface ScrollableListProps {
  items: ScrollableItem[];
  visibleCount?: number; // default: 10

  // Scroll bar customization
  showScrollBar?: boolean; // default: true
  scrollBarPosition?: "left" | "right"; // default: 'right'
  scrollBarChar?: string; // default: '█'
  scrollBarStyle?: {
    color?: InkColor;
    backgroundColor?: InkColor;
  };

  // Box Styling
  borderStyle?: BorderStyle;
  borderColor?: InkColor;
  focusedBorderColor?: InkColor;

  // Keyboard navigation
  keyMap?: {
    up?: string[]; // default: ['up', 'k']
    down?: string[]; // default: ['down', 'j']
    pageUp?: string[]; // default: ['pageup']
    pageDown?: string[]; // default: ['pagedown']
  };
}

export type ScrollBarProps = Prettify<
  {
    scrollView: ScrollView;
  } & Pick<
    ScrollableListProps,
    "scrollBarChar" | "showScrollBar" | "scrollBarStyle"
  >
>;
