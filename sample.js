import faces from "./faces.js";
import fs from "fs";

const sourceCode = fs.readFileSync("./sample.faces", "utf-8");
faces(sourceCode);