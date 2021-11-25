import React from "react";
import ChatList from "../Layout/ChatBox/ChatList";
import Header from "../Layout/Header/Header";
import Main from "../Layout/Main/Main";
import Navigation from "../Layout/Navigation/Navigation";

export default function Feed() {
    return (
        <>
            <Header />
            <Navigation />
            <Main />
            <ChatList />
        </>
    )
}