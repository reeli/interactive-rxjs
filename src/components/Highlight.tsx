import React, { useEffect, useRef } from "react";
import { highlightBlock } from "highlight.js";
import { prettifyCode } from "src/utils";

export const Highlight: React.FC<{ children: string }> = ({ children }) => {
  const preEl = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (preEl.current) {
      highlightBlock(preEl.current);
    }
  }, []);

  return (
    <pre css={{ flex: 1, height: 300, marginLeft: 100 }} ref={preEl}>
      {prettifyCode(children)}
    </pre>
  );
};
