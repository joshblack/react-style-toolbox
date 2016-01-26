import React from 'react';
import merge from 'lodash.merge';
import copyByKey from '../utils/copyByKey';

// Recursively look for keys that match what you're looking for
// On a hit, store the path and value of the key
// When conditions are met, merge the two trees
// Otherwise, no-op

const Hover = (Component, styles = {}) => class extends React.Component {
  static displayName = `Hovered${Component.displayName || Component.name}`;

  state = {
    hovered: false,
  };

  render() {
    if (this.props.style) {
      styles = {
        ...styles,
        ...this.props.style
      }
    }

    const { base, pruned } = copyByKey(styles, ':hover');

    const style = this.state.hovered
      ? merge(base, pruned)
      : base;

    return (
      <Component
        {...this.props}
        style={style}
        onMouseOver={this._onMouseOver}
        onMouseOut={this._onMouseOut}
      />
    );
  }

  _onMouseOver = () => this.setState({ hovered: true });
  _onMouseOut = () => this.setState({ hovered: false });
};

export default Hover;
