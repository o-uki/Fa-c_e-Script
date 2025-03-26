// v1.2.0

const faces_isNode = 
typeof process !== "undefined" &&
process.versions != null &&
process.versions.node != null &&
typeof Deno === "undefined";

let faces_readline, faces_inputFunction;
if (faces_isNode) {
    faces_readline = await import("readline");

    faces_inputFunction = () => {
        return new Promise((resolve) => {
            const rl = faces_readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            rl.question("> ", (answer) => {
                resolve(answer);
                rl.close();
            });
        });
    };
} else {
    faces_inputFunction = () => {
        return new Promise((resolve) => {
            resolve(prompt(">"));
        })
    };
}

// Fa(c_e)Script実行関数
export default (sourceCode, output = console.log, input = faces_inputFunction) => {
    let facesError = false;

    try {
        //　トークンの配列
        const tokens = [
            ["void", " "],
            ["void", "\r"],
            ["void", "\n"],
            ["void", "\t"],
            ["binaryZero", "(-_-)"],
            ["binaryOne", "(o_o)"],
            ["end", "L(-.<)"],
            ["separate", "⊂(¯^¯)⊃"],
            ["bracketLeft", "(•ω•)/"],
            ["bracketRight", "\\(•ω•)"],
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
            ["length", "(-=-)⊃"],
            ["random", "(▓▭▒)⊃"],
            ["print", "('O')⅃"],
            ["if", "(¯^°)⅃"],
            ["for", "(°д°)⅃"],
            ["variableDeclare", "(°∇°)⅃"],
            ["variableDefine", "('∇')⅃"],
            ["variableGet", "('ω')⊃"],
            ["input", "(ˇoˇ)⅃"]
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
            ["length", 1, (operands) => {
                return String(operands[0]).length;
            }],
            ["random", 1, (operands) => {
                return Math.random() * operands[0];
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
                    facesError = true;
                    output(errors[i][1]);
                    throw "getError";
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
        
        // 値を数字に変換して演算子と引数として並べる
        let commands = [];

        (() => {
            let commandTemplate = {
                command: "",
                arguments: [],
                nest: 0
            };
            let binaryBits = [];
            
            let commandOperators = [];

            for (let i = 0; i < tokenNames.length; i++) { // 命令を一つずつ引数と一緒にまとめていく
                if (commandTemplate.command === "" && !(tokenNames[i] === "bracketLeft" || tokenNames[i] === "bracketRight")) {
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
                        } if (tokenNames[i] === "bracketLeft") { // 括弧
                            commandTemplate.nest++;
                        } if (tokenNames[i] === "bracketRight") {
                            commandTemplate.nest--;
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
        const argumentGetError = (commandArguments, number) => {
            if (commandArguments.length != number) {
                getError("command");
            }
        }

        const getCommandScope = () => {
            const commandNest = commands[0].nest;
    
            for (let i = 1; i < commands.length; i++) {
                if (commands[i].nest <= commandNest) {
                    return i;
                }
                if (i === commands.length - 1) {
                    return i + 1;
                }
            }
        }

        // 命令文を一つずつ実行
        async function commandsRun() {
            while (!(commands.length === 0)) {
                const commandName = commands[0].command;
                const commandArguments = argumentOperate(0)[1];
    
                if (typeof commands[0] != "undefined") {
                    if (commandName === "print") {
    
                        output(...commandArguments);
    
                        commands.shift();
                    } else if (commandName === "if") { // 条件分岐
                        argumentGetError(commandArguments, 1);

                        if (commandArguments[0] > 0) { // 真なら
                            commands.shift();
                        } else { // 偽なら
                            commands.splice(0, getCommandScope());
                        }
                    } else if (commandName === "for") { // 繰り返し
                        argumentGetError(commandArguments, 1);
    
                        const loopRange = commandArguments[0];
                        const commandScope = commands.slice(1, getCommandScope());
    
                        // 命令を繰り返して追加
                        for (let i = 0; i < loopRange - 1; i++) {
                            commands.splice(commandScope.length * (i + 1) + 1, 0, ...structuredClone(commandScope));
                        }
    
                        commands.shift();
                    } else if (commandName === "variableDeclare") {
                        argumentGetError(commandArguments, 2);
    
                        variables.push([commandArguments[0], commandArguments[1]]);
                        
                        commands.shift();
                    } else if (commandName === "variableDefine") {
                        argumentGetError(commandArguments, 2);
    
                        for (let i = 0; i < variables.length; i++) {
                            if (commandArguments[0] === variables[i][0]) {
                                variables[i][1] = commandArguments[1];
                            }
                        }
    
                        commands.shift();
                    } else if (commandName === "input") {
                        argumentGetError(commandArguments, 1);

                        const inputValue = await input();
                        if (isNaN(Number(inputValue))) {
                            variables.push([commandArguments[0], inputValue]);
                        } else {
                            variables.push([commandArguments[0], Number(inputValue)]);
                        }
                        
                        commands.shift();
                    }
                }
            }
        }

        commandsRun();
    } catch (error) {
        if (!(facesError)) {
            console.error(error);
        }
    }
};
