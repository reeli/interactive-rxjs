import React, {useRef, useState} from "react";
import {COLORS} from "src/style";
import {DemoFooter, DemoHeader, DemoTitle} from "src/components/Demo";
import {Button} from "src/components/Button";
import {Rect} from "src/components/Rect";
import {ObserverRect} from "src/components/ObserverRect";
import {AnimatedLine} from "src/components/AnimatedLine";
import {Circle} from "src/components/Circle";
import {isNull, keys, map} from "lodash";
import {useSprings} from "react-spring";

const LINE_CONFIG = {
    OBSERVER_TO_FILTER: {
        x1: 100,
        x2: 100,
        y1: 120,
        y2: 250,
    },
    FILTER_TO_SOURCE: {
        x1: 100,
        x2: 100,
        y1: 0,
        y2: 120,
    },
};

let data1: any = {
    "0": 1,
    "1": 2,
    "2": 3
};

let data2: any = {
    "0": "A",
    "1": "B",
    "2": "C"
};

// 利用动画随时在 render 的特性去获取变化的值，而不是通过 setState 的方式去修改 data 的值
// TODO: 距离/duration 算出 duration 公式

const calDuration = (s1: number, s2: number, d2: number) => Math.floor(s1 * (d2 / s2));

export const MapDemo = () => {
    const [started, setStarted] = useState<boolean | null>(null);
    const [completed, setCompleted] = useState<boolean | null>(null);
    const dataRef = useRef({...data1});

    const springs = useSprings(keys(dataRef.current).length, keys(dataRef.current).map((_, i) => ({
        from: {
            y: 0,
        },
        to: async (next: any) => {
            if (started) {
                await next({y: 140});
                dataRef.current[i] = data2[i];
                await next({y: 220 - i * 10, config: {duration: calDuration(((220 - i * 10) - 140), 140, 1000)}});
            } else {
                await next({y: 0});
            }
        },
        delay: i * 500,
        config: {
            duration: 1000,
        },
        onRest: () => {
            if (!isNull(started) && isNull(completed) && i === keys(dataRef.current).length - 1) {
                // setCompleted(true);
            }
        }
    })));

    return (
        <div css={{width: 200}}>
            <DemoTitle>map</DemoTitle>
            <DemoHeader>
                <Button
                    onClick={() => {
                        setStarted(true);
                    }}
                    css={{color: COLORS.BLUE}}
                >
                    开始动画
                </Button>
                <Button
                    onClick={() => {
                        setStarted(null);
                        setCompleted(null)
                        dataRef.current = {...data1};
                    }}
                    css={{marginLeft: 5}}
                >
                    重置动画
                </Button>
            </DemoHeader>
            <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
                <AnimatedLine {...LINE_CONFIG.OBSERVER_TO_FILTER} stroke={completed ? COLORS.GREY : COLORS.GREEN}/>
                <AnimatedLine {...LINE_CONFIG.FILTER_TO_SOURCE} stroke={completed ? COLORS.GREY : COLORS.GREEN}/>
                {map(springs, (style: any, i) => <Circle translateY={style.y} key={i} text={() => dataRef.current[i]}
                />)}
                <Rect width={200} height={40} y={0} text={"Source$"}/>
                <Rect width={200} height={40} y={120} text={"Concat$"}/>
                <ObserverRect/>
            </svg>
            <DemoFooter/>
        </div>
    );
};