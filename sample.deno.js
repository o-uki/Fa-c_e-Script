import faces from "./faces.js";

const fn = Deno.args[0] ?? "./sample.faces";
const sourceCode = await Deno.readTextFile(fn);
faces(sourceCode);