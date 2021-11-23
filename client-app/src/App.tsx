import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Layout/Header/Header';
import { observer } from 'mobx-react-lite';
import Navigation from './components/Layout/Navigation/Navigation';
import Main from './components/Layout/Main/Main';
import classNames from 'classnames';
import ChatList from './components/Layout/ChatBox/ChatList';
import { useDarkMode } from './app/stores/store';
import ChatDisable from './components/Layout/ChatBox/ChatDisable';
import Login from './components/Layout/Login/Login';

export default observer(function App() {

  const { activitystore } = useDarkMode()
  const { darkMode } = activitystore

  const container = classNames("custom-container", { containerdark: darkMode })
  const wrapper = classNames("wrapper", { containerdark: darkMode })
  return (
    <div className={wrapper}>
      <div className={container}>
        {/* <Login/> */}
        <Header />
        <Navigation />
        <Main />
        <ChatList />
      </div>
    </div>
  );
})


