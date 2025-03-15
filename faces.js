// モジュール読み込み
const path = require("path");
const fs = require("fs");

// Fa(c_e)Script実行関数
const faces = (file) => {
    // ファイル読み込み
    if (path.extname(file) === ".faces") {
        //　ソースコード
        const sourceCode = fs.readFileSync(file, "utf-8");

        //　トークンの配列
        const tokens = [
            ["void", " "],
            ["void", "\r"],
            ["void", "\n"],
            ["binaryZero", "(-_-)"],
            ["binaryOne", "(o_o)"],
            ["end", "L(-.<)"],
            ["separate", "⊂(¯^¯)⊃"],
            ["print", "('O')⅃"]
        ];

        // 字句解析関数
        const lexical = (sourceCode) => {
            const sourceCodeTokens = [];

            for (let i = 0; i < sourceCode.length; i++) {
                for (let j = 0; j < tokens.length; j++) {
                    if (sourceCode.substr(i, tokens[j][1].length) === tokens[j][1]) {
                        if (!(tokens[j][0] === "void")) {
                            sourceCodeTokens.push(tokens[j][0]);
                        }

                        i = i + tokens[j][1].length - 1;
                        break;
                    }
                }
            }

            return sourceCodeTokens;
        };

        console.log(lexical(sourceCode));
    }
};

faces("sample.faces");