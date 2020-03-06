import React from "react";

export const DemoWrapper: React.FC = ({ children }) => <div css={{ padding: 10 }}>{children}</div>;

export const DemoHeader: React.FC = ({ children }) => <div css={{ height: 50 }}>{children}</div>;

export const DemoFooter: React.FC = ({ children }) => <div css={{ height: 100 }}>{children}</div>;
