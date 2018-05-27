import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import App from '~/routes/index';
import registerServiceWorker from './registerServiceWorker';


// if (process.env.REACT_APP_ENABLE_MOCK === 'true') {
//   require( './mock/index');  // eslint-disable-line
// }

configure({
  enforceActions: 'strict',
});

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

registerServiceWorker();
