## Select only the words in a string starting with specific character

```py
# Select only the words in a string starting with specific character
sample_str = 'Secret agents are super good at staying hidden.'
for word in sample_str.split():
    first_char = word.lower()[0]

    if first_char == 's':
        print(word)
# Print the first char of a word
first_char_of_a_word = [word[0] for word in sample_str.split()]
print("First character of a word:", first_char_of_a_word)
```

## Fibonacci series

```py
def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a)
        a, b = b, a+b
```

## Reading a list using `for` loop

```py
words = ['cat', 'window', 'defence']
for word in words:
    print(word, len(word))
for w in words[:]:  # Loop over a slice copy of the entire list.
    if len(w) > 6: # inserts an element to the words array by making a copy
        words.insert(0, w)
```
