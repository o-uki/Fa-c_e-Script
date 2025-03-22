import faces from "./faces.js";

const fn = process.argv[2] ?? "./sample.faces";
const src = fs.readFileSync(fn, "utf-8");
faces(src);
