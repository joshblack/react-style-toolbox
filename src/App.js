import React from 'react';
import Media from './components/Media';
import Focus from './components/Focus';
import Hover from './components/Hover';
import { compose } from './utils/StyleSheet';

let Box = ({
  onMouseOver,
  onMouseOut,
  onFocus,
  onBlur,
  style
}) => (
  <div
    style={style.box}
    tabIndex="1"
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

const CSS = compose(Media, Focus, Hover);

Box = CSS(Box, {
  box: {
    width: 100,
    height: 100,
    transition: '0.3s all ease',
    cursor: 'pointer',
    backgroundColor: 'black',
    ':hover': {
      backgroundColor: 'blue'
    },
    ':focus': {
      backgroundColor: 'green'
    },
    '@media screen and (min-width: 500px)': {
      width: 150,
      height: 150,
      backgroundColor: 'yellow',
      ':hover': {
        backgroundColor: 'red'
      }
    },
  }
});


class App extends React.Component {
  render() {
    return (
      <div style={styles.container}>
        <Box />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: '1 1 0%'
  },
};

export default App;
