import {animated, useSpring} from "react-spring";
import React, {useState} from "react";
import {css} from "@emotion/core";

const rectStyles = css({
    background: "green",
    width: "100%",
    height: 50,
    color: "#222",
    margin: "0 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 4,
});

const lineStyles = css({
    borderLeft: "2px solid #000",
    width: 2,
    height: 100,
    position: "absolute",
    top: "66px",
});

const containerStyles = css({
    width: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
});

export const SubscribeDemo = () => {
    const [toggle, setToggle] = useState(false);
    const props = useSpring({height: toggle ? 100 : 0});

    return (
        <div css={[containerStyles, {transform: "rotate(180deg)"}]}>
            <div css={[rectStyles, {background: "rgb(255, 203, 70)"}]}>
                <div css={{transform: "rotate(180deg)"}}>
                    <div>观察者 Observer</div>
                    <button onClick={() => setToggle(!toggle)} css={{marginTop: 5, width: 80}}>
                        {toggle ? "取消订阅 unsubscribe" : "订阅 subscribe"}
                    </button>
                </div>
            </div>
            <animated.div css={[lineStyles]} style={props}/>
            <div css={[rectStyles, {background: "rgb(130, 215, 54)", marginTop: 100}]}>
                <div css={{transform: "rotate(180deg)"}}>可被观察对象 Observable</div>
            </div>
        </div>
    );
};
