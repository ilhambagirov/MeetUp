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
import { TailSpin } from 'react-loader-spinner'

export default observer(function Main() {
    //custom hooks
    const { chatstore } = UseChatMode()
    const { activitystore, postStore, chatStore, commentStore } = useDarkMode()
    const { ChatMode } = chatstore
    const { darkMode } = activitystore
    const { pagination, setPagingParams, loadActivitiesPagination, loading } = postStore
    const [loadingNext, setLoadingNext] = useState(false)
    const [spinner, setSpinner] = useState(false)


    const handleGetNext = () => {
        setLoadingNext(true)
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivitiesPagination()
        setLoadingNext(false)
    }

    const menuContent = classNames("main-content ", { "main-content-chatopen": ChatMode, "darkmode-maincontent": darkMode })
    useEffect(() => {
        setSpinner(true)
        postStore.loadActivities()
        chatStore.getUsersRecomended()
        setTimeout(() => {
            setSpinner(false)
        }, 500);
    }, [postStore.loadActivities])
    return (

        <div className={menuContent}>
            {
                spinner ?
                    <div className="d-flex justify-content-center mb-5 post-loader">
                        <TailSpin
                            height={50}
                            width="50"
                            color='#0d6efd'
                            ariaLabel='loading'
                        />
                    </div>
                    :
                    <div className='main-content-wrapper'>
                        <div className='main-content-container'>
                            <div className='row feed-body'>
                                <div className='main-content-left col-xl-10 col-lg-9 col-12 '>
                                    {loading ?
                                        <div className="d-flex justify-content-center mb-5 post-loader">
                                            <TailSpin
                                                height={50}
                                                width="50"
                                                color='#0d6efd'
                                                ariaLabel='loading'
                                            />
                                        </div>
                                        :
                                        <>
                                            <PeopleRecomended users={chatStore.usersRecomended} />
                                            <CreatePost />

                                            <InfiniteScroll
                                                pageStart={0}
                                                loadMore={handleGetNext}
                                                hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                                                initialLoad={false}
                                                loader={<div className="d-flex justify-content-center mb-5">
                                                    <TailSpin
                                                        height={50}
                                                        width="50"
                                                        color='#0d6efd'
                                                        ariaLabel='loading'
                                                    />
                                                </div>}
                                            >
                                                {postStore.groupedPosts.map((post) => (
                                                    <>
                                                        <PostWithPhoto key={post.id} post={post.value} />
                                                    </>
                                                ))}{console.log(postStore.groupedPosts)}
                                            </InfiniteScroll></>
                                    }
                                    {/* <StorySlider /> */}

                                </div>

                                {/* <div className='main-content-right col-xl-4 col-lg-3 d-lg-block d-none'>
                            <PopularEvents />
                        </div> */}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
})