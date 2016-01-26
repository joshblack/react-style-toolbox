import React from 'react';
import mediaQuery from 'css-mediaquery';
import merge from 'lodash.merge';
import copyByPattern from '../utils/copyByPattern';

const Media = (Component, styles = {}) => class extends React.Component {
  static displayName = `MediaBlock${Component.displayName || Component.name}`;

  state = {
    width: 1200
  };

  componentDidMount() {
    window.addEventListener('resize', this._onResize);

    this.setState({ width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  render() {
    if (this.props.style) {
      styles = {
        ...styles,
        ...this.props.style
      }
    }

    const { base, pruned } = copyByPattern(styles, /@media/g);

    const triggeredMediaQueries = (media) => Object.keys(media)
      .filter((key) => mediaQuery.match(key, {
        type: 'screen',
        width: this.state.width
      }))
      .reduce((acc, key) => ({
        ...acc,
        ...media[key]
      }), {});

    const mediaQueries = Object.entries(pruned)
      .reduce((acc, [key, value]) => {
        return {
          [key]: triggeredMediaQueries(value)
        };
      }, {});

    const style = merge(base, mediaQueries);

    return (
      <Component
        {...this.props}
        style={style}
      />
    );
  }

  _onResize = () => this.setState({ width: window.innerWidth });
}

export default Media;
