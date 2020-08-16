# DS and Algorithms

# Asymptotic notation for Time Complexity

## Big O Notation - for worst case

1. `O(1)` `Constant Time` - no loops

2. `O(log n)` `Logarithmic ` - searching algorithms

3. `O(n)` `Constant Time` - loops, as the elements grow the number of operations grow too

4. `O(n*log(n))` `Logarithmic Linear` - sorting operations

5. `O(n^2)` `Quadratic time` - nested loops

6. `O(2^n)` `Exponential` - recursive algorithms

7. `O(n!)` - `Factorial` - adding a loop for each element

### Rules to calculate Big O

1. Consider worst case scenario

2. Remove the constants, for eg., `O(2n)` and `O(n + 1) or O(n/2)` becomes `O(n)`
  ```js
  function printBox(box1) {
    box1.forEach((item) => {
       console.log(item);
    });

    box1.forEach((item) => {
      console.log(item)
    });
  }
  ```

> Though the above function runs the loop 2 times on the input it would be simplified to `O(n + n)` i.e., O(2n)
  from which we ignore the constant 2, it becomes `O(n)`

3. Different terms for inputs,

- In this would be, `O(n + m)` because of 2 different inputs
  ```js
  function printBoxes(box1, box2) {
    box1.forEach((item) => {
       console.log(item);
    });

    box2.forEach((item) => {
      console.log(item)
    });
  }
  ```

- In this case it becomes `O(n * n)` => `O(n^2)`, because we are looping within another loop
  ```js
  const printAllThePairs = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        console.log([arr[i], arr[j]]);
      }
    }
  }
  ```

4. Drop non dominant terms

- In this case it would be, `O(n + n^2)` which becomes `O(n^2)` after droping the
  non dominant term
  ```js
  const printAllThePairs = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]) // O(n)
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        console.log([arr[i], arr[j]]); // O(n*n)
      }
    }
  }
  ```

## Space Complexity

- Depends on, variables, data structures used, function calls, allocations
