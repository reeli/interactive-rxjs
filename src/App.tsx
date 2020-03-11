import React from "react";
import { css, Global } from "@emotion/core";
import { SubscribeDemo } from "src/examples/SubscribeDemo";
import { CompleteDemo } from "src/examples/CompleteDemo";
import { ErrorDemo } from "src/examples/ErrorDemo";
import { ConcatDemo } from "src/examples/ConcatDemo";
import { FilterDemo } from "src/examples/FilterDemo";
import { MapDemo } from "src/examples/MapDemo";
import { Nav } from "src/components/Nav";
import { Link } from "src/components/Link";
import { SubjectDemo } from "src/examples/SubjectDemo";
import { ColdObservableDemo } from "src/examples/ColdObservableDemo";
import { HotObservableDemo } from "src/examples/HotObservableDemo";

const asideStyles = css({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: 200,
  padding: "2.5rem",
  boxShadow: "0 5px 4px #888",
});

export const App = () => {
  return (
    <>
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
        <aside css={asideStyles}>
          <Nav />
        </aside>
        <main css={{ padding: 25, width: 980, marginLeft: 280 }}>
          <section>
            <Link id="basic" href={"#basic"} variant={"h2"}>
              基础部分
            </Link>
            <div css={{ display: "flex" }}>
              <SubscribeDemo />
              <CompleteDemo />
              <ErrorDemo />
            </div>
          </section>
          <section>
            <Link id={"operator"} href={"#operator"} variant={"h2"}>
              操作符
            </Link>
            <ConcatDemo />
            <FilterDemo />
            <MapDemo />
          </section>
          <section>
            <Link id="multicast" href={"#multicast"} variant={"h2"}>
              多播
            </Link>
            <SubjectDemo />
            <ColdObservableDemo />
            <HotObservableDemo />
          </section>
        </main>
      </div>
    </>
  );
};
