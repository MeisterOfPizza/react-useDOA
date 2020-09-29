# About
useDOA, or use **D**ynamic **O**bject **A**ssignment is a React hook designed to allow programmers to
update and assign new values to fields in JavaScript objects and class instances without having
to make a set state call everytime. This not only allows the programmer to change a single field without having to
re-create or clone the object or class instance, but also provides clean and easily readable code, the ability for easy changes to code and allows them to change fields without causing a
re-render (if wanted). **useDOA works in both React.js and React Native projects, although the example project ONLY works in React.js, however, the same code templates can be used in React Native.**

# Usage
## JS Object
```javascript
// Standard React hook component
const DisplayBuilding = () => {
    const [building, buildingMap] = useDOA({ name: "Tower", height: 200 });

    return (
        <div>
            <button
                onClick={() => buildingMap.height.set(building.height + 5)}>
                Click to increase height by 5
            </button>
            <p>
                {building.name}'s height is {building.height}.
            </p>
        </div>
    );
}

// Standard export
export default DisplayBuilding;
```

## JS Class Instance
```javascript
// Standard JS class
class Building {
    constructor(name, height) {
        this.name   = name;
        this.height = height;
    }
}

// Standard React hook component
const DisplayBuilding = () => {
    const [building, buildingMap] = useDOA(new Building("Tower", 200));

    return (
        <div>
            <button
                onClick={() => buildingMap.height.set(building.height + 5)}>
                Click to increase height by 5
            </button>
            <p>
                {building.name}'s height is {building.height}.
            </p>
        </div>
    );
}

// Standard export
export default DisplayBuilding;
```

As you can see, DOA allows for the same syntax to be used **irregardless** of type (Object or Class Instance).
Clicking the "Click to increase height by 5" button will cause a re-render of the DisplayBuilding component.
The standard alternative way of updating the building's height would be
```javascript
setBuilding({ ...building, height: building.height + 5 });
```
or
```javascript
setBuilding(new Building(building.name, building.height + 5));
```
which is **neither very efficient** (especially on larger objects or class instances with performance heavy constructors) **nor easy to read**.

## Extended Example
```javascript
const [furniture, furnitureMap] = useDOA({ name: "Cool Wooden Chair", price: 10 });

console.log(furniture.name); // "Cool Wooden Chair"
console.log(furnitureMap.name.get()); // "Cool Wooden Chair"

furnitureMap.name.set("Normal Chair"); // Causes a React re-render.
// Does **NOT** create a new object, instead it only changes the furniture's name field.
// This is almost the same as writing furniture.name = "Normal Chair"; except for one key difference, as you will see below.

console.log(furniture.name); // "Normal Chair"
console.log(furnitureMap.name.get()); // "Normal Chair"

furniture.name = "Chair"; // Does **NOT** cause a React re-render.

console.log(furniture.name); // "Chair"
console.log(furnitureMap.name.get()); // "Chair"

/**
 * Structure of furniture and furnitureMap from the first row.
 * furniture = {
 *     name : String = "Cool Wooden Chair",
 *     price: Number = 10
 * }
 * 
 * furnitureMap = {
 *     name: {
 *         set: Function(value: any) : void,
 *         get: Function : any
 *     },
 *     price: {
 *         set: Function(value: any) : void,
 *         get: Function : any
 *     }
 * }
 */
```

# Benefits
* Easier to read.
* Better performance (larger objects and class instances only).
* The ability to change an object's or class instance's field(s) without causing a re-render if one wants.

# Limitations
* There is currently no way of assigning a new object or class instance reference to the DOA state. You can only change the fields of the object or class instance.
* The initial value assignment to the DOA takes a bit longer to complete as the DOA creates a map of all the fields.
* Speed and readability is improved at the cost of more memory used (because of the map).

# License
MIT. Copyright (c) 2020 Emil Engelin.