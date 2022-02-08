import cheerio from "cheerio";
import fs from "fs";
import path from "path";

const HTML_PATH = path.resolve(process.cwd(), "public/index.html");
const fileStr = fs.readFileSync(HTML_PATH, "utf-8");
const $ = cheerio.load(fileStr);

$("head").prepend("<base href='https://reeli.github.io/interactive-rxjs/'/>");

fs.writeFileSync(HTML_PATH, $.html());
