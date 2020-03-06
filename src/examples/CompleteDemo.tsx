import React, { useState } from "react";
import { Spring } from "react-spring/renderprops-universal";
import { map } from "lodash";
import { COLORS } from "src/style";

const data = ["1", "2", "3"];

export const CompleteDemo = () => {
  const [resetNumber, setResetNumber] = useState(0);

  return (
    <div css={{ width: 200 }}>
      <div onClick={() => setResetNumber(resetNumber + 1)}>Start Animation</div>
      <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
        <line x1={100} x2={100} y1={50} y2={250} stroke={COLORS.BLACK} strokeWidth={2} />
        {map(data, (text, i) => (
          <Spring
            from={{ y: 16 }}
            to={{
              y: resetNumber ? 220 - i * 30 : 16,
            }}
            delay={i * 1500}
            reset={!!resetNumber}
            key={i}
            onRest={()=>{
              console.log("test")
            }}
          >
            {styles => (
              <g transform={`translate(100, ${styles.y})`}>
                <circle cx="0" cy="0" r="15" fill={COLORS.WHITE} strokeWidth={2} stroke={COLORS.BLACK} />
                <text x={0} y={6} css={{ fontSize: "2rem" }} textAnchor={"middle"}>
                  {text}
                </text>
              </g>
            )}
          </Spring>
        ))}
        <g>
          <rect x={0} y={0} width={200} height={50} fill={COLORS.OBSERVABLE} />
          <text x={100} y={25} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
            可被观察的对象
          </text>
        </g>
        <g>
          <rect x={0} y={250} width={200} height={50} fill={COLORS.OBSERVER} />
          <text x={100} y={275} css={{ fontSize: "1.4rem" }} textAnchor={"middle"}>
            观察者
          </text>
        </g>
      </svg>
    </div>
  );
};
