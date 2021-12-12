import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { UseChatMode } from "../../../app/stores/chatboxstore";
import { useDarkMode } from "../../../app/stores/store";
import CreatePost from "./CreatePost";
import './Main.scss'
import PeopleRecomended from "./PeopleRecomended";
import PopularEvents from "./PopularEvents";
import PostWithPhoto from "./PostWithPhoto";
import StorySlider from "./StrorySlider";

export default observer(function Main() {

    //custom hooks
    const { chatstore } = UseChatMode()
    const { activitystore, postStore } = useDarkMode()
    const { ChatMode } = chatstore
    const { darkMode } = activitystore

    const menuContent = classNames("main-content ", { "main-content-chatopen": ChatMode, "darkmode-maincontent": darkMode })
    console.log(ChatMode)

    useEffect(() => {
        postStore.loadActivities()
    }, [postStore.loadActivities])
    { console.log(postStore.postRegistry) }
    return (
        <div className={menuContent}>
            <div className='main-content-wrapper'>
                <div className='main-content-container'>
                    <div className='row feed-body'>
                        <div className='main-content-left col-xl-8 col-lg-9 col-12 '>
                            <StorySlider />
                            <CreatePost />
                            <PostWithPhoto />
                            <PeopleRecomended />
                        </div>
                        <div className='main-content-right col-xl-4 col-lg-3 d-lg-block d-none'>
                            <PopularEvents />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})