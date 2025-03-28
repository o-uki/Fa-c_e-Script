# Fa(c_e)Script
![faces_logo](./images/faces_full_logo_background.png "faces_logo")

Fa(c_e)Script（フェイススクリプト）は、顔文字を並べてコードを記述するプログラミング言語です。

- [実行までの手順](#実行までの手順)
- [1. 値](#1-値)
- [2. 演算子](#2-演算子)
- [3. 命令文](#3-命令文)
- [4. 表示文](#4-表示文)
- [5. 変数](#5-変数)
- [6. 条件分岐文](#6-条件分岐文)
- [7. 繰り返し文](#7-繰り返し文)
- [8. エラー](#8-エラー)
- [9. 入力文](#9-その他の命令文)

## 実行までの手順

**Fa(c_e)Scriptを実行するには、ブラウザ、Node.jsまたはDenoの実行環境が必要です。**

### 1. ブラウザで実行

ブラウザで下記のページを開き、Fa(c_e)Scriptを記述し、「R(u_n)」ボタンを押します
- [Fa(c_e)Script Playground](https://o-uki.github.io/Fa-c_e-Script/)

### 2. コンソールで実行

好きな名前のFa(c_e)Scriptファイル`<fileName>.faces`を作成します。拡張子は、`.faces`です。
ここでは例として`sample.faces`とします。このファイルは先ほどのディレクトリ内に置きます。

- [Deno](https://deno.com/)を使う場合
`faces.js`があるディレクトリで下記のように実行します。
```sh
deno --allow-read https://o-uki.github.io/Fa-c_e-Script/sample.deno.js sample.faces
```

- [Node.js](https://nodejs.org/)を使う場合
リポジトリ内のJavaScriptファイル`faces.js`を同じディレクトリに置いて下記のように実行します。
```sh
node sample.js sample.faces
```

### 3. JavaScript内で使う (ブラウザ / Deno)

```js
import faces from "https://taisukef.github.io/Fa-c_e-Script/faces.js";

faces("('O')⅃(o_o)L(-.<)");
```

```sh
deno --allow-read sample.deno.js sample1.faces
```

### 4. JavaScript内で使う (Node.js)

- package.json に { "type": "module" } と設定
- faces.js を同じディレクトリに置く
```js
import faces from "./faces.js";

faces("('O')⅃(o_o)L(-.<)");
```

```sh
node sample.js
```

## 記述のルール
Fa(c_e)Scriptのソースコードは、顔文字以外の数字やアルファベットを記述することが許されていません。
また、顔文字と顔文字の間に入力されたスペースや改行は無視されます。（つまり好きなように顔文字を配置できる！）

## 1. 値
値は、`(o_o)`を1、`(-_-)`を0とする二進数で表します。

例:
```
(-_-)
(o_o)
(o_o)(o_o)
(o_o)(-_-)(-_-)(o_o)
```
```
-> 0を表します。
-> 1を表します。
-> 3を表します。
-> 9を表します。
```

`⊂(¯^¯)⊃`は複数の値を並べて記述するときに使用します。

例:
```
(-_-)⊂(¯^¯)⊃(o_o)
(o_o)(o_o)⊂(¯^¯)⊃(o_o)
(o_o)⊂(¯^¯)⊃(o_o)(-_-)⊂(¯^¯)⊃(o_o)(o_o)
```
```
-> 0,1を表します。
-> 3,1を表します。
-> 1,2,3を表します。
```

## 2. 演算子
演算子は`⊃`を（顔から見て）左手とする顔文字です。
演算子を値の直前に記述することで、その値を演算します。

`('^;)⊃`は正負反転する演算子、`(^ω^)⊃`は加算する演算子です。

例:
```
('^;)⊃(o_o)(o_o)
(^ω^)⊃(o_o)⊂(¯^¯)⊃(o_o)(-_-)
```
```
-> -3を表します。
-> 1+2、すなわち3を表します。
```

演算子が複数重なっている場合、
1. 値と演算子の列を後ろから順に
2. 演算子があれば演算する
3. 後ろに戻って(1.)から

これらを繰り返して演算します。

例:
```
(^ω^)⊃(o_o)⊂(¯^¯)⊃(^ω^)⊃(o_o)(-_-)⊂(¯^¯)⊃(o_o)(o_o)
```
```
-> 後ろから見て2+3=5、後ろに戻ってから見て1+5、すなわち6を表します。
```

### 2.1. 四則演算子
加減乗除の演算子はそれぞれ`(^ω^)⊃`、`(-ε-)⊃`、`(>ω<)⊃`、`(TεT)⊃`です。

例:
```
(^ω^)⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)(-_-)
(-ε-)⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)(-_-)
(>ω<)⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)(-_-)
(TεT)⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)(-_-)
```
```
-> 3+2、すなわち5を表します。
-> 3-2、すなわち1を表します。
-> 3*2、すなわち6を表します。
-> 3/2、すなわち1.5を表します。
```

### 2.2. 比較演算子
数値を比較する演算子`=`、`≥`、`≤`、`>`、`<`はそれぞれ`(>_<)⊃`、`(>_O)⊃`、`(O_<)⊃`、`(>xO)⊃`、`(Ox<)⊃`です。
比較の結果が真なら1、偽なら0と演算されます。

例:
```
(>_<)⊃(o_o)⊂(¯^¯)⊃(o_o)
(>_<)⊃(o_o)⊂(¯^¯)⊃(-_-)
(>_O)⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)
```
```
-> 1=1は真なので1を表します。
-> 1=0は偽なので0を表します。
-> 3≥1は真なので1を表します。
```

### 2.3. その他の演算子
| 演算子 | 被演算子数 | 演算 |
| :--- | :---: | :--- |
| `('^;)⊃` | 1 | 値の正負を反転します。 |
| `(O∇O)⊃` | 1 | 値を絶対値にします。 |
| `(.^.)⊃` | 1 | 値が1以上なら0、0以下なら1にします。 |
| `(◕-◕)⊃` | 1 | 値をUnicodeの符号とする文字にします。 |
| `(>◡<)⊃` | 2 | 値を結合します。 |
| `(-=-)⊃` | 1 | 値の長さを取得します。 |
| `(▓▭▒)⊃` | 1 | 0以上値未満の乱数を生成します。 |
| `(^o^)⊃` | 1 | 値の小数点以下を切り捨てます。 |

## 3. 命令文
`⅃`を左手とする顔文字は命令文を表します。
命令文を表す顔文字の直後に引数（命令文への入力となる値）を記述します。
`L(-.<)`は命令文の終了を表します。

## 4. 表示文
`('O')⅃`は、引数を表示する命令文です。
```
('O')⅃ <表示する値> L(-.<)
```
例:
```
('O')⅃(o_o)L(-.<)
('O')⅃(o_o)(o_o)⊂(¯^¯)⊃(o_o)L(-.<)
```
```
-> 1と表示します。
-> 3 1と表示します。
```

## 5. 変数
### 5.1. 変数の宣言
`(°∇°)⅃`は、変数の宣言と値の代入をする命令文です。
1つ目の引数は宣言する変数名、2つ目の引数は代入する値を指定します。
```
(°∇°)⅃ <変数名> ⊂(¯^¯)⊃ <代入する値> L(-.<)
```

演算子`('ω')⊃`は、値を変数名とする変数にします。

例:
```
('ω')⊃(-_-)
```
```
-> 変数0を表します。
```

```
(°∇°)⅃(-_-)⊂(¯^¯)⊃(o_o)(o_o)(o_o)L(-.<)
('O')⅃('ω')⊃(-_-)L(-.<)
```
```
-> 変数0を宣言して7を代入します。
-> 変数0、すなわち7を表示します。
```

### 5.2.　変数の再代入
`('∇')⅃`は、変数の再代入をする命令文です。
1つ目の引数は再代入する変数名、2つ目の引数は代入する値を指定します。
```
('∇')⅃ <変数名> ⊂(¯^¯)⊃ <代入する値> L(-.<)
```

例:
```
(°∇°)⅃(-_-)⊂(¯^¯)⊃(o_o)(o_o)(o_o)L(-.<)
('O')⅃('ω')⊃(-_-)L(-.<)
('∇')⅃(-_-)⊂(¯^¯)⊃(o_o)(o_o)L(-.<)
('O')⅃('ω')⊃(-_-)L(-.<)
```
```
-> 変数0を宣言して7を代入します。
-> 変数0、すなわち7を表示します。
-> 変数0に3を再代入します。
-> 変数0、すなわち3を表示します。
```

## 6. 条件分岐文
`(¯^°)⅃`は、引数が1以上かどうかによって、`(•ω•)/`と`\(•ω•)`で囲まれた命令文を実行するか決定します。
```
(¯^°)⅃ <真偽> L(-.<)(•ω•)/
    <命令文>
\(•ω•)
```

例:
```
(¯^°)⅃(o_o)L(-.<)(•ω•)/
    ('O')⅃(-_-)L(-.<)
\(•ω•)
```
```
-> 1つ目の引数は1なので、0と表示します。
```

```
(¯^°)⅃(>_<)⊃(o_o)⊂(¯^¯)⊃(o_o)L(-.<)(•ω•)/
    ('O')⅃(-_-)L(-.<)
    ('O')⅃(o_o)L(-.<)
\(•ω•)
```
```
-> 1つ目の引数は1（1=1は真）なので、0,1と順に表示します。
```

```
(¯^°)⅃(>_<)⊃(o_o)⊂(¯^¯)⊃(-_-)⊂(¯^¯)⊃(o_o)(-_-)L(-.<)(•ω•)/
    ('O')⅃(-_-)L(-.<)
    ('O')⅃(o_o)L(-.<)
\(•ω•)
```
```
-> 1つ目の引数は0（1=0は偽）なので、何もしません。
```

## 7. 繰り返し文
`(°д°)⅃`は、`(•ω•)/`と`\(•ω•)`で囲まれた命令文を引数で指定された回数繰り返して実行します。
```
(°д°)⅃ <繰り返す回数> L(-.<)(•ω•)/
    <命令文>
\(•ω•)
```

例:
```
(°д°)⅃(o_o)(o_o)L(-.<)(•ω•)/
    ('O')⅃(-_-)L(-.<)
\(•ω•)
```
```
-> 0と3回繰り返して表示されます。
```

## 8. エラー
ソースコードが実行不可能と判断されると、エラーコードを表示して、処理を中断します。

### 8.1. エラーコード
エラーコードは顔文字です。

| エラーコード | 意味 |
| :--- | :--- |
| `(#ˋзˊ)੭` | Fa(c_e)Scriptで認識出来ない句が含まれています。 |
| `(;°~°)∂` | 被演算子の指定に誤りがあります。 |
| `(ˊ•ω•)৴` | 命令文の引数の指定に誤りがあります。 |

## 9. その他の命令文
### 9.1. 入力文
`(ˇoˇ)⅃`は、入力欄を表示して、その入力結果を変数として定義します。
引数は変数名を指定します。

指定した変数が既に存在しているときは、その変数に再代入します。

例:
```
(ˇoˇ)⅃(-_-)L(-.<)
('O')⅃(>ω<)⊃('ω')⊃(-_-)⊂(¯^¯)⊃('ω')⊃(-_-)L(-.<)
```
```
-> 入力文の結果が変数0として定義されて、その2乗が表示されます。
```

### 9.2. 関数定義
`(•∀•)⅃`は、`(•ω•)/`と`\(•ω•)`で囲まれた命令文を変数として定義します。
引数は変数名（関数名）を指定します。

`(°-°)⅃`は、引数で指定した変数名の関数を実行します。

例:
```
(•∀•)⅃(-_-)L(-.<)(•ω•)/
    ('O')⅃(-_-)L(-.<)
\(•ω•)

(°-°)⅃(-_-)L(-.<)
(°-°)⅃(-_-)L(-.<)
```
```
-> 0と表示する命令文が、関数0として定義さます。
-> 2回関数0が実行、すなわち2回0と表示されます。
```


## サンプルコード
### 1.　素数判定
入力欄を表示して、そこに入力された正の整数が素数かどうか判定します。

```
(ˇoˇ)⅃(-_-)L(-.<)
(°∇°)⅃(o_o)⊂(¯^¯)⊃(-_-)L(-.<)
(°∇°)⅃(o_o)(-_-)⊂(¯^¯)⊃(-_-)L(-.<)
(°∇°)⅃(o_o)(o_o)⊂(¯^¯)⊃(-_-)L(-.<)

(°д°)⅃('ω')⊃(-_-)L(-.<)(•ω•)/
    ('∇')⅃(o_o)(-_-)⊂(¯^¯)⊃(-_-)L(-.<)
    (°д°)⅃(^ω^)⊃(o_o)⊂(¯^¯)⊃('ω')⊃(-_-)L(-.<)(•ω•)/
        (¯^°)⅃(>_<)⊃(TεT)⊃('ω')⊃(-_-)⊂(¯^¯)⊃(^ω^)⊃(o_o)⊂(¯^¯)⊃('ω')⊃(o_o)⊂(¯^¯)⊃('ω')⊃(o_o)(-_-)L(-.<)(•ω•)/
            ('∇')⅃(o_o)(o_o)⊂(¯^¯)⊃(^ω^)⊃('ω')⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)L(-.<)
        \(•ω•)
        ('∇')⅃(o_o)(-_-)⊂(¯^¯)⊃(^ω^)⊃('ω')⊃(o_o)(-_-)⊂(¯^¯)⊃(o_o)L(-.<)
    \(•ω•)
    ('∇')⅃(o_o)⊂(¯^¯)⊃(^ω^)⊃('ω')⊃(o_o)⊂(¯^¯)⊃(o_o)L(-.<)
\(•ω•)

(¯^°)⅃(>_<)⊃('ω')⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)(-_-)L(-.<)(•ω•)/
    ('O')⅃(>◡<)⊃(◕-◕)⊃(o_o)(o_o)(o_o)(o_o)(o_o)(-_-)(o_o)(-_-)(-_-)(o_o)(-_-)(-_-)(-_-)(-_-)(-_-)⊂(¯^¯)⊃(◕-◕)⊃(o_o)(o_o)(-_-)(-_-)(o_o)(-_-)(o_o)(-_-)(o_o)(o_o)(o_o)(-_-)(-_-)(-_-)(-_-)L(-.<)
\(•ω•)

(¯^°)⅃(.^.)⊃(>_<)⊃('ω')⊃(o_o)(o_o)⊂(¯^¯)⊃(o_o)(-_-)L(-.<)(•ω•)/
    (¯^°)⅃(.^.)⊃(O_<)⊃('ω')⊃(-_-)⊂(¯^¯)⊃(o_o)L(-.<)(•ω•)/
        ('O')⅃(>◡<)⊃(◕-◕)⊃(o_o)(-_-)(o_o)(-_-)(o_o)(-_-)(-_-)(-_-)(-_-)(-_-)(-_-)(o_o)(-_-)(-_-)(-_-)⊂(¯^¯)⊃(>◡<)⊃(◕-◕)⊃(o_o)(o_o)(-_-)(-_-)(-_-)(o_o)(-_-)(-_-)(-_-)(-_-)(o_o)(-_-)(-_-)(-_-)(-_-)⊂(¯^¯)⊃(◕-◕)⊃(o_o)(o_o)(-_-)(-_-)(o_o)(-_-)(o_o)(-_-)(o_o)(o_o)(o_o)(-_-)(-_-)(-_-)(-_-)L(-.<)
    \(•ω•)
    (¯^°)⅃(O_<)⊃('ω')⊃(-_-)⊂(¯^¯)⊃(o_o)L(-.<)(•ω•)/
        ('O')⅃(>◡<)⊃(◕-◕)⊃(o_o)(-_-)(o_o)(-_-)(-_-)(o_o)(o_o)(-_-)(o_o)(-_-)(o_o)(o_o)(-_-)(-_-)(-_-)⊂(¯^¯)⊃(◕-◕)⊃(o_o)(o_o)(-_-)(-_-)(o_o)(-_-)(o_o)(-_-)(o_o)(o_o)(o_o)(-_-)(-_-)(-_-)(-_-)L(-.<)
    \(•ω•)
\(•ω•)
```