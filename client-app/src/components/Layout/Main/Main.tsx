import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Button, Loader } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/pagination";
import { UseChatMode } from "../../../app/stores/chatboxstore";
import { useDarkMode } from "../../../app/stores/store";
import ChatBox from "../ChatBox/ChatBox";
import CreatePost from "./CreatePost";
import './Main.scss'
import PeopleRecomended from "./PeopleRecomended";
import PopularEvents from "./PopularEvents";
import PostWithPhoto from "./PostWithPhoto";
import StorySlider from "./StrorySlider";

export default observer(function Main() {
    //custom hooks
    const { chatstore } = UseChatMode()
    const { activitystore, postStore, chatStore } = useDarkMode()
    const { ChatMode } = chatstore
    const { darkMode } = activitystore
    const { pagination, setPagingParams, loadActivitiesPagination } = postStore

    const [loadingNext, setLoadingNext] = useState(false)

    const handleGetNext = () => {
        setLoadingNext(true)
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivitiesPagination().then(() => setLoadingNext(false))
    }

    const menuContent = classNames("main-content ", { "main-content-chatopen": ChatMode, "darkmode-maincontent": darkMode })
    useEffect(() => {
        postStore.loadActivities()
    }, [postStore.loadActivities])
    return (
        <div className={menuContent}>
            <div className='main-content-wrapper'>
                <div className='main-content-container'>
                    <div className='row feed-body'>
                        <div className='main-content-left col-xl-8 col-lg-9 col-12 '>
                            <StorySlider />
                            <CreatePost />
                            {chatStore.boxMode &&
                                <ChatBox />
                            }
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={handleGetNext}
                                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                initialLoad={false}
                            >
                                {postStore.groupedPosts.map((post) => (
                                    <>
                                        {console.log(postStore.groupedPosts)}
                                        <PostWithPhoto key={post.id} post={post.value} />
                                    </>
                                ))}
                            </InfiniteScroll>
                            <Loader active={loadingNext} />
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