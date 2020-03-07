import React from "react";
import { map } from "lodash";
import { Spring } from "react-spring/renderprops-universal";
import { Circle } from "src/components/Circle";

const CIRCLE_CONFIG = {
  radius: 15,
  strokeWidth: 2,
  animateY: 220,
};

export const AnimatedCircles: React.FC<{
  data: Array<string | number>;
  completed: boolean;
  started: boolean;
  onReset?: () => void;
}> = ({ data, completed, started, onReset }) => (
  <>
    {map(data, (text, i) => {
      const y1 = CIRCLE_CONFIG.radius + CIRCLE_CONFIG.strokeWidth;
      const y2 = CIRCLE_CONFIG.animateY - i * CIRCLE_CONFIG.radius * 2;
      return (
        <Spring
          from={{ y: completed ? y2 : y1 }}
          to={{ y: started ? y2 : y1 }}
          delay={i * 1000}
          key={i}
          onRest={() => {
            if (i === data.length - 1) {
              onReset && onReset();
            }
          }}
        >
          {styles => <Circle translateY={styles.y} text={text} />}
        </Spring>
      );
    })}
  </>
);
