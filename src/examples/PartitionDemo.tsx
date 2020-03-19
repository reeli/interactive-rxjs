import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import React, { memo, useEffect, useRef, useState } from "react";
import { Button } from "src/components/Button";
import { COLORS } from "src/style";
import { Rect } from "src/components/Rect";
import { animated, useSpring, useSprings } from "react-spring";
import { line } from "d3-shape";
import { isNull, map } from "lodash";
import { Circle } from "src/components/Circle";

const data1 = ["1", "3"];
const data2 = ["2", "4"];

const Source1 = ({ started, onRest }: { started: boolean | null; onRest?: () => void }) => {
  const springs = useSprings(
    data1.length,
    data1.map((_, i) => ({
      from: { x: 100, y: 0 },
      config: {
        native: true,
      },
      to: async (next: any) => {
        if (started) {
          await next({ x: 100, y: 120, config: { duration: 740 } });
          await next({ x: 40, y: 160, config: { duration: 740 } });
          await next({ x: 40, y: 250 - 30 / 2, config: { duration: 740 } });
        }
      },
      delay: 2000 + i * 3500,
      onRest: () => {
        if (!isNull(started) && i === data1.length - 1) {
          onRest && onRest();
        }
      },
    })),
  );

  return (
    <>
      {map(springs, (style: any, i) => (
        <Circle translateX={style.x} translateY={style.y} key={i} text={() => data1[i]} />
      ))}
    </>
  );
};

const Source2 = ({ started, onRest }: { started: boolean | null; onRest?: () => void }) => {
  const springs2 = useSprings(
    data2.length,
    data2.map((_, i) => ({
      from: { x: 100, y: 0 },
      to: async (next: any) => {
        if (started) {
          await next({ x: 100, y: 120, config: { duration: 740 } });
          await next({ x: 160, y: 160, config: { duration: 740 } });
          await next({ x: 160, y: 250 - 30 / 2, config: { duration: 740 } });
        }
      },
      config: {
        native: true,
      },
      delay: 4000 + i * 3500,
      onRest: () => {
        if (!isNull(started) && i === data2.length - 1) {
          onRest && onRest();
        }
      },
    })),
  );

  return (
    <>
      {map(springs2, (style: any, i) => (
        <Circle translateX={style.x} translateY={style.y} key={i} text={() => data2[i]} />
      ))}
    </>
  );
};

const MSource1 = memo(Source1);
const MSource2 = memo(Source2);

export const PartitionDemo = () => {
  const [started, setStarted] = useState<boolean | null>(null);
  const [totalLength, setTotalLength] = useState(0);
  const path1Ref = useRef<SVGPathElement | null>(null);

  const styles = useSpring<any>({
    from: {
      offset: 283,
    },
    to: {
      offset: started ? 0 : 283,
    },
    config: {
      duration: 2000,
    },
  });

  const d1 = line()([
    [40, 250],
    [40, 160],
    [100, 120],
    [100, 0],
  ]);

  useEffect(() => {
    if (path1Ref.current) {
      const totalLength = path1Ref.current.getTotalLength();
      setTotalLength(totalLength);
    }
  }, []);

  const d2 = line()([
    [160, 250],
    [160, 160],
    [100, 120],
    [100, 0],
  ]);

  return (
    <div>
      <DemoTitle>partition</DemoTitle>
      <DemoHeader>
        <Button
          onClick={() => {
            setStarted(true);
          }}
          css={{ color: COLORS.BLUE }}
        >
          开始动画
        </Button>
        <Button
          onClick={() => {
            setStarted(false);
          }}
          css={{ marginLeft: 5 }}
        >
          重置动画
        </Button>
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <animated.path
              d={d1 || ""}
              strokeWidth={2}
              stroke={COLORS.GREEN}
              fill={"none"}
              ref={path1Ref}
              strokeDasharray={totalLength}
              strokeDashoffset={styles.offset}
            />
            <animated.path
              d={d2 || ""}
              strokeWidth={2}
              stroke={COLORS.GREEN}
              fill={"none"}
              strokeDasharray={totalLength}
              strokeDashoffset={styles.offset}
            />
            <MSource1 started={started} onRest={() => {}} />
            <MSource2 started={started} onRest={() => {}} />
            <Rect width={200} height={40} text={"Source$"} />
            <Rect width={200} height={40} y={80} text={"Partition$"} fill={COLORS.PURPLE} />
            <Rect width={80} height={40} y={160} text={"A$"} />
            <Rect width={80} height={40} x={120} y={160} text={"B$"} />
            <Rect width={80} height={40} y={250} text={"ObserverA"} fill={COLORS.SECONDARY} />
            <Rect width={80} height={40} x={120} y={250} text={"ObserverB"} fill={COLORS.SECONDARY} />
          </svg>
        </div>
      </div>
      <DemoFooter />
    </div>
  );
};
