import React, { AnchorHTMLAttributes } from "react";
import { css } from "@emotion/react";
import { COLORS } from "src/style";

const linkStyles = css({
  color: COLORS.BLACK,
  fontSize: "1.6rem",
  display: "block",
  textDecoration: "none",
  margin: "1rem 0",
  "&:focus": {
    outline: "none",
  },
});

const styles = {
  h2: {
    fontSize: "2.6rem",
    fontWeight: "bold",
    marginBottom: "3rem",
  },
  h3: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  title: {
    fontSize: "1.8rem",
  },
  body1: {
    fontSize: "1.6rem",
  },
  body2: {
    fontSize: "1.4rem",
  },
};

interface ILinkProps extends AnchorHTMLAttributes<any> {
  variant?: "h2" | "h3" | "body1" | "body2" | "title";
}

export const Link: React.FC<ILinkProps> = ({ children, variant = "body2", ...otherProps }) => (
  <a {...otherProps} css={[linkStyles, styles[variant]]}>
    {children}
  </a>
);
