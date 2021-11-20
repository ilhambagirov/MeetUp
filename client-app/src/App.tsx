import React, { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Header from './components/Layout/Header/Header';
import { observer } from 'mobx-react-lite';
import Navigation from './components/Layout/Navigation/Navigation';
import Main from './components/Layout/Main/Main';
import { UseChatMode, useDarkMode } from './app/stores/store';
import classNames from 'classnames';
import ChatList from './components/Layout/ChatBox/ChatList';



export default observer(function App() {

  const [isChatOpen, setIsChatOpen] = useState(false)

  const { activitystore } = useDarkMode()
  const { darkMode } = activitystore

  const { chatstore } = UseChatMode()
  const { ChatMode } = chatstore

  const container = classNames("custom-container", { containerdark: darkMode })
  const wrapper = classNames("wrapper", { containerdark: darkMode })
  console.log(ChatMode)
  return (
    <div className={wrapper}>
      <div className={container}>
        <Header />
        <Navigation />
        <Main />
        {ChatMode &&
          <ChatList />
        }
      </div>
    </div>
  );
})


