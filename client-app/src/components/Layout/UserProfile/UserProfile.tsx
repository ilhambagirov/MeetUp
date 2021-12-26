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


export default observer(function UserProfile() {
    const { postStore, userStore } = useDarkMode();
    const { groupedPosts } = postStore
    let { user } = userStore 
    user = user as  User
    return (
        <div className='main-content'>
            <div className='UserProfile-wrapper'>
                <div className='UserProfile-body'>
                    <div className="row row-custom-user-profile">
                        <div className='col-xl-12 userprofile-header'>
                            <div className='header-content mb-3 mt-3'>
                                <div className='background-image-profile '></div>
                                <div className="header-body">
                                    <figure className='user-prof-image'>
                                        <img className='w-100' src={require('../../../assets/images/pt-1.jpg').default} alt="" />
                                    </figure>
                                    <h4 style={{ fontWeight: 700, letterSpacing: 0.4, fontSize: 18 }} className='mb-0'>{user?.dsiplayName}</h4>
                                    <span className='username-user-profile'>{user?.userName}</span>
                                    <div className='features-following d-flex align-items-center pt-0 position-absolute left-15 top-10 mt-3 ms-1'>
                                        <h4 style={{ fontWeight: 600 }}>
                                            <b>456</b>
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
                                    <ul className='ps-4 d-flex'>
                                        <li className='me-5'>
                                            <a className=' pt-3 pb-3 ls-1 d-inline-block' href="">About</a>
                                        </li>
                                        <li className='me-5'>
                                            <a className=' pt-3 pb-3 ls-1 d-inline-block' href="">Media</a>
                                        </li>
                                        <li className='me-5'>
                                            <a className=' pt-3 pb-3 ls-1 d-inline-block' href="">Events</a>
                                        </li>
                                        <li className='me-5'>
                                            <a className=' pt-3 pb-3 ls-1 d-inline-block' href="">Groups</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-xxl-4 col-lg-4 userprofile-left'>
                            <PopularEvents />
                        </div>
                        <div className='col-xl-8 col-xxl-8 col-lg-8 userprofile-right mt-3'>
                            <CreatePost />
                            {groupedPosts.map((post) => (
                                <PostWithPhoto key={post.id} post={post.value} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})