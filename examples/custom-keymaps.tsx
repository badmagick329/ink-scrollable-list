import { ScrollableList } from "../src/ScrollableList";
import { render } from "ink";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const CustomKeyMaps = () => {
  return (
    <ScrollableList
      items={items}
      visibleCount={10}
      keyMap={{
        up: ["w", "up", "pageup"],
        down: ["s", "down", "pagedown", "space"],
      }}
    />
  );
};

render(<CustomKeyMaps />);
