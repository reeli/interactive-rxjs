import React, {ReactElement, useEffect, useRef} from "react";
import {highlightBlock} from "highlight.js";

export const HighlightBlock: React.FC<{ children: ReactElement }> = ({children}) => {
    const childrenRef = useRef<Node>();

    useEffect(() => {
        if (childrenRef.current) {
            highlightBlock(childrenRef.current)
        }
    }, []);

    return React.cloneElement(children, {
        ref: childrenRef
    });
}
