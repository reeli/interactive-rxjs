import React from "react";
import {css, Global} from "@emotion/core";
import {SubscribeDemo} from "src/examples/SubscribeDemo";
import {CompleteDemo} from "src/examples/CompleteDemo";
import {DemoWrapper} from "src/components/Demo";
import {ErrorDemo} from "src/examples/ErrorDemo";
import {ConcatDemo} from "src/examples/ConcatDemo";
import {FilterDemo} from "src/examples/FilterDemo";
import {MapDemo} from "src/examples/MapDemo";
import {Link} from "src/components/Link";

const secondaryLinkStyles = css({
    marginLeft: "1rem"
});

const asideStyles = css({
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    width: 200,
    padding: "2.5rem 0",
    boxShadow: "0 5px 4px #888"
});

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
            <aside css={asideStyles}>
                <div>
                    <Link href={"#basic"}>基础部分</Link>
                    <div css={secondaryLinkStyles}>
                        <Link href={"#subscribe-and-unsubscribe"}>subscribe and unsubscribe</Link>
                        <Link href={"#complete"}>complete</Link>
                        <Link href={"#error"}>error</Link>
                    </div>
                </div>
                <div>
                    <Link href={"#operator"}>操作符</Link>
                    <div css={secondaryLinkStyles}>
                        <Link href={"#create"}>创建数据流</Link>
                        <Link href={"#merge"}>合并数据流</Link>
                        <Link href={"#filter"}>过滤数据流</Link>
                        <Link href={"#map"}>转化数据流</Link>
                    </div>
                </div>
            </aside>
            <main css={{padding: 25, width: 980, marginLeft: 240}}>
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
                        <Link id="basic" href={"#basic"}>
                            基础部分
                        </Link>
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
                        <Link id={"operator"} href={"#operator"}>
                            操作符
                        </Link>
                    </h1>
                    <DemoWrapper>
                        <Link id="merge" href={"#merge"}>
                            合并数据流
                        </Link>
                        <ConcatDemo/>
                    </DemoWrapper>
                    <DemoWrapper>
                        <Link id="filter" href={"#merge"}>
                            过滤数据流
                        </Link>
                        <FilterDemo/>
                    </DemoWrapper>
                    <DemoWrapper>
                        <Link id="map" href={"#merge"}>
                            转化数据流
                        </Link>
                        <MapDemo/>
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
