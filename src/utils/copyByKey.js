/**
 * Goes through the given object and finds keys that match the given key, `k`.
 *
 * Returns an object containing the { base, pruned } signature, where pruned
 * contains all the matches with the path left intact, and base is the original
 * object with all the matches removed.
 *
 * Works similarly to `copyByPattern`, expect takes in a string `k`
 *
 * Usage:
 *
 * copyByKey(styles, ':hover');
 *
 * @param object {Object} object we want to extract keys from
 * @param pattern {String} The string we want to use to match keys
 *
 * @return {Object} Object containing { base, pruned } from input object
 */
const copyByKey = (object, k) =>
  Object.entries(object).reduce(({ base, pruned }, [key, value]) => {

    /**
     * If the current key matches our search key, elevate children to children
     * of current parent (we're guaranteed that nothing is deeper than one
     * level past the keyword)
     */
    if (k === key) {
      return {
        base,
        pruned: {
          ...pruned,
          ...value
        }
      }
    }

    /**
     * If we hit an object, this is most likely a class or media object.
     * We need to recurse inside of this object and pick out the base tree and
     * pruned tree, merging into the current base and pruned tree.
     */
    if (typeof value === 'object') {
      const { base: childBase, pruned: childPruned } = copyByKey(value, k);

      return {
        base: {
          ...base,
          [key]: childBase
        },
        pruned: {
          ...pruned,
          [key]: childPruned
        }
      };
    }

    /**
     * If we fall through, then we're at an ordinary child that we just add
     * onto the base tree, while also keeping the current pruned tree intact
     */
    return {
      base: {
        ...base,
        [key]: value
      },
      pruned
    };
  }, {
    base: {},
    pruned: {}
  });

export default copyByKey;
