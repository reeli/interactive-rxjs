import React, {useRef, useState} from "react";
import {COLORS} from "src/style";
import {DemoFooter, DemoHeader, DemoTitle} from "src/components/Demo";
import {Button} from "src/components/Button";
import {Rect} from "src/components/Rect";
import {ObserverRect} from "src/components/ObserverRect";
import {AnimatedLine, useAnimatedLine} from "src/components/AnimatedLine";
import {useChain, useSpring} from "react-spring";
import {Circle} from "src/components/Circle";
import {isNull} from "lodash";
import { Highlight } from "src/components/Highlight";

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
    const [isSource1RefComplete, setIsSource1RefComplete] = useState<boolean | null>(null);
    const [isSource2RefComplete, setIsSource2RefComplete] = useState<boolean | null>(null);
    const [startSource1, setStartSource1] = useState<boolean | null>(null);
    const [startSource2, setStartSource2] = useState<boolean | null>(null);

    const concatRef = useRef<any>();
    const styleConcat = useAnimatedLine({
        y1: LINE_CONFIG.OBSERVER_TO_CONCAT.y1,
        y2: LINE_CONFIG.OBSERVER_TO_CONCAT.y2,
        started,
        elementRef: concatRef,
    });

    const source1Ref = useRef<any>();
    const styleSource1 = useAnimatedLine({
        y1: LINE_CONFIG.CONCAT_TO_SOURCE1.y1,
        y2: LINE_CONFIG.CONCAT_TO_SOURCE1.y2,
        started,
        elementRef: source1Ref,
        onReset: () => {
            setStartSource1(true);
        },
    });

    const source2Ref = useRef<any>();
    const styleSource2 = useAnimatedLine({
        y1: LINE_CONFIG.CONCAT_TO_SOURCE2.y1,
        y2: LINE_CONFIG.CONCAT_TO_SOURCE2.y2,
        started: isSource1RefComplete,
        elementRef: source2Ref,
        onReset: () => {
            setStartSource2(true);
        },
    });

    useChain(started && !startSource1 ? [concatRef, source1Ref] : [source1Ref, concatRef], [0, 0.5, 1.2]);
    useChain([source2Ref], [0.5]);

    const source1CircleStyles: any = useSpring({
        from: {x: 40, y: 16},
        to: async (next: any) => {
            if (isSource1RefComplete) {
                await next({x: 100, y: 230});
            } else if (startSource1) {
                await next({x: 40, y: 140, config: {duration: 1000}});
                await next({x: 100, y: 140, config: {duration: 10}});
                await next({x: 100, y: 230, config: {duration: 1000}});
            } else {
                await next({x: 40, y: 16});
            }
        },
        onRest: () => {
            if (!isNull(startSource1)) {
                setIsSource1RefComplete(true);
            }
        }
    });

    const source2CircleStyles: any = useSpring({
        from: {x: 160, y: 16},
        to: async (next: any) => {
            if (isSource2RefComplete) {
                await next({x: 100, y: 200});
            } else if (startSource2) {
                await next({x: 160, y: 140, config: {duration: 1000}});
                await next({x: 100, y: 140, config: {duration: 10}});
                await next({x: 100, y: 200, config: {duration: 1000}});
            } else {
                await next({x: 160, y: 16});
            }
        },
        onRest: () => {
            if (!isNull(startSource2)) {
                setIsSource2RefComplete(true);
            }
        }
    });

    return (
        <div>
            <DemoTitle>concat</DemoTitle>
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
                        setIsSource1RefComplete(null);
                        setIsSource2RefComplete(null);
                        setStartSource1(null);
                        setStartSource2(null);
                    }}
                    css={{marginLeft: 5}}
                >
                    重置动画
                </Button>
            </DemoHeader>
            <div css={{display: "flex"}}>
                <div css={{width: 200}}>
                    <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
                        <AnimatedLine
                            {...LINE_CONFIG.OBSERVER_TO_CONCAT}
                            stroke={isSource2RefComplete ? COLORS.GREY : COLORS.GREEN}
                            style={styleConcat}
                        />
                        <AnimatedLine
                            {...LINE_CONFIG.CONCAT_TO_SOURCE1}
                            stroke={isSource1RefComplete ? COLORS.GREY : COLORS.GREEN}
                            style={styleSource1}
                        />
                        <AnimatedLine
                            {...LINE_CONFIG.CONCAT_TO_SOURCE2}
                            stroke={isSource2RefComplete ? COLORS.GREY : COLORS.GREEN}
                            style={styleSource2}
                        />
                        <Circle text={"1"} translateX={source1CircleStyles.x} translateY={source1CircleStyles.y}/>
                        <Circle text={"2"} translateX={source2CircleStyles.x} translateY={source2CircleStyles.y}/>
                        <Rect width={80} height={40} text={"Source1$"}/>
                        <Rect width={80} height={40} x={120} text={"Source2$"}/>
                        <Rect width={200} height={40} y={120} text={"Concat$"}/>
                        <ObserverRect/>
                    </svg>
                </div>

                <Highlight>
                    <code css={{flex:1, height: 300, marginLeft: 25}}>
                        {`
                                        import { concat, of } from "rxjs";
                                    
                                        const source1$ = of(["1"]);
                                        const source2$ = of(["2"]);
                                        const source$ = concat(source1$, source2$);
                                    
                                        source$.subscribe(console.log);
                                    `}
                    </code>
                </Highlight>
            </div>
            <DemoFooter/>
        </div>
    );
};
