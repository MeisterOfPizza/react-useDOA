// MIT License
// 
// Copyright (c) 2020 Emil Engelin
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { useState } from 'react'

// Dynamic Object Assignment module.
const DOA = function() {
    let _object;
    let _incrementVersion;

    const setObject = value => {
        if (value === undefined) {
            _incrementVersion();
        } else {
            if (typeof value === "function") {
                value();
            } else {
                _object = value;
            }

            _incrementVersion();

            return _object;
        }
    }

    const useDOA = (initialObject, incrementVersionCallback) => {
        // Assign a new object if the old object (_object) is still undefined.
        _object = _object || initialObject;

        // Reassign the increment version callback function to work
        // with the new top-layer useState setVersion function.
        _incrementVersion = incrementVersionCallback;

        return [_object, setObject];
    }

    return {
        useDOA
    };
};

/**
 * Returns the instance of the given object and an update function to update the state with.
 * @param {Object} initialObject The initial object to use.
 * @example <caption>Use as such:</caption>
 * const [object, updateObject] = useDOA(initialObject);
 * @example
 * // If the given initialObject is of class type Animal:
 * class Animal {
 *     id  : Number
 *     name: String
 * }
 * 
 * // The first element returned is the same instance as the initialObject sent (the same reference)
 * // which in this case is an Animal class instance.
 * // The second element returned is an update function which can either take an object or function
 * // as its argument. Passing an object assigns the passed object to the internal object. Passing
 * // a function will cause that function to get called immediately after calling the update function.
 * // Passing a function can be beneficial if you want to alter the object and cause a re-render on the same line of code.
 * 
 * let _initialAnimal = new Animal(0, "Dog");
 * 
 * const [animal, updateAnimal] = useDOA(_initialAnimal);
 * 
 * console.log(animal === _initialAnimal); // true
 * 
 * animal.id = 3; // Does not cause a re-render but does update the object immediately (synchronously, unlike React's setState).
 * console.log(animal.id); // 3
 * 
 * updateAnimal(); // Causes a re-render.
 * 
 * updateAnimal(() => animal.name = "Cat"); // Updates the object immediately (synchronously, unlike React's setState).
 * console.log(animal.name); // Cat
 * 
 * // Causes a re-render but does not update the object immediately
 * // (it does so asynchronously, just as React's setState).
 * updateAnimal(new Animal(0, "Turtle"));
 * console.log(animal); // { id: 3, name: "Cat" } (!!!)
 * 
 * // Does the same thing as the one above, key difference: using the return value.
 * // The update function returns the new object assigned instantly. This can be used
 * // to quickly update the object value, and then to assign it new values afterwards
 * // without having to create a temporary reference. Please note, remember to call
 * // the updateAnimal() function afterwards as the re-render is asynchronous and might
 * // trigger before all the assignments are done.
 * animal = updateAnimal(new Animal(10, "Bird"));
 * console.log(animal); // { id: 10, name: "Bird" }
 */
const useDOA = (initialObject = {}) => {
    const [version, setVersion] = useState(0);
    const [doa, setDOA]         = useState(null);

    if (doa === null) {
        // Create a new DOA module to save the values in.
        const _doa = new DOA();
        setDOA(_doa);

        return _doa.useDOA(initialObject, () => setVersion(version + 1));
    } else {
        return doa.useDOA(initialObject, () => setVersion(version + 1));
    }
};

export default useDOA;