import faces from "./faces.js";
import fs from "fs";

const fn = process.argv[2] ?? "./sample.faces";
const src = fs.readFileSync(fn, "utf-8");
faces(src);
