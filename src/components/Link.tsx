import React, { AnchorHTMLAttributes } from "react";
import { css } from "@emotion/core";
import { COLORS } from "src/style";

const linkStyles = css({
  color: COLORS.BLACK,
  fontSize: "1.6rem",
  display: "block",
  textDecoration: "none",
});

const styles = {
  body: {
    fontSize: "1.4rem",
  },
  h2: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
};

interface ILinkProps extends AnchorHTMLAttributes<any> {
  variant?: "body" | "h2";
}

export const Link: React.FC<ILinkProps> = ({ children, variant = "body", ...otherProps }) => (
  <a {...otherProps} css={[linkStyles, styles[variant]]}>
    {children}
  </a>
);
