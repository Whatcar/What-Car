import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log(process.env.REACT_APP_TEST);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
