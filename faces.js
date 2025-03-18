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
            ["if", "(¯^°)⅃"],
            ["for", "(°д°)⅃"],
            ["variableDeclare", "(°∇°)⅃"],
            ["variableDefine", "('∇')⅃"],
            ["variableGet", "('ω')⊃"]
        ];

        // 変数の配列
        let variables = [];

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
            }],
            ["variableGet", 1, (operands) => {
                for (let i = 0; i < variables.length; i++) {
                    if (operands[0] === variables[i][0]) {
                        return variables[i][1];
                    }
                }
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
            let commandTemplate = {
                command: "",
                arguments: []
            };
            let binaryBits = [];
            
            let commandOperators = [];

            for (let i = 0; i < tokenNames.length; i++) { // 命令を一つずつ引数と一緒にまとめていく
                if (commandTemplate.command === "") {
                    commandTemplate.command = tokenNames[i];
                    commands.push(structuredClone(commandTemplate));
                } else {
                    if (tokenNames[i] === "binaryZero") { // 二進数を数値に変換
                        binaryBits.push("0");
                    } else if (tokenNames[i] === "binaryOne") {
                        binaryBits.push("1");
                    } else { // 演算子と区切りと終了を処理
                        if (tokenNames[i] === "end" || tokenNames[i] === "separate") { // 終了、区切り
                            commands.slice(-1)[0].arguments.push(structuredClone(commandOperators.concat([Number("0b" + binaryBits.join(""))])));

                            binaryBits = [];
                            commandOperators = [];

                            if (tokenNames[i] === "end") {
                                for (let j = commands.slice(-1)[0].arguments.length - 1; j >= 0; j--) {
                                    
                                }

                                commandTemplate.command = "";
                            }
                        } else  { // 演算子
                            for (let j = 0; j < operators.length; j++) {
                                if (tokenNames[i] === operators[j][0]) {
                                    commandOperators.push(j);
                                }
                            }
                        }
                    }
                }
            }
        })();

        console.log(commands, commands.slice(-2)[0].arguments, commands.slice(-1)[0].arguments);

        // 条件分岐と繰り返し文の処理、変数の命令はもうしてあるので削除
        for (let i = 0; i < commands.length; i++) {
            if (commands[i].command === "if") { // 条件分岐
                if (commands[i].arguments[0] > 0) { // 真なら
                    commands.splice(i, 1);
                    i--;
                } else { // 偽なら
                    commands.splice(i, 1 + commands[i].arguments[1]);
                    i = i - 1 - commands[i].arguments[1];
                }
            } else if (commands[i].command === "for") { // 繰り返し
                const loopRange = commands[i].arguments[0];
                const loopCommands = commands.slice(i + 1, i + commands[i].arguments[1] + 1);

                commands.splice(i, 1);

                // 命令を繰り返して追加
                for (let j = 0; j < loopRange - 1; j++) {
                    commands.splice(i + loopCommands.length * (j + 1), 0, ...loopCommands);
                }

                i--;
            } else if (commands[i].command === "variableDeclare" || commands[i].command === "variableDefine") {
                commands.splice(i, 1);
                i--;
            }
        }

        // 順番に命令を実行
        for (let i = 0; i < commands.length; i++) {
            const commandName = commands[i].command;
            const commandArguments = commands[i].arguments;

            // if (commandName === "print") {
            //     console.log(...commandArguments);
            // }
        }
    }
};

faces("sample.faces");