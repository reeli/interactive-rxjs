import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";

export const Highlight: React.FC<{ children: string }> = ({ children }) => {
  const preEl = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    if (preEl.current) {
      hljs.highlightBlock(preEl.current);
    }
  }, []);

  return (
    <pre css={{ flex: 1, height: 300, marginLeft: 100, marginTop: 0, marginBottom: 0 }} ref={preEl}>
      {children}
    </pre>
  );
};
