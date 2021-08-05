# Python3

## Installing a package with pip

Install a package
```
python3 -m pip install <package-name>
```

Update `pip` itself
```
python3 -m pip install --upgrade pip
```

## List and list comprehension

`squares = [x**2 for x in range(1, 100)]` returns `[1, 4, 9, ..upto 100]`

`even_numbers = [x for x in range(1, 10) if x % 2 == 0]` returns the list of even numbers

`reverse an array` using list comprehension
```py
mylist = [1, 2, 3, 4]
rev_list = [::-1]
```

### Create a copy of a list without mutating the original list

```py
my_list = [1, 2, 3, 4, 5]

# create using a list function
list_copy = list(my_list)

# Using the slicing
list_copy = my_list[:]

# Use the copy() method
list_copy = my_list.copy()

# Using list comprehension
list_copy = [i for i in my_list]

list_copy.append(6)
# my_list is not modified and list_copy is appended with an item

# Appending an item to list_copy without copying mutates the my_list
```

## Tuples

`Ordered`, `Immutable` collection and allows `duplicate elements`
```py
# brackets are optional if more than one item is present in the tuple
my_tuple = ("name", 1, 2)  

# Treated as a string if has only one item
my_tuple = ("name")
type(my_tuple) # returns string

# Fix the issue adding an trailing comma after the entry
my_tuple = ("name",)

# Create an tuple from tuple() function passing iterables such as list
my_tuple = tuple([1, 2, "name", 1, 2])

# Access items specifying an index
my_tuple[1]

# Get the length of a tuple
len(my_tuple)

#  Count the occurrence of an item in a tuple using count property
my_tuple.count(1) # returns 2

# Get the index of an item
my_tuple.index(1)

# Convert to a list using list(tuple) function
list(my_tuple)

# Slicing works the same way as that of lists

# Unpacking the tuple to a variables, number of variables should be equal to
# number of items in the tuple not less or not more
my_tuple = "Punith", "Bangalore", 25
name, city, age = my_tuple

# Unpack the items using * operator
my_tuple = 1, 2, 3, 4, 5, 6, 7
first, *others, last = my_tuple # *others returns, [2, 3, 4, 5, 6] as a list

```

### Get the size of a list or tuple in bytes

```py
import sys

my_list = [1, 2, 3, 4, 5, 6, 7]
my_tuple = 1, 2, 3, 4, 5, 6, 7

sys.getsizeof(my_list)
sys.getsizeof(my_tuple)
```

> Use timeit util to test the time taken to execute a statement or block of code,
  https://docs.python.org/3/library/timeit.html

Working with tuples can be more efficient

## Dictionary

Collection of key-value pairs, `un-ordered` and `mutable`
`Key` can be a `tuple` or `a number` but not a list cannot be `hashable`
```py
my_dict = {"name": "Punith", 'age': 30}

# Create with dict(key='value')
my_dict = dict(name="Punith", age=30)

# Access the dictionary by key name
my_dict['name']

# Add an item
my_dict['email'] = 'kpunith8@gmail.com'

# new value will be over written if key and value exists in the dictionary

# Delete an item in the key
del my_dict['email']

# delete with pop(key) or popitem() - removes the last item
my_dict.pop('email')

# Look for an existence of a key
for "name" in my_dict
    print(my_dict['name'])

try:
    print(my_dict['name'])
except:
    print('Error')

# use keys() and values() functions on a dictionary get keys and values respectively,
# and use items() on dictionary to access both keys and values
for key, value in my_dict.items():
    print(key, value)

# Assign to a new dict to copy and modifying the copied dictionary
# will result in updating the original dictionary

# To avoid mutating the original dictionary use copy() function on dictionary to be copied
# or use dict(original_dictionary)
new_dict = my_dict.copy()
new_dict = dict(my_dict)

# Merge 2 dictionaries with update(new_dict), all the values are overwritten for
# the key in original dictionary with the new dictionary
# update() does not return a new dict, it updates the original dictionary
other_dict = dict(name="Sam", email="hello@abc.com")

my_dict.update(other_dict)
```

## Sets

`Unordered`, `mutable`, and does not allow `duplicates`

```py
my_set = {1, 2, 3, 1}

# Set also be created with set(iterables)
my_set = set("hello")

# creating an empty set with empty braces, {} will have a type dictionary
# use set() instead

# add(item) to add an item, remove(item) to remove an item
# clear() to empty a set and discard(item) to remove the item which is not in the set without errors
# pop() removes the arbitrary item

# union with sets, odds.union(evens)
# intersection with sets, odds.intersection(evens)
# difference between sets, odds.difference(primes)
# symmetric_difference between sets, odds.symmetric_difference(primes)
```

## Strings

Ordered and immutable
```py
# Tripple quotes can be used as documentation string or to have strings in multiple lines
# String will be printed in two different lines
str1 = """Hello
there"""

# String will be continued not in the next line but as a single string
str2 = """Hello \
there"""

my_str = "Hello World"

# Accessing string based on index, 0 based index
# Prints 'He' - From index 0 to 1, excludes the char at index 2
str3 = my_str[:2] 

# Prints 'llo World' - From index 2 to the end of string
str4 = my_str[2:] 

# prints 'llo' - From index 2 to 4, excluding the char at index 5
str5 = my_str[2:5]


# Formatting strings with format()
my_var = 1.2345333
formatted_str = "The variables are {} and {:.2f}".format(my_str, my_var)

# Formatting with f-strings above python 3.6
formatted_str = f"The variables are {my_str} and {my_var * 2}"
```

## File Operations

Open a file in read mode
```
my_file = open('file_name.txt, 'r')
```

`my_file.read()` reads the content of the file, reading the file again for the
second time returns the `blank` string, this is because of, in the first read
operation file cursor is already at the end of the file content, when we try
to read the content for the second time, it returns empty because no content
found after the last cursor, to read again the content from the beginning
reset the cursor using `my_file.seek(0)`

`file_content = my_file.readlines()`  returns the content line by line

Once the file operations done close the file using, `my_file.close()` or
file can be automatically closed using `with` for ex
```python
with open('file.txt') as my_file:
    lines = my_file.read()
```

File content can be read using `lines` variable later

`open()` accepts second parameter as mode, it can be read, write, append, and so on

Write to a file using file handler, `myfile.write('Some content')` by default
file is in read mode, enable `write` mode to write something, it
`overrides the content` of the file, creates the new file if not exists.
To append something to a file use `append` mode; use `a+` option to `append and read`

Use `len(my_file)` to get the number of lines in the file

Use `file_content[4]` returns the 5th lines in the file_content

## Conditional Loops

`if`, `elif`, and `else` loops
```py
if condition:
    # execute statements
elif:
    # execute statements
else:
    # execute statements
```

For loops
```py
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

## Python Operators

`range(0, 11, 2)` from 0 to 10 numbers are generated, third param is step, here 2 means it skips 2 items.

`list(enumerate('abc'))` creates a tuple with indexes starting from 0 for each char in the string, works on any iterable object.

`zip(list1, list2)` combines the list1 and list2 to create a tuple. Params to the `zip()` can be the same list, it zips till the shortest list among the lists passed, other elements in the bigger list are skipped.

Create a list of tuples from 2 lists `list(zip(list1, list2))`

`in` can be used to check for items in any iterable object, returns `True` if item exists, `False` otherwise.

`min()` accepts iterable object and finds the minimum item in the list, passing the string `vndjdjz` to `min()` prints `d`

`max()` accepts iterable object and finds the reverse of `min()`

`shuffle()` accepts list object and shuffles the items, it can be imported from `random` as follows, `from random import shuffle`

`and`, `or`, and `not` can be used for checking conditions

### Error handling

```py
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

`import pdb` python debugger module to debug the code

Set the trace in any code, `pdb.set_trace()` and `quit` to come out of the debugger

## DateTime

`import datetime`

`datetime.time(1,12,12)` to set the time

`datetime.date.today()` to get the today's date

## Modules and Packages

A module  is a file that can be imported under one import ex: `import my_module`

A package is a collection of modules in directories that  give a package hierarchy
```python
# To load specific functions from a module
from some_file import some_func, someother_func
```

Module can be imported using an alias, `import my_module as mm`

To install publicaly availble modules using, `pip install <module-name>`

## __name__

`if __name__ == "__main__"` is designed to help indicate where function calls are coming from when
working with multiple script files

`__name__` is a built-in variable which evaluates to the name of the current module.
However, if a module is being run directly, then __name__ instead set to the string `"__main__"`

It tests whether your script is being run directly or being imported by somewhere else.

## Links

- https://docs.python.org/3/library/functions.html

- https://pythonprogramming.net/

## References

- `pypi.org` - For python packages

- `Kaggle.com` - To download the data sets for machine learning

## Libraries

- `openpyxl` - Excel operations and charts

- `django` - web framework

### For Machine learning

- `numpy` - 2D array processing

- `pandas` - Data analysis lib, data frame

- `matplotlib` - 2d plotting graphs

- `scikit-learn`
