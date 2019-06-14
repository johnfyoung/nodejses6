# nodejses6

This project is an educational tool explaining how to use ES6 modules in a node.js application without the use of a transpiler.

## Demonstrations

This code demonstrates the following:

* **How to use ES6 modules**  
  Node.js v12 has support for ES6 modules, but they are still [considered experimental](https://medium.com/@nodejs/announcing-a-new-experimental-modules-1be8d2d6c2ff) (as of June 14, 2019). The things to note here are that ES6 modules have the `.mjs` extension and that running a script requires adding the `--experimental-modules` flag to the run script.  

  Read more here: [You probably don't need Babel](https://dev.to/dandv/why-you-dont-really-need-babel-4k2h)
* **`import/export`**  

  The Person model is imported to `server.js` using the `import` method. Without the `.mjs` and the `--experimental-modules` flag, this didn't run. The Person model uses `export default` instead of the CommonJS `module.exports`.
* **`async/await`**  

  This is a new way to handle asynchronous functions without getting stuck in callback hell. Important things to note here:
  * `await` only works inside of an `async` function. This means it simplifies asynchronous calls *within the `async` function only*. This allows you to wait for a Promise resolution before executing the next line of code:
    ```javascript
    const job = async (data) => {
        await savePeople(data);
        const people = await findPeople();
        await printPeople(people);
        mongoose.connection.close();
    };
    ```
  * `await` precedes an asynchronous function call that returns a `Promise`.
  * an `async` function is still asynchronous. It will return a `Promise`. The keyword `async` is only relevant to what is inside the `async` function. It allows for use of `await`. It doesn't affect what is outside of it.
  * using `.map()` returns an array of `Promise`'s. So it needs to be wrapped in a `Promise.all`:
    ```javascript
    await Promise.all(myArray.map( item => console.log(item));

    // with an asynchronous callback function
    await Promise.all(myArray.map( async item => await item.save());
    ```

* **`mongoose` models**  

  `mongoose` is an Object Document Mapper, aka [ODM](https://medium.com/@julianam.tyler/what-is-the-difference-between-odm-and-orm-267bbb7778b0) for MongoDB. It is analogous to an ORM, the difference being that unlike a SQL database, Mongoose is based on documents rather than relations.