import React, {AnchorHTMLAttributes} from "react";
import {css} from "@emotion/core";
import {COLORS} from "src/style";

const linkStyles = css({
    color: COLORS.BLACK,
    fontSize: "1.6rem",
    display: "block",
    textDecoration:"none"
});

export const Link: React.FC<AnchorHTMLAttributes<any>> = ({children, ...otherProps}) => <a {...otherProps} css={linkStyles}>{children}</a>
