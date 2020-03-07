import React, { useState } from "react";
import { COLORS } from "src/style";
import { DemoFooter, DemoHeader, DemoTitle } from "src/components/Demo";
import { Button } from "src/components/Button";
import { Rect } from "src/components/Rect";
import { ObserverRect } from "src/components/ObserverRect";
import { SpringAnimatedLine } from "src/components/AnimatedLine";

const LINE_CONFIG = {
  OBSERVER_TO_CONCAT: {
    x1: 100,
    x2: 100,
    y1: 120,
    y2: 250,
  },
  CONCAT_TO_SOURCE1: {
    x1: 40,
    x2: 40,
    y1: 0,
    y2: 120,
  },
  CONCAT_TO_SOURCE2: {
    x1: 160,
    x2: 160,
    y1: 0,
    y2: 120,
  },
};

export const ConcatDemo = () => {
  const [started, setStarted] = useState<boolean | null>(null);
  const [started1, setStarted1] = useState<boolean | null>(null);
  const [started2, setStarted2] = useState<boolean | null>(null);

  return (
    <div css={{ width: 200 }}>
      <DemoTitle>concat</DemoTitle>
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
            setStarted1(null);
            setStarted2(null);
          }}
          css={{ marginLeft: 5 }}
        >
          重置动画
        </Button>
      </DemoHeader>
      <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
        <SpringAnimatedLine
          {...LINE_CONFIG.OBSERVER_TO_CONCAT}
          stroke={COLORS.GREEN}
          started={started}
          onReset={() => {
            console.log("onreset concat");
            setStarted1(true);
          }}
        />
        <SpringAnimatedLine
          {...LINE_CONFIG.CONCAT_TO_SOURCE1}
          stroke={COLORS.GREEN}
          started={started1}
          onReset={() => {
            console.log("onreset source1");
          }}
        />
        <SpringAnimatedLine
          {...LINE_CONFIG.CONCAT_TO_SOURCE2}
          stroke={COLORS.GREEN}
          started={started2}
          onReset={() => {
            console.log("onreset source2");
          }}
        />
        <Rect width={80} height={40} text={"Source1$"} />
        <Rect width={80} height={40} x={120} text={"Source2$"} />
        <Rect width={200} height={40} y={120} text={"Concat$"} />
        <ObserverRect />
      </svg>
      <DemoFooter />
    </div>
  );
};
