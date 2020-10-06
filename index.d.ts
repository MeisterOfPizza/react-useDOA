/**
 * Returns the instance of the given object and an update function to update the state with.
 * @param {Object} initialObject The initial object to use.
 * @param {Boolean} cloneInitialObject Should the initial object be cloned so that whenever it gets updated it doesn't mutate the initial object's original reference.
 * 
 * @link See https://github.com/MeisterOfPizza/react-useDOA/blob/master/README.md for documentation.
 */
export default function useDOA(initialObject: object | Array, cloneInitialObject = true): [object, Function]