import { useRef, useCallback } from "react";

const useHorizontalScroll = (scrollDistance = 150) => {
  const scrollRef = useRef(null);

  const scroll = useCallback(
    (direction) => {
      const container = scrollRef.current;

      if (container) {
        container.scrollBy({
          left: direction === "left" ? -scrollDistance : scrollDistance,
          behavior: "smooth",
        });
      }
    },
    [scrollDistance]
  );

  return { scrollRef, scroll };
};

export default useHorizontalScroll;
