## Calculate random number between min and max

- Goal: `0 <= random < 1`
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

- Find the random number between min and a max with `r * (max -  min) + min`
