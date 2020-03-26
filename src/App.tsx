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
import { IconGithub } from "src/assets/IconGithub";
import { COLORS } from "src/style";
import { MergeDemo } from "./examples/MergeDemo";
import { PartitionDemo } from "src/examples/PartitionDemo";
import { FromEventDemo } from "src/examples/FromEventDemo";
import { IntervalDemo } from "src/examples/IntervalDemo";
import { TimerDemo } from "src/examples/TimerDemo";
import { RaceDemo } from "src/examples/RaceDemo";
import { ForkJoinDemo } from "src/examples/ForkJoinDemo";
import {ScanDemo} from "src/examples/ScanDemo";

const asideStyles = css({
  position: "fixed",
  left: 0,
  top: 0,
  bottom: 0,
  width: 200,
  padding: "2.5rem",
  boxShadow: "0 0 2px #888",
  overflowY: "scroll",
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
          <h2 css={{ marginTop: 0, marginBottom: 24 }}>用动画来学习 RxJS</h2>
          <Nav />
        </aside>

        <main css={{ padding: 25, width: 980, marginLeft: 280 }}>
          <a
            href={"https://github.com/reeli/interactive-rxjs"}
            target={"_blank"}
            title={"github"}
            css={{ marginRight: 100, position: "fixed", top: 20, right: 0 }}
          >
            <IconGithub width="100%" height="100%" fill={COLORS.BLACK} css={{ width: 24, height: 24 }} />
          </a>
          <section>
            <Link id="basic" href={"#basic"} variant={"h2"}>
              Observable and Observer
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
            <div>
              <ul css={{ listStyle: "none", padding: 0 }}>
                <li>创建数据流：from, fromEvent, interval, of, timer</li>
                <li>合并数据流：concat, merge, combineLatest, race, forkJoin</li>
                <li>过滤数据流：filter, take, throttle, debounce, ignoreElements, distinctUntilChanged</li>
                <li>转化数据流：map, partition, mergeMap, switchMap, scan, groupBy</li>
                <li>辅助类操作符：delay, observeOn</li>
              </ul>
            </div>
            <FromEventDemo />
            <IntervalDemo />
            <TimerDemo />
            <ConcatDemo />
            <MergeDemo />
            <RaceDemo />
            <ForkJoinDemo />
            <FilterDemo />
            <MapDemo />
            <PartitionDemo />
            <ScanDemo/>
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
