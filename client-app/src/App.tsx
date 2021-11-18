import React, { Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';

function App() {
  return (
    <Fragment>
      <Header />
      <Main/>
    </Fragment>
  );
}

export default App;
