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
            ["add", "(>ω<)⊃"],
            ["equal", "(>v<)⊃"],
            ["minus", "('^;)⊃"],
            ["absolute", "(O∇O)⊃"],
            ["print", "('O')⅃"],
            ["if", "(°^°)⅃"],
            ["for", "(°д°)⅃"]
        ];

        // 演算子を認識して演算する関数
        const operators = [
            ["add", 2, (operands) => {
                return operands[0] + operands[1];
            }],
            ["equal", 2, (operands) => {
                if (operands[0] === operands[1]) {
                    return 1;
                } else {
                    return 0;
                }
            }],
            ["minus", 1, (operands) => {
                return -operands[0];
            }],
            ["absolute", 1, (operands) => {
                return Math.abs(operands[0]);
            }]
        ];

        const operateData = (operator) => {
            for (let i = 0; i < operators.length; i++) {
                if (operator === operators[i][0]) {
                    return [operators[i][1], operators[i][2]];
                }
            }
        };

        // 字句解析してトークンの名前を並べる
        const tokenNames = [];

        for (let i = 0; i < sourceCode.length; i++) {
            for (let j = 0; j < tokens.length; j++) {
                if (sourceCode.substring(i, i + tokens[j][1].length) === tokens[j][1]) {
                    if (!(tokens[j][0] === "void")) {
                        tokenNames.push(tokens[j][0]);
                    }

                    i = i + tokens[j][1].length - 1;
                }
            }
        }

        // 値を数字に変換して引数として並べる
        let commands = [];

        (() => {
            let commandArgument = {
                command: "",
                arguments: []
            };
            let binaryBits = [];
            
            let operatorIndex = [null, null];
            let operate = null;

            // 演算子があると演算する
            const operatedValueGet = () => {
                const operatedValue = (() => {
                    if (operatorIndex[1] != null) {
                        operatorIndex[0]--;
                        if (operatorIndex[0] === 0) {
                            let operands = [];
    
                            for (let i = 0; i < operatorIndex[1]; i++) {
                                operands.push(commands[commands.length - 1].arguments.pop());
                            }
    
                            return operate(operands);
                        }
                    }
                })();

                if (operatedValue != undefined) {
                    commands[commands.length - 1].arguments.push(operatedValue);

                    operatorIndex = [null, null];
                    operate = null;
                }
            };

            for (let i = 0; i < tokenNames.length; i++) {
                if (commandArgument.command === "") {
                    commandArgument.command = tokenNames[i];
                    commands.push(structuredClone(commandArgument));
                } else {
                    if (tokenNames[i] === "binaryZero") { // 二進数を数値に変換
                        binaryBits.push("0");
                    } else if (tokenNames[i] === "binaryOne") {
                        binaryBits.push("1");
                    } else { // 演算子と区切りと終了を処理
                        if (tokenNames[i] === "end") {
                            commands.slice(-1)[0].arguments.push(Number("0b" + binaryBits.join("")));
                            binaryBits = [];
                            commandArgument.command = "";

                            operatedValueGet();
                        } else if (tokenNames[i] != "separate") {
                            operatorIndex[0] = operateData(tokenNames[i])[0];
                            operatorIndex[1] = operateData(tokenNames[i])[0];
                            operate = operateData(tokenNames[i])[1];
                        } else {
                            commands.slice(-1)[0].arguments.push(Number("0b" + binaryBits.join("")));
                            binaryBits = [];
                            
                            operatedValueGet();
                        }
                    }
                }
            }
        })();

        // 条件分岐と繰り返し文の処理
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].command === "if") {
                if (commands[i].arguments[0] > 0) {
                    
                } else {
                    
                }
            }
        }

        console.log(commands);
    }
};

faces("sample.faces");