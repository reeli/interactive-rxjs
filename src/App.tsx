import React from "react";
import { css, Global } from "@emotion/core";
import { SubscribeDemo } from "src/examples/SubscribeDemo";
import { CompleteDemo } from "src/examples/CompleteDemo";
import { DemoWrapper } from "src/components/Demo";
import { ErrorDemo } from "src/examples/ErrorDemo";

export const App = () => {
  return (
    <div css={{ display: "flex", justifyContent: "center" }}>
      <div css={{ padding: 25, width: 980 }}>
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
          <h1>基础部分</h1>
          <div css={{ display: "flex", alignItems: "flex-end" }}>
            <DemoWrapper>
              <SubscribeDemo />
            </DemoWrapper>
            <DemoWrapper>
              <CompleteDemo />
            </DemoWrapper>
            <DemoWrapper>
              <ErrorDemo />
            </DemoWrapper>
          </div>
        </section>
        <section>
          <h1>操作符</h1>
          <DemoWrapper>
            <div>合并数据流</div>
          </DemoWrapper>
        </section>
        <section>
          <h1>单播和多播</h1>
        </section>
        <section>
          <h1>Hot Observable 与 Cold Observable</h1>
        </section>
      </div>
    </div>
  );
};
