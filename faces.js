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
            ["parenthesisLeft", "(>_)⅃"],
            ["parenthesisRight", "L(_<)"],
            ["binaryZero", "(-_-)"],
            ["binaryOne", "(o_o)"],
            ["print", "('O')"]
        ];

        // 字句解析関数
        const lexical = (sourceCode) => {
            const sourceCodeTokens = [];

            for (let i = 0; i < sourceCode.length; i++) {
                for (let j = 0; j < tokens.length; j++) {
                    if (sourceCode.substr(i, tokens[j][1].length) === tokens[j][1]) {
                        if (!(tokens[j][0] === "void")) {
                            sourceCodeTokens.push(tokens[j]);
                        }

                        i = i + tokens[j][1].length - 1;
                    }
                }
            }

            return sourceCodeTokens;
        };

        //　抽象構文木生成関数
        const parsing = (sourceCodeTokens) => {
            const parentheses = [
                "parenthesisLeft",
                "parenthesisRight"
            ];

            for (let i = 0; sourceCodeTokens[i] != undefined; i++) {
                
            }
        };

        console.log(parsing(lexical(sourceCode)));
    }
};

faces("sample.faces");