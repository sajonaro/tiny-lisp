
##### This project is inspired by  "Lisp in 99 lines of C.." (https://github.com/Robert-van-Engelen/tinylisp)


#### In current project we will try to implement in GNU gforth (https://gforth.org/) a subset of Clojure (https://clojure.org/), which we call *micro*Clojure


#### micro clojure interpeter mclj functions in
-  repl mode
```
 ?> mclj
```
-  program exectution mode
```
 ?> mclj code-filename` 
```


#### Example 
##### a program, calculting the square of circle with radius 5:
``` 
(def Pi 3.14)
(* Pi (* 5 5))
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

 > A program, is *just* a sequence of **Lists** (defined below) *recursively*

7 *primitive* operators:
**quote**, **atom**, **eq**, **first**, **rest**, **cons**, **cond**

```
---------------
| quote       |
---------------
(quote x)
>  x

---------------
| atom        |
---------------
(atom (a b))
> ()
(atom x)
> t

---------------
| eq          |
---------------
(eq a b)
> ()
(eq a a)
> t

---------------
| first       |
---------------
(first '(a b c))
> a

---------------
| rest        |
---------------
(rest '(a b c))
> (b c)

---------------
| cons        |
---------------
(cons 'a '(b c))
> (a b c)
(cons 'a '()))
> (a)

---------------
| cond        |
---------------
(cond t b )
> b
(cond '() b )
> ()
```


#### stage 1 - parsing
Goal: convert input text (program) into sequance of valid elements of Microclojure language

#### stage 2 - generation of AST abstract syntax tree
Goal: convert above sequence into tree-like datasctructure, where each parent is an Atom
and its children are atoms, leaf level children can only be Numbers (literal values)

##### e.g. AST for the ex2 above could look:
![Example of AST for the square of circe example](/AST_ex.png)

#### stage 3 - implementation of evaluation function
Goal: interpret AST

