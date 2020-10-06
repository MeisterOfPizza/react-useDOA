## Table of Contents
- [Table of Contents](#table-of-contents)
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
  - [Importing](#importing)
  - [Hook](#hook)
  - [Explanation](#explanation)
  - [Showcase](#showcase)
  - [Mutating prop objects without parent re-renders](#mutating-prop-objects-without-parent-re-renders)
  - [Standard Left-to-Right Field Assignment](#standard-left-to-right-field-assignment)
  - [Functional Assignment](#functional-assignment)
  - [New Object Value Assignment](#new-object-value-assignment)
  - [Tests](#tests)
- [Benefits](#benefits)
- [Limitations](#limitations)
- [License](#license)

## About
**useDOA**, or use **D**ynamic **O**bject **A**ssignment is a React hook designed to allow programmers to **mutate state objects** (which includes **class instances**, **arrays**, and **prop objects**) *without* cloning said object (excluding the initial clone) in order to change just one field (or multiple). Mutating prop objects with **useDOA** is possible and does **not** trigger a re-render of the parent component. **useDOA** allows you to use standard left-to-right object field assignment (eg. fruit.name = "Apple") inside the component render function (or return block when using hooks) to change object fields. You can choose whether or not to trigger a re-render when updating objects, something that can be useful when dealing with internal values in complex class instances. **useDOA works in both React.js and React Native, although the example project ONLY works in React.js, however, the same code templates can be used in React Native.**

## Installation
Run: `npm i react-usedoa`

## Usage
### Importing
Import with `import useDOA from 'react-usedoa'`

### Hook
Use the hook with `const [object, updateObject] = useDOA(initialObject, cloneInitialObject);`

* Where `useDOA` is `function(initialObject: object | Array, cloneInitialObject = true)`
* Where `typeof object === "object"` (or `null`), `typeof initialObject === "object"` (or `null`), and `typeof updateObject === "function"`
* Where `updateObject` is `function(value: object | Array | Function, cloneObject = true)`

### Explanation
There are *two* ways of assigning new values to fields and *one* way of assigning new object reference values (excluding the initial state assignment) using DOA.

The useDOA hook takes an initial value to use as the state and a boolean which determines if the initial value should be cloned, and returns an array containing two elements. The first element is the exact same object passed in (or null if null was passed), and the second element is a function which when called will update the object state value. Remember, in JavaScript, arrays and class instances are also objects. This means that the useDOA function can take an object, class instance, and array.

**The second element returned by useDOA should always have the prefix *update* in order to distinguish it from React's useState *set___*.**

### Showcase
```javascript
// Standard React hook component
const DisplayBuilding = () => {
    const [building, updateBuilding] = useDOA({ name: "Tower", height: 200 });

    return (
        <div>
            <button
                onClick={() => {
                    building.height += 5;
                    updateBuilding();
                }}>
                Add 5 meters using standard left-to-right object field assignment.
            </button>
            <button
                onClick={() => updateBuilding(() => building.height += 5)}>
                Add 5 meters using an assignment function
            </button>
            <button
                onClick={() => updateBuilding({ name: "House", height: 7 })}>
                Assign a new building object to the building state.
            </button>
            <p>
                {building.name} height is {building.height} meters.
            </p>
        </div>
    );
}

// Standard export
export default DisplayBuilding;
```

### Mutating prop objects without parent re-renders
Clicking the "Click to eat" button in a Fruit component will **not** cause a re-render of the *Container* component, only the  *Fruit* component that the button is in. Also, remember to **pass in a boolean value of false as the second argument with useDOA and the update function** in order to avoid using a cloned reference to the prop object. **This can be very useful behaviour when working with forms or a long list of objects.**

```javascript
const Fruit = props => {
    const [fruit, updateFruit] = useDOA(props.fruit, false);

    console.log("Render fruit");

    return (
        <li>
            <button onClick={() => updateFruit(() => fruit.name = "Ate " + fruit.name)}>
                Click to eat
            </button>
        </li>
    );
}

const fruits = [
    {
        id: 0,
        name: "Apple"
    },
    {
        id: 1,
        name: "Banana"
    },
    {
        id: 2,
        name: "Orange"
    }
]

const Container = () => {
    const [fruits, setFruits] = useState(fruits);

    console.log("Render fruit container");

    return (
        <ul>
            {
                fruits.map((f, i) => (
                    <Fruit
                        key={i}
                        fruit={f} />
                ))
            }
        </ul>
    );
}
```

### Standard Left-to-Right Field Assignment
```javascript
const [building, updateBuilding] = useDOA({ name: "Tower", height: 200 });

// Synchronously adds 10 meters to the building's height,
// however, does **NOT** cause a re-render.
building.height += 10;

console.log(building.height); // 210

// This is what causes a normal component re-render (asynchronous).
// Not calling this will avoid a component re-render, which might
// be what you want to do in some very rare cases.
updateBuilding();
```

### Functional Assignment
```javascript
const [building, updateBuilding] = useDOA({ name: "Tower", height: 200 });

// By passing a function instead of an object we synchronously
// add 10 meters to the building's height (just as before),
// **AND** we also cause a normal component re-render (asynchronous).
// If you want a one-liner, this is the assignment type to use.
updateBuilding(() => building.height += 10);

// Because the field assignment is synchronous,
// the building's height already has the value of 210.
console.log(building.height); // 210

// You can also pass a non-arrow function as well:
updateBuilding(function() { building.height += 10 });

console.log(building.height); // 220
```

### New Object Value Assignment
```javascript
const [building, updateBuilding] = useDOA({ name: "Tower", height: 200 });

// We want to create a new building object and assign that
// as our new building value instead. Using React's
// setState one would do it as such:
//  setState({ name: "Villa", height: 8 });

// With useDOA, we do the exact same thing, but with
// the update function instead:
updateBuilding({ name: "Villa", height: 8 });

// We've now synchronously assigned a new object value
// to the DOA and queued a component re-render, however,
// we haven't gotten the re-render yet, which means that
// the building reference still points to the old building
// object, as we'll see below:
console.log(building); // { name: "Tower", height: 200 } (!!!)

// If we want to instantly get back our new object value
// and skip creating a temporary object reference, we just
// assign our building reference to the returned reference
// passed back by the update function:
building = updateBuilding({ name: "Villa", height: 8 });

console.log(building); // { name: "Villa", height: 8 }
```

As you can see, useDOA allows for much less code which is also easier to read and maintain. React's setState way of mutating objects would be:
```javascript
setBuilding({ ...building, height: building.height + 5 });
```
which is **neither very efficient** (especially on larger objects) **nor easy to read and maintain**.

### Tests
Both the useDOA function and the update function take a boolean value as the second parameter. If the argument is the value of true, which is also its default value, the initial object is cloned and the clone is given the same prototype as the initial object. Passing an argument of value false makes it so that the object returned is of the same instance as the given object.

```javascript
let _initialFruit = { name: "Apple", price: 20 };
let _initialDrink = { name: "Water", volume: 3 };

const [fruit, updateFruit] = useDOA(_initialFruit);
const [drink, updateDrink] = useDOA(_initialDrink, false);

console.log(fruit === _initialFruit); // false
console.log(drink === _initialDrink); // true

updateFruit(() => fruit.price = 30);
updateDrink(() => drink.volume = 5);

console.log(fruit === _initialFruit); // false
console.log(drink === _initialDrink); // true

console.log(fruit); // { name: "Apple", price: 30 }
console.log(drink); // { name: "Water", volume: 5 }

let updatedFruit = updateFruit(() => fruit.price = 45);
let updatedDrink = updateDrink(() => drink.volume = 9);

console.log(fruit === updatedFruit); // true
console.log(drink === updatedDrink); // true

console.log(fruit); // { name: "Apple", price: 45 }
console.log(drink); // { name: "Water", volume: 9 }

// Because the object assignment is asynchronous, we pretend we
// haven't gotten the re-render yet. The "false" on the second update
// is to show that there is no difference in passing true or false
// whenever updating with new object instances.
updateFruit({ name: "Banana", length: 4 });
updateDrink({ name: "Juice", strength: 30 }, false);

console.log(fruit); // { name: "Apple", price: 45 }
console.log(drink); // { name: "Water", volume: 9 }

// Same thing here, although we instantly use the newly assigned objects
// and save them in updatedFruit and updatedDrink.
updatedFruit = updateFruit({ name: "Orange", volume: 20 });
updatedDrink = updateDrink({ name: "Milk", calcium: 8 });

// The fruit and drink variables still hold all the old data from before
// just as a setState call would (until a re-render is triggered).
console.log(fruit === updatedFruit); // false
console.log(drink === updatedDrink); // false

console.log(updatedFruit); // { name: "Orange", volume: 20 }
console.log(updatedDrink); // { name: "Milk", calcium: 8 }
```

## Benefits
* Easier to **read**.
* Easier to **maintain**.
* **Fewer** lines of code and **less** code clutter.
* **Better performance** (larger objects).
* The *ability* to mutate an object's field(s) **without** causing a re-render if one wants.
* The *ability* to mutate objects sent in by props **without** using a callback.
* The *ability* to mutate objects sent in by props **without** causing the parent to re-render itself.
* Calling the update function repeatedly does **not** cause stacked re-renders.

## Limitations
* Using the update function to assign a new value to the DOA does **not** update the prop's value. To do this, you have to do a remap yourself.

## License
MIT. Copyright (c) 2020 Emil Engelin.