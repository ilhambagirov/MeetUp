import React from "react";
import { Route } from "react-router-dom";
import ChatList from "../Layout/ChatBox/ChatList";
import Header from "../Layout/Header/Header";
import Main from "../Layout/Main/Main";
import Navigation from "../Layout/Navigation/Navigation";
import Settings from "../Layout/Settings/Settings";

export default function HomePage() {
    return (
        <>

            <Header />
           
            <Route path='/feed' component={HomePage} />
            <Route path='/settings' component={Settings} />
        </>
    )
}