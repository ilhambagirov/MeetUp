import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import { User } from "../../../app/models/user";
import { useDarkMode } from "../../../app/stores/store";
import CreatePost from "../Main/CreatePost";
import '../Main/Main.scss'
import PopularEvents from "../Main/PopularEvents";
import PostWithPhoto from "../Main/PostWithPhoto";
import './UserProfile.scss'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"

export default observer(function UserProfile() {
    const { postStore, profileStore } = useDarkMode();
    const { groupedPosts } = postStore
    const { profile } = profileStore
    // let { user } = userStore
    const user = profile as User

    useEffect(() => {
        var point = window.location.pathname.lastIndexOf('/')
        profileStore.loadProfile(window.location.pathname.substring(point + 1))
    }, [profileStore.loadProfile])
    return (
        <div className='main-content'>
            <div className='UserProfile-wrapper'>
                <div className='UserProfile-body'>
                    <Tabs>
                        <div className='col-xl-12 userprofile-header'>
                            <div className='header-content mb-3 mt-3'>
                                <div className='background-image-profile '></div>
                                <div className="header-body">
                                    <figure className='user-prof-image'>
                                        <img className='w-100' src={user?.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                                    </figure>
                                    <h4 style={{ fontWeight: 700, letterSpacing: 0.4, fontSize: 18 }} className='mb-0'>{user?.dsiplayName}</h4>
                                    <span className='username-user-profile'>{user?.userName}</span>
                                    <div className='features-following d-flex align-items-center pt-0 position-absolute left-15 top-10 mt-3 ms-1'>
                                        <h4 style={{ fontWeight: 600 }}>
                                            <b>5</b>
                                            <span>Posts</span>
                                        </h4>
                                        <h4 style={{ fontWeight: 600 }}>
                                            <b>25.2m</b>
                                            <span>Followers</span>
                                        </h4>
                                        <h4 style={{ fontWeight: 600 }}>
                                            <b>237</b>
                                            <span>Following</span>
                                        </h4>
                                    </div>
                                    <a href="" className='follow-btn-left position-absolute'>Follow</a>

                                    <div className='feature-btns d-flex align-items-center justify-content-center position-absolute right-15 top-10 mt-2 me-2'>
                                        <a href="" className='follow-btn'>Follow</a>
                                        <a href="" className='other-btns-user-profile'>
                                            <BsEnvelope />
                                        </a>
                                        <a className='other-btns-user-profile' href="">
                                            <BiDotsHorizontalRounded />
                                        </a>
                                    </div>
                                </div>
                                <div className='header-footer'>
                                    <TabList className='ps-4 d-flex'>
                                        <Tab className='me-5 pt-3 pb-3 ls-1 d-inline-block'>All</Tab>
                                        <Tab className='me-5 pt-3 pb-3 ls-1 d-inline-block'>Gallery</Tab>
                                    </TabList>
                                </div>
                            </div>
                        </div>
                        <TabPanel>
                            <div className="row row-custom-user-profile">
                                <div className='col-xl-4 col-xxl-4 col-lg-4 userprofile-left'>
                                    <PopularEvents />
                                </div>
                                <div className='col-xl-8 col-xxl-8 col-lg-8 userprofile-right mt-3'>
                                    <CreatePost />
                                    {groupedPosts.map((post) => (
                                        <>
                                            {console.log(post)}
                                            <PostWithPhoto key={post.id}
                                                post={post.value}
                                                user={user} />
                                        </>
                                    ))}
                                </div >
                            </div >
                        </TabPanel>
                        <TabPanel>
                            <div className="row d-flex row-custom-user-profile">
                                {user?.photos?.map((item) => (
                                    <div className='col-xl-3 text-center col-xxl-4 col-lg-3 userprofile-pics mt-3' key={item.id}><img src={item.url} alt="" /></div>
                                ))}
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    )
})