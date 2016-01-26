/**
 * Goes through the given object and finds keys that map to the given pattern.
 *
 * Returns an object containing the { base, pruned } signature, where pruned
 * contains all the matches with the path left intact, and base is the original
 * object with all the matches removed.
 *
 * Works similarly to `copyByKey`, expect takes in a RegEx `pattern`.
 *
 * Usage:
 *
 * copyByPattern(style, /@media /g);
 *
 * @param object {Object} object we want to extract keys from
 * @param pattern {Regex} The RegEx we want to use to match keys on the object
 *
 * @return {Object} Object containing { base, pruned } from input object
 */
const copyByPattern = (object, pattern) =>
  Object.entries(object).reduce(({ base, pruned }, [key, value]) => {

    /**
     * If the current key matches our search pattern, elevate children to
     * children of current parent (we're guaranteed that nothing is deeper than
     * one level past the keyword)
     */
    if (key.match(pattern)) {
      return {
        base,
        pruned: {
          ...pruned,

          // Remove @media from media queries
          [key.replace('@media ', '')]: value
        }
      }
    }

    /**
     * If we hit an object, this is most likely a class or media object.
     * We need to recurse inside of this object and pick out the base tree and
     * pruned tree, merging into the current base and pruned tree.
     */
    if (typeof value === 'object') {
      const { base: childBase, pruned: childPruned } = copyByPattern(value, pattern);
      let b;
      let p;

      // Make sure that we don't add any empty objects to base or pruned
      if (Object.keys(childBase).length !== 0) {
        b = {
          ...base,
          [key]: childBase
        }
      }

      if (Object.keys(childPruned).length !== 0) {
        p = {
          ...pruned,
          [key]: childPruned
        }
      }

      return {
        base: b,
        pruned: p
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

export default copyByPattern;
