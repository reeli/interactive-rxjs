import React, { memo, useCallback, useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Button } from "src/components/Button";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { AnimatedLine, useAnimatedLine } from "src/components/AnimatedLine";
import { useSprings } from "react-spring";
import { Highlight } from "src/components/Highlight";
import { isNull, map } from "lodash";
import { Circle } from "src/components/Circle";
import { Link } from "src/components/Link";

const LINE_CONFIG = {
  SUBSCRIBE_LINE: {
    x1: 100,
    x2: 100,
    y1: 120,
    y2: 250,
  },
  LINE1: {
    x1: 40,
    x2: 40,
    y1: 0,
    y2: 120,
  },
  LINE2: {
    x1: 160,
    x2: 160,
    y1: 0,
    y2: 120,
  },
};

const codePieces = `
import { concat, of } from "rxjs";                                    

const source1$ = of(1);
const source2$ = of(2);

const source$ = concat(source1$, source2$);
                                    
source$.subscribe(console.log);
`;

const data1 = ["A1", "A2"];
const data2 = ["B1", "B2"];

const Source1 = ({ started, onRest }: { started: boolean | null; onRest?: () => void }) => {
  const springs = useSprings(
    data1.length,
    data1.map((_, i) => ({
      from: { x: 40, y: 16 },
      config: {
        native: true,
      },
      to: async (next: any) => {
        if (started) {
          await next({ x: 40, y: 140, config: { duration: 750 } });
          await next({ x: 100, y: 140, config: { duration: 10 } });
          await next({ x: 100, y: 270, config: { duration: 740 } });
        }
      },
      delay: 1000 + i * 3500,
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
      from: { x: 160, y: 16 },
      to: async (next: any) => {
        if (started) {
          await next({ x: 160, y: 140, config: { duration: 750 } });
          await next({ x: 100, y: 140, config: { duration: 10 } });
          await next({ x: 100, y: 270, config: { duration: 740 } });
        }
      },
      config: {
        native: true,
      },
      delay: 3000 + i * 3500,
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

export const MergeDemo = () => {
  const [started, setStarted] = useState<boolean | null>(null);
  const [isComplete1, setIsComplete1] = useState<boolean | null>(null);
  const [isComplete2, setIsComplete2] = useState<boolean | null>(null);

  const styleSubscribeLine = useAnimatedLine({
    y1: LINE_CONFIG.SUBSCRIBE_LINE.y1,
    y2: LINE_CONFIG.SUBSCRIBE_LINE.y2,
    started,
  });

  const handleRest1 = useCallback(() => {
    setIsComplete1(true);
  }, []);

  const handleRest2 = useCallback(() => {
    setIsComplete2(true);
  }, []);

  const styleLine1 = useAnimatedLine({
    y1: LINE_CONFIG.LINE1.y1,
    y2: LINE_CONFIG.LINE1.y2,
    started,
    delay: 600,
  });

  const styleLine2 = useAnimatedLine({
    y1: LINE_CONFIG.LINE2.y1,
    y2: LINE_CONFIG.LINE2.y2,
    started,
    delay: 2500,
  });

  return (
    <div>
      <DemoTitle>
        <Link id={"merge"} href={"#merge"} variant={"title"}>
          merge
        </Link>
      </DemoTitle>
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
            setStarted(null);
          }}
          css={{ marginLeft: 5 }}
        >
          重置动画
        </Button>
      </DemoHeader>
      <div css={{ display: "flex" }}>
        <div css={{ width: 200 }}>
          <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
            <AnimatedLine
              {...LINE_CONFIG.SUBSCRIBE_LINE}
              stroke={isComplete2 ? COLORS.GREY : COLORS.GREEN}
              style={styleSubscribeLine}
            />
            <AnimatedLine {...LINE_CONFIG.LINE1} stroke={isComplete1 ? COLORS.GREY : COLORS.GREEN} style={styleLine1} />
            <MSource1 started={started} onRest={handleRest1} />
            <AnimatedLine {...LINE_CONFIG.LINE2} stroke={isComplete2 ? COLORS.GREY : COLORS.GREEN} style={styleLine2} />
            <MSource2 started={started} onRest={handleRest2} />
            <Rect width={80} text={"SourceA$"} />
            <Rect width={80} x={120} text={"SourceB$"} />
            <Rect y={120} text={"Merge$"} fill={COLORS.PURPLE} />
            <ObserverRect />
          </svg>
        </div>
        <Highlight>{codePieces}</Highlight>
      </div>
      <DemoFooter />
    </div>
  );
};
