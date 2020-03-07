import React, {useState} from "react";
import {COLORS} from "src/style";
import {DemoFooter, DemoHeader, DemoTitle} from "src/components/Demo";
import {Button} from "src/components/Button";
import {Rect} from "src/components/Rect";
import {ObserverRect} from "src/components/ObserverRect";
import {AnimatedLine} from "src/components/AnimatedLine";
import {Circle} from "src/components/Circle";
import {map} from "lodash";
import {Spring} from "react-spring/renderprops-universal";

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

const data = [1, 2, 3, 4, 5];

export const FilterDemo = () => {
    const [started, setStarted] = useState<boolean | null>(null);
    const [completed, setCompleted] = useState<boolean | null>(null);

    return (
        <div css={{width: 200}}>
            <DemoTitle>filter</DemoTitle>
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
                    }}
                    css={{marginLeft: 5}}
                >
                    重置动画
                </Button>
            </DemoHeader>
            <svg width={"100%"} height={"100%"} viewBox={"0 0 200 300"}>
                <AnimatedLine {...LINE_CONFIG.OBSERVER_TO_FILTER} stroke={completed ? COLORS.GREY : COLORS.GREEN}/>
                <AnimatedLine {...LINE_CONFIG.FILTER_TO_SOURCE} stroke={completed ? COLORS.GREY : COLORS.GREEN}/>
                {map(data, (i) =>
                    (
                        <Spring
                            from={{y: 0}}
                            to={{y: started ? (i % 2 === 0 ? 140 : 230 - i * 10) : 0}}
                            delay={i * 800}
                            key={i}
                            config={{duration: 2000}}
                            onRest={() => {
                                if (i === data.length - 1) {
                                    setCompleted(true)
                                }
                            }}
                        >
                            {styles => <Circle translateY={styles.y} text={i}/>}
                        </Spring>
                    ))}
                <Rect width={200} height={40} y={0} text={"Source$"}/>
                <Rect width={200} height={40} y={120} text={"Concat$"}/>
                <ObserverRect/>
            </svg>
            <DemoFooter/>
        </div>
    );
};
