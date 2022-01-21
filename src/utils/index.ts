import {format} from "prettier";

export const prettifyCode = (code: string) =>
  format(code, {
    printWidth: 120,
    arrowParens: "always",
    trailingComma: "all",
    parser: "typescript",
  });
