import { useSpring } from "react-spring";
import { LINE_CONFIG } from "src/constants";

export const useLineAnimation = (
  toggle: boolean | null = null,
  onAnimationEnd?: () => any,
  y1 = LINE_CONFIG.y1,
  y2 = LINE_CONFIG.y2,
) =>
  useSpring({
    from: {
      y1,
      y2: toggle ? y2 : y1,
    },
    to: {
      y1,
      y2: toggle ? y2 : y1,
    },
    onRest: () => {
      if (toggle) {
        onAnimationEnd && onAnimationEnd();
      }
    },
  });
