import { useStdout } from "ink";

/**
 * Hook to calculate the safe text width for list items
 * Accounts for borders, scrollbar, and padding
 *
 * @param showScrollBar - Whether the scrollbar is visible
 * @param borderStyle - The border style being used (affects padding)
 * @returns The safe width for truncating text content
 */
export function useListItemWidth(
  showScrollBar: boolean = true,
  borderStyle?: string
) {
  const { stdout } = useStdout();
  const terminalWidth = stdout?.columns || 80;

  let safeWidth = terminalWidth;

  // Account for borders and padding
  const hasBorder = borderStyle && borderStyle !== "none";
  if (hasBorder) {
    safeWidth -= 4; // Left border + padding + right border + padding
  }

  // Account for scrollbar and its spacing
  if (showScrollBar) {
    safeWidth -= 2; // 1 for scrollbar char + 1 for gap
  }

  return Math.max(10, safeWidth); // Minimum width of 10
}
