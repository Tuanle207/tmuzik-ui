import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-contexify/dist/ReactContexify.css';
import './assets/scss/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('main')
);