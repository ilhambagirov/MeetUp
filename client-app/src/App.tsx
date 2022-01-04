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
import NotFound from './components/Layout/Errors/NotFound';
import { useDarkMode } from './app/stores/store';
import Login from './components/Layout/Login/Login';
import Register from './components/Layout/Register/Register';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import Settings from './components/Layout/Settings/Settings';
import AccountDetails from './components/Layout/Account/AccountDetails/AccountDetails';
import SavedAddress from './components/Layout/Account/SavedAddress/SavedAddress';
import SocialAccount from './components/Layout/Account/SocialAccounts/SocialAccount';
import PasswordChange from './components/Layout/Account/PasswordChange/PasswordChange';
import Help from './components/Layout/Settings/Help/Help';
import UserProfile from './components/Layout/UserProfile/UserProfile';
import { ToastContainer } from 'react-toastify'
import { Container } from 'semantic-ui-react';
import ServerError from './components/Layout/Errors/ServerError';
export default observer(function App() {

  const { activitystore, userStore } = useDarkMode()
  const { darkMode } = activitystore

  const wrapper = classNames("wrapper", { containerdark: darkMode })
  const location = useLocation();
  const path = location.pathname

  return (
    <div className={wrapper}>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      {
        path !== '/register' &&
        <Route path='/(.+)' render={() => (
          <>
            {
              userStore.isLoggedIn &&
              <><Header /><Navigation /><ChatList /></>
            }

            <Switch>
              <Route exact path='/home' render={() => (userStore.isLoggedIn ? (<Main />) : (<Redirect to="/" />))} />
              <Route path='/settings' render={() => (userStore.isLoggedIn ? (<Settings />) : (<Redirect to="/" />))} />
              <Route path='/accountdetails' render={() => (userStore.isLoggedIn ? (<AccountDetails />) : (<Redirect to="/" />))} />
              <Route path='/savedaddress' render={() => (userStore.isLoggedIn ? (<SavedAddress />) : (<Redirect to="/" />))} />
              <Route path='/socialaccount' render={() => (userStore.isLoggedIn ? (<SocialAccount />) : (<Redirect to="/" />))} />
              <Route path='/passwordchange' render={() => (userStore.isLoggedIn ? (<PasswordChange />) : (<Redirect to="/" />))} />
              <Route path='/help' render={() => (userStore.isLoggedIn ? (<Help />) : (<Redirect to="/" />))} />
              <Route path='/userprofile/' render={() => (userStore.isLoggedIn ? (<UserProfile />) : (<Redirect to="/" />))} />
              <Route path='/server-error' component={ServerError} />
              <Container>
                <Route component={NotFound} />
              </Container>
            </Switch>
          </>
        )} />
      }
    </div>
  );
})


