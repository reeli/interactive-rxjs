import React from "react";
import {css, Global} from "@emotion/core";
import {SubscribeDemo} from "src/examples/SubscribeDemo";
import {CompleteDemo} from "src/examples/CompleteDemo";
import {DemoWrapper} from "src/components/Demo";
import {ErrorDemo} from "src/examples/ErrorDemo";
import {ConcatDemo} from "src/examples/ConcatDemo";

export const App = () => {
    return (
        <div
            css={{
                display: "flex",
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
            }}
        >
            <aside css={{position: "fixed", left: 0, top: 0, bottom: 0, width: 200}}>
                <a href={"#basic"}>基础部分</a>
                <a href={"#operator"}>操作符</a>
            </aside>
            <main css={{padding: 25, flex: 1, marginLeft: 200}}>
                <Global
                    styles={css`
            html {
              font-size: 10px;
            }
            body {
              font-family: "Roboto", "Helvetica", "Arial", sans-serif;
              font-size: 1.4rem;
            }
          `}
                />
                <section>
                    <h1>
                        <a id="basic" href={"#basic"}>
                            基础部分
                        </a>
                    </h1>
                    <div css={{display: "flex", alignItems: "flex-end"}}>
                        <DemoWrapper>
                            <SubscribeDemo/>
                        </DemoWrapper>
                        <DemoWrapper>
                            <CompleteDemo/>
                        </DemoWrapper>
                        <DemoWrapper>
                            <ErrorDemo/>
                        </DemoWrapper>
                    </div>
                </section>
                <section>
                    <h1>
                        <a id={"operator"} href={"#operator"}>
                            操作符
                        </a>
                    </h1>
                    <DemoWrapper>
                        <div>合并数据流</div>
                        <ConcatDemo/>
                    </DemoWrapper>
                </section>
                <section>
                    <h1>单播和多播</h1>
                </section>
                <section>
                    <h1>Hot Observable 与 Cold Observable</h1>
                </section>
            </main>
        </div>
    );
};
