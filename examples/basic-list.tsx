import { ScrollableList } from "../src/ScrollableList";
import { render } from "ink";

const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

const BasicList = () => {
  return (
    <ScrollableList
      // Required:
      items={items}
      // Optionals with defaults:
      visibleCount={10}
      showScrollBar={true}
      scrollBarPosition="right"
      scrollBarChar="█"
      scrollBarStyle={{
        color: "white",
        backgroundColor: "gray",
      }}
      borderStyle={"round"}
      borderColor={"white"}
      focusedBorderColor={"blue"}
    />
  );
};

render(<BasicList />);
