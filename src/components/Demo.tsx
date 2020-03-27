import React from "react";

export const DemoWrapper: React.FC = ({ children }) => (
  <div css={{ padding: "1rem 0", marginRight: "1.5rem" }}>{children}</div>
);

export const DemoHeader: React.FC = ({ children }) => <div css={{ height: 50 }}>{children}</div>;

export const DemoFooter: React.FC = ({ children }) => <div css={{ maxWidth: 200, height: 100 }}>{children}</div>;

export const DemoTitle: React.FC = ({ children }) => (
  <p
    css={{
      fontSize: "1.8rem",
      margin: "0 0 1rem",
    }}
  >
    {children}
  </p>
);
