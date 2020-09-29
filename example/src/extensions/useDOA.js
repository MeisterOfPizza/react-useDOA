import { useState } from "react"

// Dynamic Object Assignment module.
const DOA = function () {
    let _object;
    let _map = {};
    let _incrementVersion;

    return {
        useDOA(initialObject, incrementVersionCallback) {
            if (!_object && initialObject !== null) {
                Object.entries(initialObject).forEach(kvp => _map[kvp[0]] = {
                    get: () => _object[kvp[0]],
                    set: value => {
                        _object[kvp[0]] = value;
                        
                        // Increment the top-layer version integer
                        // in order to re-render the component(s).
                        _incrementVersion();
                    }
                });
            }

            // Assign a new object if the old object (_object) is still undefined.
            _object = _object || initialObject;

            // Reassign the increment version callback function to work
            // with the new top-layer useState setVersion function.
            _incrementVersion = incrementVersionCallback;

            return [_object, _map];
        }
    };
};

/**
 * Returns the instance of the given object, and a mapped object with get and set functions to update it with.
 * @param {Object} initialObject The initial object to use.
 * @example <caption>Use as such:</caption>
 * const [object, map] = useDOA(initialObject);
 * @example
 * // If the given initialObject is of class type Animal:
 * class Animal {
 *     id  : Number
 *     name: String
 * }
 * // The first element returned is the same instance as the initialObject sent (the same reference)
 * // which in this case is an Animal class instance.
 * // The second element returned is an object with mapped fields, each field containing a nested
 * // object with a set and get function.
 * map = {
 *     id: {
 *         get: Function
 *         set: Function(value)
 *     },
 *     name: {
 *         get: Function
 *         set: Function(value)
 *     }
 * }
 * // Calling map.id.get() is the same as calling initialObject.id (it just returns the value of the field).
 * // Calling map.id.set(0) is the same as calling initialObject.id = 0, HOWEVER, if we just call
 * // initialObject.id = 0, React does not issue a re-render. Therefore, calling map.id.set(0) will
 * // cause the React DOM to re-render, which is what we want when we're working with React states.
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