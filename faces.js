// モジュール読み込み
const path = require("path");
const fs = require("fs");

// Fa(c_e)Script実行関数
const faces = (file) => {
    if (path.extname(file) === ".faces") {
        const sourceCode = fs.readFileSync(file, "utf-8");
        console.log(sourceCode);
    }
}

faces("sample.faces");