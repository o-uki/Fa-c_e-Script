# Fa(c_e)Script
![faces_logo](./images/faces_full_logo_background.png "faces_logo")

Fa(c_e)Script（フェイススクリプト）は、顔文字を並べてコードを記述するプログラミング言語です。

## 1. 値
値は、`(o_o)`を1、`(-_-)`を0とする二進数で表されます。
```
(-_-) -> 0を表します。
(o_o) -> 1を表します。
(o_o)(o_o) -> 3を表します。
(o_o)(-_-)(-_-)(o_o) -> 9を表します。
```

`⊂(¯^¯)⊃`は複数の値を並べて記述するときに使用します。
```
(-_-)⊂(¯^¯)⊃(o_o) -> 0,1を表します。
(o_o)(o_o)⊂(¯^¯)⊃(o_o) -> 3,1を表します。
(o_o)⊂(¯^¯)⊃(o_o)(-_-)⊂(¯^¯)⊃(o_o)(o_o) -> 1,2,3を表します。
```

## 2. 演算子、正負反転、加算
演算子は`⊃`を（顔から見て）左手とする顔文字です。
演算子を値の直前に記述することで、その値を演算します。

`('^;)⊃`は正負反転する演算子、`(>ω<)⊃`は加算する演算子です。
```
('^;)⊃(o_o)(o_o) -> -3を表します。
(>ω<)⊃(o_o)⊂(¯^¯)⊃(o_o)(-_-) -> 1+2、すなわち3を表します。
```

演算子が複数重なっている場合、
1. 値と演算子の列を後ろから順に
2. 演算子があれば演算する
3. 後ろに戻って(1.)から

これらを繰り返して演算します。

```
(>ω<)⊃(o_o)⊂(¯^¯)⊃(>ω<)⊃(o_o)(-_-)⊂(¯^¯)⊃(o_o)(o_o)
 -> 後ろから見て2+3=5を演算した後、もう一度後ろから見て1+5、すなわち6を表します。
```

## 3. 命令文
`⅃`を左手とする顔文字は命令文を表します。
命令文を表す顔文字の直後に引数（命令文への入力となる値）を記述します。
`L(-.<)`は命令文の終了を表します。

## 4. 表示文
`('O')⅃`は、引数を表示する命令文です。
```
('O')⅃(o_o)L(-.<) -> 1と表示します。
('O')⅃(o_o)(o_o)⊂(¯^¯)⊃(o_o)L(-.<) -> 3 1と表示します。
```