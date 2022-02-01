# Part 2 - JavaScript Modules

Did you know? With modern Javascript, we can also separate our functions in multiple files! Resulting in an even better organised and readable way!
This is done by making use of the `import/export` directives.

Not only does it allow us to import/export functions, but also variables, objects, classes, ...!

## 🌱 Must-have's

1. Think about what parts of your code would make sense to have in a different file. 
   * It's recommended to simply start with one function. You can add more as you go, as long as it makes sense. If you feel moving something to a different files makes the structure worse, then don't do it (or discuss with your coach).
   * In the long run, the goal is to be able to group things that "make sense together". Example: a calculator file, containing functions like sum, subtract, ... This would allow you to do calculator.sum(x + y). Nice syntax, right?
2. Give the file the same name as your function and move your actual functions into these files.
    * _Just remember: keep `script.js` around, it will still be the origin file for everything._
3. Rename `script.js` to `index.js`.
    * _This is a convention that insures better compatibility with several tools later on (you will see)._ 😉
4. Apply the ES6 import/export syntax and connect all your javascript files to your `index.js`.
    * _Ps. Don't forget to check your HTML as well to load JS in a way that supports modules. (hint: `type="module"`)_


## 🌼 Nice-to-have's

_Do you have time to spare? See if you can help someone, add "nice-to-have" features to your app, or refactor another app of yours!_
