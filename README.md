
##### This project is inspired by  "Lisp in 99 lines of C.." (https://github.com/Robert-van-Engelen/tinylisp)


#### In current project we will try to implement a subset of Clojure (https://clojure.org/), which we call *micro*Clojure

#### Definition of microClojure

 > A program, is *just* a sequence of **Lists** (defined below) *recursively*

#### Example 
##### a program, calculting the square of circle with radius 5:
``` 
(def Pi 3.14)
(* Pi (* 5 5))
```

#### 'MicroClojure language consists of following kinds of components 
```
----------------------------------------------------------------------------------------------------------
| Category name  |      Description                              | Representation (in javascript)        |
----------------------------------------------------------------------------------------------------------
| Symbol         |      name of built in function (e.g. +,*)     | javascript string: e.g. "Pi", "def"   |
|                |      or "special form" (e.g. def, if, let)    |                                       |
|                |      or variable (def Pi 3.14)                |                                       |----------------------------------------------------------------------------------------------------------
| Number         |      literal value - "real" number            | javascript Number: e.g  3.14          |
----------------------------------------------------------------------------------------------------------
| Atom           |      Symbols, Numbers                         | javascript String, Number             |
----------------------------------------------------------------------------------------------------------
| List           |      is a sequnce of one or more Atoms/lists  | javascript arrays of:                 |
|                |      enclosed in ( ) brackets                 | strings,numbers, arrays               |
|                |      i.e. (Atom1/List1 Atom2/List2  .. )      |                                       |
----------------------------------------------------------------------------------------------------------

```


#### Evaluation rules:
```
Symbol      |   evaluates to itself (a name of function, variable etc)
Number      |   evaluates to number
Atom        |   evaluates to symbol or number
List        |   first element evaluates to function name, the rest - function arguments
```

### Evaluation Examples:
```
ex1
(def Pi 3.14)    ->  special form 'def' is the first argument in the list therefore
                     the list is evaluated according to semantics (rules of evaluation) of 'def':
                     i.e. symbol Pi is "defined" and set to be 3.14 

ex 2 
(def Pi 3.14)    ->  see ex1
(* Pi (* 5 5))   ->  (*                                    //
                       3.14  //Pi is evaluated to 3.14     //  list (* 3.14 25) evaluates to 78.5
                       25)   //(* 5 5) is evaluated to 25  //
```                                                            


### Implementatation of 'microClojure'

#### stage 1 - parsing
Goal: convert input text (program) into sequance of valid elements of Microclojure language

#### stage 2 - generation of AST abstract syntax tree
Goal: convert above sequence into tree-like datasctructure, where each parent is an Atom
and its children are atoms, leaf level children can only be Numbers (literal values)

##### e.g. AST for the ex2 above could look:
![Example of AST for the square of circe example](/AST_ex.png)

#### stage 3 - implementation of evaluation function
Goal: interpret AST

