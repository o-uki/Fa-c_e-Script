import faces from "./faces.js";

const fn = Deno.args[0] ?? "./sample.faces";
const src = await Deno.readTextFile(fn);
faces(src, "jsInHtml");
