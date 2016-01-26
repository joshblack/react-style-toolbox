import React, { Children, cloneElement } from 'react';

const matchKeyByPattern = (object, pattern) => {
  return Object.keys(object).reduce((acc, key) => {

    if (key.match(pattern)) {
      return {
        ...acc,
        match: {
          [key]: object[key]
        }
      };
    }

    return {
      ...acc,
      [key]: object[key]
    };
  }, {});
};

/**
 * let List = ({
 *   style,
 *   children,
 *   ...rest
 * }) => (
 *   <ul style={style.list}>
 *     {children}
 *   </ul>
 * );
 *
 * List = NthChild(List, 'item', {
 *   list: {
 *     margin: 0,
 *     padding: 0,
 *     listStyle: 'none',
 *     'nth-child(1)': {
 *       background: 'blue'
 *     }
 *   },
 *   item: {
 *     background: 'black',
 *     width: 50,
 *     height: 50,
 *     margin: 25
 *   }
 * });
 */

const NthChild = (Component, itemStyleName, styles) => class extends React.Component {
  static displayName = `NthChild${Component.displayName || Component.name}`;

  render() {
    const { children } = this.props;

    const { match, ...rest } = matchKeyByPattern(styles.list, /nth-child/g);
    const [positionString] = /(\d)/g.exec(Object.keys(match)[0]);
    const position = parseInt(positionString, 10);

    const style = {
      item: styles.item,
      list: rest
    };

    return (
      <Component
        {...this.props}
        style={style}>
        {Children.map(children, (child, i) => {
          if (i === position - 1) {
            return cloneElement(child, {
              style: {
                ...style.item,
                ...match['nth-child(1)']
              }
            });
          }

          return cloneElement(child, { style: style.item });
        })}
      </Component>
    );
  }
};

export default NthChild;
