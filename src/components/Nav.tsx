import React from "react";
import { map } from "lodash";
import { Link } from "src/components/Link";
import { css } from "@emotion/core";

const ROUTES = [
  {
    text: "基础部分",
    id: "basic",
    path: "#basic",
    routes: [
      {
        id: "subscribe-and-unsubscribe",
        text: "subscribe and unsubscribe",
        path: "#subscribe-and-unsubscribe",
      },
      {
        id: "complete",
        text: "complete",
        path: "#complete",
      },
      {
        id: "error",
        text: "error",
        path: "#error",
      },
    ],
  },
  {
    id: "operator",
    text: "操作符",
    path: "#operator",
    routes: [
      {
        id: "create",
        text: "创建数据流",
        path: "#create",
      },
      {
        id: "merge",
        text: "合并数据流",
        path: "#merge",
      },
      {
        id: "filter",
        text: "过滤数据流",
        path: "#filter",
      },
      {
        id: "map",
        text: "转化数据流",
        path: "#map",
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
            <Link href={route.path} key={j}>
              {route.text}
            </Link>
          ))}
        </div>
      </div>
    ))}
  </>
);
