import { animated, useSpring } from "react-spring";
import React, { forwardRef, RefObject } from "react";
import { isNull } from "lodash";

export const AnimatedLine = animated(({ style, x1 = 100, x2 = 100, y1 = 100, strokeWidth = 2, ...otherProps }) => (
  <line x1={x1} x2={x2} strokeWidth={strokeWidth} y1={y1} {...otherProps} {...style} />
));

interface ISpringAnimatedLineProps extends React.SVGProps<SVGLineElement> {
  started: boolean | null;
  onReset?: () => void;
}

export const useAnimatedLine = ({
  y1,
  y2,
  started,
  onReset,
  elementRef,
}: {
  y1: number;
  y2: number;
  started: boolean | null;
  onReset?: () => void;
  elementRef: RefObject<any>;
}) => {
  return useSpring<any>({
    ref: elementRef as any,
    from: {
      y1: y2,
      y2: started ? y1 : y2,
    },
    to: {
      y1: y2,
      y2: started ? y1 : y2,
    },
    onRest: () => {
      if (!isNull(started)) {
        onReset && onReset();
      }
    },
  });
};

export const SpringAnimatedLine = forwardRef<any, ISpringAnimatedLineProps>(
  ({ y1, y2, x1, x2, onReset, started = true, ...others }, elementRef) => {
    console.log(elementRef, started, "elele");
    const styles = useSpring<any>({
      ref: elementRef as any,
      from: {
        y1: y2,
        y2: started ? y1 : y2,
      },
      to: {
        y1: y2,
        y2: started ? y1 : y2,
      },
      config: {
        duration: 500,
      },
      onRest: () => {
        if (!isNull(started)) {
          onReset && onReset();
        }
      },
    });

    return <AnimatedLine x1={x1} x2={x2} y1={y1} y2={y2} {...others} style={styles} />;
  },
);
