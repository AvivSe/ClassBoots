//Import library
const createCountMinSketch = require("count-min-sketch");
//Create data structure
const sketch = createCountMinSketch();

//Increment counters
sketch.update("foo", 1);
sketch.update(1515, 104);
sketch.update("gal",1);

//Query results
console.log(sketch.query(1515)); //Prints 104
console.log(sketch.query("foo")); //Prints 1
console.log(sketch.query("gal")); //Prints 1


sketch.update("gal",1);

console.log(sketch.query("gal")); //Prints 2
