import { useSpring } from "react-spring";

const LINE_CONFIG = {
  y1: 250,
  y2: 50,
};

export const useLineAnimation = (
  toggle: boolean | null = null,
  onAnimationDone?: () => any,
  y1 = LINE_CONFIG.y1,
  y2 = LINE_CONFIG.y2,
) =>
  useSpring({
    from: {
      y1,
      y2: toggle ? y2 : y1,
    },
    to: {
      y1: y1,
      y2: toggle ? y2 : y1,
    },
    onRest: () => {
      if (toggle) {
        onAnimationDone && onAnimationDone();
      }
    },
  });
