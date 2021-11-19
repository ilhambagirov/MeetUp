import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Layout/Header/Header';
import { observer } from 'mobx-react-lite';
import Navigation from './components/Layout/Navigation/Navigation';
import Main from './components/Layout/Main/Main';


export default observer(function App() {
  return (
    <>

      <div className='custom-container'>
        <Header />
        <Navigation />
        <Main />
      </div>
    </>
  );
})

