# Python Tutorials

## File operations
```python
my_file = open('file_name.txt, 'r')`
```
- `my_file.read()` reads the content of the file, reading the file again for the second time returns the blank string, this is because of, in the first read operation file cursor is already at the end of the file content, when we try to read the content for the second time, it returns empty because no content found after the last cursor, to read again the content from the beginning reset the cursor using my_file.seek(0)

- `file_content = my_file.readlines()`  returns the content line by line

- Once the file operations done close the file using, `my_file.close()` or file can be automatically closed using `with` for ex
    ```python
    with open('file.txt') as my_file:
        lines = my_file.read()
    ```
- File content can be read using `lines` variable later
- `open()` accepts second parameter as mode, it can be read, write, append, and so on
- write to a file using file handler, `myfile.write('Some content')` by default file is in read mode, enable `write` mode to write something, it `overrides the content` of the file, creates the new file if not exists. To append something to a file use `append` mode;
use `a+` option to `append and read`
- use `len(my_file)` to get the number of lines in the file
- use `file_content[4]` returns the 5th lines in the file_content

- Reading a list using `for` loop
    ```python
    words = ['cat', 'window', 'defence']
    for word in words:
        print(word, len(word))
    for w in words[:]:  # Loop over a slice copy of the entire list.
        if len(w) > 6: # inserts an element to the words array by making a copy
            words.insert(0, w)
    ```

- Using `range()` to read the list
    ```python
    a = ['Mary', 'had', 'a', 'little', 'lamb']
    for i in range(len(a)):
        print(i, a[i])
    ```

- Fibonacci series, function
    ```python
    def fib(n):    # write Fibonacci series up to n
        a, b = 0, 1
        while a < n:
            print(a)
            a, b = b, a+b
    ```
- Can be invoked as follows `fib(10)`

## Conditional loops
- if, elif, and else loops
    ```python
    if condition:
        # execute statements
    elif:
        # execute statements
    else:
        # execute statements
    ```

- For loop
    ```python
    for item in items:
        print(item)
    # Tuple looping, tups = [(1,2), (3,4), (5,6)]
    for (item1, item2) in tups: # Ignore () just mention the values in the tuples
        print(item1, item2)
    # Dictionary looping, d = {"a": 1, "b": 2, "c": 3}
    for item from d: # d.keys() or d.items() used get the keys or items of the dictionary
        print(item) # Prints only keys i.e. a, b, c
    for key in d:
        print(d[k]) # to print value of the key in the dictionary
    ```

- Python operators
  - `range(0, 11, 2)` from 0 to 10 numbers are generated, third param is step, here 2 means it skips 2 items.
  - `list(enumerate('abc'))` creates a tuple with indexes starting from 0 for each char in the string, works on any iterable object.
  - `zip(list1, list2)` combines the list1 and list2 to create a tuple. Params to the `zip()` can be the same list, it zips till the shortest list among the lists passed, other elements in the bigger list are skipped.
  - Create a list of tuples from 2 lists `list(zip(list1, list2))`
  - `in` can be used to check for items in any iterable object, returns `True` if item exists, `False` otherwise.
  - `min()` accepts iterable object and finds the minimum item in the list, passing the string `vndjdjz` to `min()` prints `d`
  - `max()` accepts iterable object and finds the reverse of `min()`
  - `shuffle()` accepts list object and shuffles the items, it can be imported from `random` as follows, `from random import shuffle`
  - `and`, `or`, and `not` can be used for checking conditions

- List comprehensions:
  - `squares = [x**2 for x in range(1, 100)]` returns `[1, 4, 9, ..upto 100]`
  - `even_numbers = [x for x in range(1, 10) if x % 2 == 0]` returns the list of even numbers

- Examples
    ```python
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

## Error handling
```python
try:
    # some code
expect Exception1:
    # some code
expect Exception2:
    # some code
else:
    # some code
finally:
    # this block runs irrespective of the error
```

## Debugging
- `import pdb` python debugger module to debug the code
- set the trace in any code, `pdb.set_trace()` and `quit` to come out of the debugger

## DateTime
- `import datetime`
- `datetime.time(1,12,12)` to set the time
- `datetime.date.today()` to get the today's date

## Modules and Packages
-	A module  is a file that can be imported under one import ex: `import my_module`
- A package is a collection of modules in directories that  give a package hierarchy
	```python
	# To load specific functions from a module
  from some_file import some_func, someother_func
  ```
- Module can be imported using an alias, `import my_module as mm`
- To install publicaly availble modules using, `pip install <module-name>`

### __name__
- `if __name__ == "__main__"` is designed to help indicate where function calls are coming from when
	working with multiple script files
- `__name__` is a built-in variable which evaluates to the name of the current module.
	However, if a module is being run directly, then `__name__` instead set to the string `"__main__"`
- It tests whether your script is being run directly or being imported by somewhere else.

