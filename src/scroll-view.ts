import type { ScrollableItem } from "./types";

export class ScrollView {
  static readonly defaultWindowSize = 10;
  readonly progress: number = 0;

  constructor(
    private readonly items: ScrollableItem[],
    readonly windowStart: number = 0,
    readonly windowEnd: number = ScrollView.defaultWindowSize,
    readonly windowSize: number = ScrollView.defaultWindowSize
  ) {
    if (windowSize < 2) {
      throw new Error("ScrollView's windowSize cannot be smaller than 2");
    }
    if (windowStart < 0 || windowEnd < 0) {
      throw new Error(
        "ScrollView's windowStart and windowEnd cannot be negative"
      );
    }
    if (windowEnd > items.length) {
      throw new Error(
        "ScrollView's windowEnd cannot be greater than the number of items"
      );
    }
    this.progress = this.calculateProgress();
  }

  get values(): ScrollableItem[] {
    return this.items.slice(this.windowStart, this.windowEnd);
  }

  scrollDown(): ScrollView {
    if (this.windowEnd < this.items.length) {
      return new ScrollView(
        this.items,
        this.windowStart + 1,
        this.windowEnd + 1,
        this.windowSize
      );
    }
    return this;
  }

  scrollUp(): ScrollView {
    if (this.windowStart > 0) {
      return new ScrollView(
        this.items,
        this.windowStart - 1,
        this.windowEnd - 1,
        this.windowSize
      );
    }
    return this;
  }

  private calculateProgress(): number {
    const maxScrollPosition = this.items.length - this.windowSize;
    if (maxScrollPosition <= 0) return 0;
    return Math.round((this.windowStart / maxScrollPosition) * 100);
  }
}
