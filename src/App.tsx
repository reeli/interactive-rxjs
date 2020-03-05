import React from "react";
import { css, Global } from "@emotion/core";
import { SubscribeDemo } from "src/examples/SubscribeDemo";

export const App = () => {
  return (
    <div css={{ padding: 25 }}>
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
      <SubscribeDemo />
    </div>
  );
};
