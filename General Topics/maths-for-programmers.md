## Calculate random number between min and max

Goal: `0 <= random < 1`
```
1. min <= n < max

// subtract min so that left hand side becomes 0
2. min - min <= n - min < max - min

3. 0 <= n - min < max - min

// Divide by max-min to get right hand side as 1
4. 0 / (max - min) <= (n - min) / (max - min) < (max - min) / (max - min)

5. 0 <=  (n - min) / (max - min) < 1

// Calculate n w.r.t to r
6. (n - min) / (max - min) = r

// Simplify
7. n = r *  (max - min) + min
```

Find the random number between min and a max with `r * (max -  min) + min`


## LCD - Least Common Denominator

LCD for 6 and 15
```
6 = 2 * 3
15 = 2 * 3 * 5

Here, 2 * 3 * 5 = 30 is LCD for these numbers

Apply when solving rational equations, so that we can clear out
the denominator by multiplying each fraction.

for eg:

  x           1
————— = 1 + ——————
x + 3         x   

LCD here is: (x+3) * x

 x * (x + 3) * x    x * (x + 3)     x * (x + 3)
———————————————— = ———————————— + ——————————————
  (x + 3)                1               x

Simplify by cancelling common terms in numerator and in denominator
x^2 = x^2 + 3x + x + 3
4x + 3 = 0
4x = -3
x = -3/4 (substitute the value of x to equation to verify LHS = RHS)
```

## Quadratic equations

Standard form `ax^2 + bx + c = 0`, where a, b, c represent real numbers and a != 0
```
x^2 = 121
can be factored by converting it to quadratic equation, x^2 - 121 = 0, where a = 1,
b = 0, and c = -121

x = ±√121

x = 11 or x = -11

if no factors found for an quadratic equation use this formula, for ex: x^2 + 2x + 7

     −b ± √(b^2 − 4ac)
x = ——————————————————
          2a
```
