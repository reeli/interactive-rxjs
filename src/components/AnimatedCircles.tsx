import React from "react";
import { map } from "lodash";
import { Spring } from "react-spring/renderprops-universal";
import { Circle } from "src/components/Circle";
import { CIRCLE_CONFIG } from "src/constants";

export const AnimatedCircles: React.FC<{
  data: Array<string | number>;
  onAnimationEnd?: () => void;
}> = ({ data, onAnimationEnd }) => (
  <>
    {map(data, (text, i) => {
      const y1 = CIRCLE_CONFIG.radius + CIRCLE_CONFIG.strokeWidth;
      const y2 = CIRCLE_CONFIG.y - (i + 1) * CIRCLE_CONFIG.radius * 2;
      return (
        <Spring
          from={{ y: y1 }}
          to={{ y: y2 }}
          delay={(i + 1) * 600}
          key={i}
          onRest={() => {
            if (i === data.length - 1) {
              onAnimationEnd && onAnimationEnd();
            }
          }}
        >
          {styles => <Circle translateY={styles.y} text={text} />}
        </Spring>
      );
    })}
  </>
);
