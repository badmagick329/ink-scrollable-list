import type { ScrollableItem } from "./types";

export class ScrollView {
  static readonly defaultWindowSize = 10;
  readonly progress: number = 0;

  constructor(
    private readonly items: ScrollableItem[],
    readonly windowStart: number = 0,
    readonly windowSize: number = ScrollView.defaultWindowSize
  ) {
    if (windowSize < 2) {
      throw new Error("ScrollView's windowSize cannot be smaller than 2");
    }
    if (windowStart < 0) {
      throw new Error("ScrollView's windowStart cannot be negative");
    }
    this.progress = this.calculateProgress();
  }

  get values(): ScrollableItem[] {
    return this.items.slice(
      this.windowStart,
      this.windowSize + this.windowStart
    );
  }

  scrollDown(): ScrollView {
    if (this.windowStart + this.windowSize < this.items.length) {
      return new ScrollView(this.items, this.windowStart + 1, this.windowSize);
    }
    return this;
  }

  scrollUp(): ScrollView {
    if (this.windowStart > 0) {
      return new ScrollView(this.items, this.windowStart - 1, this.windowSize);
    }
    return this;
  }

  pageDown(): ScrollView {
    const newStart = Math.min(
      this.windowStart + this.windowSize,
      this.items.length - this.windowSize
    );
    return new ScrollView(this.items, newStart, this.windowSize);
  }

  pageUp(): ScrollView {
    const newStart = Math.max(this.windowStart - this.windowSize, 0);
    return new ScrollView(this.items, newStart, this.windowSize);
  }

  isScrollable(): boolean {
    return this.windowSize >= this.items.length;
  }

  private calculateProgress(): number {
    const maxScrollPosition = this.items.length - this.windowSize;
    if (maxScrollPosition <= 0) return 0;
    return Math.round((this.windowStart / maxScrollPosition) * 100);
  }
}
