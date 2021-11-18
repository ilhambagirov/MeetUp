import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Layout/Header/Header';
import Main from './components/Layout/Main/Main';
import { observer } from 'mobx-react-lite';


export default observer(function App() {
  return (
    <>
      <Header/>
      <Main />
    </>
  );
})

