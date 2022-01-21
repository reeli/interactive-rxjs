import {COLORS} from "src/style";
import {animated} from "react-spring";
import {isFunction} from "lodash";
import {FC} from "react";

const CIRCLE_CONFIG = {
    radius: 15,
    stroke: COLORS.BLACK,
    strokeWidth: 2,
    animateY: 220,
    fill: COLORS.WHITE,
};

type TTextFn = () => string | number;

interface ICircleProps {
    text?: TTextFn | string | number;
    r?: number;
    fill?: string;
    strokeWidth?: number;
    translateX?: number;
    translateY?: number;
    stroke?: string;
}

export const Circle: FC<ICircleProps> = animated(
    ({
         r = CIRCLE_CONFIG.radius,
         fill = CIRCLE_CONFIG.fill,
         strokeWidth = CIRCLE_CONFIG.strokeWidth,
         text,
         translateX = 100,
         translateY = 0,
         stroke = CIRCLE_CONFIG.stroke,
         ...others
     }) => (
        <g transform={`translate(${translateX}, ${translateY})`} {...others}>
            <circle cx="0" cy="0" r={r} fill={fill} strokeWidth={strokeWidth} stroke={stroke}/>
            <text x={0} y={CIRCLE_CONFIG.radius / 2} textAnchor={"middle"} css={{fontSize: "2rem"}}>
                {isFunction(text) ? text() : text}
            </text>
        </g>
    ),
);
