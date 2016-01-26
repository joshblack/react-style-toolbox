import React from 'react';
import merge from 'lodash.merge';
import copyByKey from '../utils/copyByKey';

const Focus = (Component, styles = {}) => class extends React.Component {
  static displayName = `Focused${Component.displayName || Component.name}`;

  state = {
    focused: false,
  };

  render() {
    if (this.props.style) {
      styles = {
        ...styles,
        ...this.props.style
      }
    }

    const { base, pruned } = copyByKey(styles, ':focus');

    const style = this.state.focused
      ? merge(base, pruned)
      : base;

    return (
      <Component
        {...this.props}
        style={style}
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      />
    );
  }

  _onFocus = () => this.setState({ focused: true });
  _onBlur = () => this.setState({ focused: false });
}

export default Focus;
