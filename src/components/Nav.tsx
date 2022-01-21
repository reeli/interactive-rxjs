import { map } from "lodash";
import { Link } from "src/components/Link";
import { css } from "@emotion/react";
import { COLORS } from "src/style";

const ROUTES = [
  {
    text: "Observable",
    id: "basic",
    path: "#basic",
  },
  {
    id: "create",
    text: "创建数据流",
    path: "#create",
    routes: [
      {
        id: "fromEvent",
        text: "fromEvent",
        path: "#fromEvent",
      },
      {
        id: "interval",
        text: "interval",
        path: "#interval",
      },
      {
        id: "timer",
        text: "timer",
        path: "#timer",
      },
    ],
  },
  {
    id: "merge",
    text: "合并数据流",
    path: "#merge",
    routes: [
      {
        id: "concat",
        text: "concat",
        path: "#concat",
      },
      {
        id: "merge",
        text: "merge",
        path: "#merge",
      },
      {
        id: "combineLatest",
        text: "combineLatest",
        path: "#combineLatest",
      },
      {
        id: "race",
        text: "race",
        path: "#race",
      },
      {
        id: "forkJoin",
        text: "forkJoin",
        path: "#forkJoin",
      },
    ],
  },
  {
    id: "filter",
    text: "过滤数据流",
    path: "#filter",
    routes: [
      {
        id: "filter",
        text: "filter",
        path: "#filter",
      },
      {
        id: "take",
        text: "take",
        path: "#take",
      },
    ],
  },
  {
    id: "map",
    text: "转化数据流",
    path: "#map",
    routes: [
      {
        id: "map",
        text: "map",
        path: "#map",
      },
      {
        id: "partition",
        text: "partition",
        path: "#partition",
      },
      {
        id: "mergeMap",
        text: "mergeMap",
        path: "#mergeMap",
      },
      {
        id: "switchMap",
        text: "switchMap",
        path: "#switchMap",
      },
      {
        id: "scan",
        text: "scan",
        path: "#scan",
      },
    ],
  },
  {
    id: "utility",
    text: "辅助类操作符",
    path: "#utility",
    routes: [
      {
        id: "delay",
        text: "delay",
        path: "#delay",
      },
      {
        id: "observeOn",
        text: "observeOn",
        path: "#observeOn",
      },
    ],
  },
  {
    id: "multicast",
    text: "多播",
    path: "#multicast",
    routes: [
      {
        id: "coldObservable",
        text: "Cold Observable",
        path: "#coldObservable",
      },
      {
        id: "hotObservable",
        text: "Hot Observable",
        path: "#hotObservable",
      },
      {
        id: "subject",
        text: "Subject",
        path: "#subject",
      },
      {
        id: "behaviorSubject",
        text: "BehaviorSubject",
        path: "#behaviorSubject",
      },
    ],
  },
];

const secondaryLinkStyles = css({
  marginLeft: "1rem",
});

export const Nav = () => (
  <>
    {map(ROUTES, (item, i) => (
      <div key={i}>
        <Link href={item.path}>{item.text}</Link>
        <div css={secondaryLinkStyles}>
          {map(item.routes, (route, j) => (
            <Link href={route.path} key={j} css={{ color: COLORS.TEXT_SECONDARY }}>
              {route.text}
            </Link>
          ))}
        </div>
      </div>
    ))}
    <Link
      href={"https://github.com/reeli/interactive-rxjs"}
      target={"_blank"}
      title={"github"}
      css={{ marginTop: 100, marginRight: 100, textDecoration: "underline" }}
    >
      访问 Github
    </Link>
  </>
);
