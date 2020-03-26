import React from "react";
import {map} from "lodash";
import {Spring} from "react-spring/renderprops-universal";
import {Circle} from "src/components/Circle";

const CIRCLE_CONFIG = {
  radius: 15,
  strokeWidth: 2,
  y: 250,
};

export const AnimatedCircles: React.FC<{
  data: Array<string | number>;
  started: boolean | null;
  onAnimationEnd?: () => void;
}> = ({ data, started, onAnimationEnd }) => (
  <>
    {map(data, (text, i) => {
      const y1 = CIRCLE_CONFIG.radius + CIRCLE_CONFIG.strokeWidth;
      const y2 = CIRCLE_CONFIG.y - (i + 1) * CIRCLE_CONFIG.radius * 2;
      return (
        <Spring
          from={{ y: y1 }}
          to={{ y: started ? y2 : y1 }}
          delay={i * 1000}
          key={i}
          onRest={() => {
            if (started && i === data.length - 1) {
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
