// モジュール読み込み
const path = require("path");
const fs = require("fs");

// Fa(c_e)Script実行関数
module.exports = (file) => {
    (() => {
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
                ["add", "(^ω^)⊃"],
                ["subtract", "(-ε-)⊃"],
                ["times", "(>ω<)⊃"],
                ["divided", "(TεT)⊃"],
                ["equal", "(>_<)⊃"],
                ["moreEqual", "(>_O)⊃"],
                ["lessEqual", "(O_<)⊃"],
                ["more", "(>xO)⊃"],
                ["less", "(Ox<)⊃"],
                ["trueFalseInversion", "(.^.)⊃"],
                ["minus", "('^;)⊃"],
                ["absolute", "(O∇O)⊃"],
                ["unicode", "(◕-◕)⊃"],
                ["join", "(>◡<)⊃"],
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
                    if (typeof operands[0] === "number" && typeof operands[1] === "number") {
                        return operands[0] + operands[1];
                    }
                }],
                ["subtract", 2, (operands) => {
                    return operands[0] - operands[1];
                }],
                ["times", 2, (operands) => {
                    return operands[0] * operands[1];
                }],
                ["divided", 2, (operands) => {
                    return operands[0] / operands[1];
                }],
                ["equal", 2, (operands) => {
                    if (operands[0] === operands[1]) {
                        console.log("a");
                        return 1;
                    } else {
                        return 0;
                    }
                }],
                ["moreEqual", 2, (operands) => {
                    if (operands[0] >= operands[1]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }],
                ["lessEqual", 2, (operands) => {
                    if (operands[0] <= operands[1]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }],
                ["more", 2, (operands) => {
                    if (operands[0] > operands[1]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }],
                ["less", 2, (operands) => {
                    if (operands[0] < operands[1]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }],
                ["trueFalseInversion", 1, (operands) => {
                    if (operands[0] > 0) {
                        return 0;
                    } else {
                        return 1;
                    }
                }],
                ["minus", 1, (operands) => {
                    return -operands[0];
                }],
                ["absolute", 1, (operands) => {
                    return Math.abs(operands[0]);
                }],
                ["unicode", 1, (operands) => {
                    return String.fromCharCode(operands[0]);
                }],
                ["join", 2, (operands) => {
                    let joinedValue = operands.slice(0, 2).join("");

                    if (isNaN(Number(joinedValue))) {
                        return joinedValue;
                    } else {
                        return Number(joinedValue);
                    }
                }],
                ["variableGet", 1, (operands) => {
                    for (let i = 0; i < variables.length; i++) {
                        if (operands[0] === variables[i][0]) {
                            return variables[i][1];
                        }
                    }
                }]
            ];

            // エラーの配列とエラーの処理をする関数
            let errors = [
                ["syntax", "(#ˋзˊ)੭"],
                ["operator", "(;°~°)∂"],
                ["command", "(ˊ•ω•)৴"]
            ]

            const getError = (errorType) => {
                for (let i = 0; i < errors.length; i++) {
                    if (errorType === errors[i][0]) {
                        console.log("\u001b[31m" + errors[i][1] + "\u001b[0m");
                        process.exit(1);
                    }
                }
            }

            // 字句解析してトークンの名前を並べる
            const tokenNames = [];

            for (let i = 0; i < sourceCode.length; i++) {
                let isToken = false;
                for (let j = 0; j < tokens.length; j++) {
                    if (sourceCode.substring(i, i + tokens[j][1].length) === tokens[j][1]) {
                        isToken = true;
                        if (!(tokens[j][0] === "void")) {
                            tokenNames.push(tokens[j][0]);
                        }

                        i = i + tokens[j][1].length - 1;
                    }
                }
                if (!(isToken)) {
                    getError("syntax");
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

            // 演算子の処理する関数
            const argumentOperate = (i) => {
                const commandName = commands[i].command;
                let  commandArguments = commands[i].arguments;

                for (let j = commandArguments.length - 1; j >= 0; j--) {
                    if (commandArguments[j].length > 1) {
                        let operands = [];
                        let operator = operators[commandArguments[j].slice(-2)[0]];

                        if (typeof operator != "undefined") {
                            for (let k = 0; k < operator[1]; k++) {
                                if (typeof commandArguments[j + k] === "undefined") {
                                    getError("operator");
                                }
                                operands.push(commandArguments[j + k].slice(-1)[0]);
                            }
    
                            commandArguments[j][commandArguments[j].length - 1] = operator[2](operands);
                            commandArguments[j].splice(-2, 1);
                            commandArguments.splice(j + 1, operator[1] - 1);
                            j = commandArguments.length;
                        }
                    }
                }

                commands[i].arguments = [].concat(...commands[i].arguments);
                commandArguments = commands[i].arguments;

                return [commandName, commandArguments];
            }

            // 引数の指定が足りなかったらエラーを吐く関数
            const argumentGetError = (arguments, number) => {
                if (arguments.length != number) {
                    getError("command");
                }
            }

            // 条件分岐と繰り返し文の処理
            for (let i = 0; i < commands.length; i++) {
                if (typeof commands[i] != "undefined") {
                    if (commands[i].command === "if") { // 条件分岐
                        const commandArguments = argumentOperate(i)[1];
                        argumentGetError(commandArguments, 2);
    
                        if (commandArguments[0] > 0) { // 真なら
                            commands.splice(i, 1);
                            i--;
                        } else { // 偽なら
                            commands.splice(i, 1 + commandArguments[1]);
                            i = i - 1 - commandArguments[1];
                        }
                    } else if (commands[i].command === "for") { // 繰り返し
                        const commandArguments = argumentOperate(i)[1];
                        argumentGetError(commandArguments, 2);
    
                        const loopRange = commandArguments[0];
                        const loopCommands = commands.slice(i + 1, i + commandArguments[1] + 1);
    
                        commands.splice(i, 1);
    
                        // 命令を繰り返して追加
                        for (let j = 0; j < loopRange - 1; j++) {
                            commands.splice(i + loopCommands.length * (j + 1), 0, ...structuredClone(loopCommands));
                        }
    
                        i--;
                    } else if (commands[i].command === "variableDeclare") {
                        const commandArguments = argumentOperate(i)[1];
                        argumentGetError(commandArguments, 2);

                        variables.push([commandArguments[0], commandArguments[1]]);
                    } else if (commands[i].command === "variableDefine") {
                        const commandArguments = argumentOperate(i)[1];
                        argumentGetError(commandArguments, 2);

                        for (let j = 0; j < variables.length; j++) {
                            if (commandArguments[0] === variables[j][0]) {
                                variables[j][1] = commandArguments[1];
                            }
                        }
                    }
                }
            }

            // 順番に命令を実行
            for (let i = 0; i < commands.length; i++) {
                const commandName = argumentOperate(i)[0];
                const commandArguments = argumentOperate(i)[1];

                if (commandName === "print") {
                    console.log(...commandArguments);
                }
            }
        }
    })();
}