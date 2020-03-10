import parserTS from "prettier/parser-typescript";
import prettier from "prettier/standalone";

export const prettifyCode = (code: string) =>
    prettier.format(code, {
        printWidth: 120,
        arrowParens: "always",
        trailingComma: "all",
        parser: "typescript",
        plugins: [parserTS]
    });
