import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';

import rootRoute from './routes';

render(
  <Router routes={rootRoute} />,
  document.getElementById('root')
);
