import Media from '../components/Media';
import Focus from '../components/Focus';
import Hover from '../components/Hover';

const compose = (...StyleComponents) => (Component, styles) => {
  const [Root, ...rest] = StyleComponents;
  const partial = rest.reduceRight((prev, curr) => curr(prev), Component);

  return Root(partial, styles);
};

const queue = (...functions) => (e) => functions.forEach((fn) => fn(e));

const create = (styles) => {
  // Should handle autoprefixing!
  return styles;
};

const StyleSheet = {
  compose,
  create,
  queue
};

const CSS = compose(Media, Focus, Hover);

export { compose, queue, CSS };
export default StyleSheet;
