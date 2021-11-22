import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { dark, useDarkMode } from "../../../app/stores/store";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { VscSave } from "react-icons/vsc";
import { BiBlock } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";

export default observer(function PostWithPhoto() {

    //built in hooks
    const [postsdrop, setPostsDrop] = useState(false)

    //custom hooks
    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    //classnames
    const posts = classNames("post-with-photo", { "post-with-photo-dark": darkMode })
    const Names = classNames("mb-0 post-with-photo-user-name", { "post-with-photo-user-name-dark": darkMode })
    const Footer = classNames("likes-count", { "likes-count-dark": darkMode })
    const postsDrop = classNames("posts-drop", { "posts-drop-dark": darkMode })
    const desc = classNames("desc", { "desc-dark": darkMode })

    //local methods
    const handledropforposts = () => {
        setPostsDrop(!postsdrop)
    }

    return (
        <>
            <div className={posts}>
                <div className='post-with-photo-header d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <span className='post-with-photo-user-photo me-3'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-12.png').default} alt="" />
                        </span>
                        <div className='d-flex flex-column post-with-photo-header-left'>
                            <h4 style={{ fontWeight: 700 }} className={Names}>
                                Ilham Baghirov
                            </h4>
                            <span>
                                2 hour ago
                            </span>
                        </div>
                    </div>
                    <span className='post-with-photo-menu'>
                        <BsThreeDots onClick={() => handledropforposts()} />
                    </span>

                    {postsdrop &&
                        <div className={postsDrop} >
                            <a className='d-flex not-drop d-flex align-items-center mb-0' href="">
                                <VscSave className='me-3' />
                                <h4 className='mb-0 me-4'>
                                    <span className={desc}>Save Post</span>
                                    <span className='mt-1'>Add this to your saved items</span>
                                </h4>
                            </a>
                            <a className='d-flex not-drop d-flex align-items-center mb-0 mt-2' href="">
                                <BiBlock className='me-3' />
                                <h4 className='mb-0 me-4'  >
                                    <span className={desc}>Block User</span>
                                    <span className='mt-1'>Add this to your saved items</span>
                                </h4>
                            </a>
                            <a className='d-flex not-drop d-flex align-items-center mb-0 mt-2' href="">
                                <RiUserUnfollowLine className='me-3' />
                                <h4 className='mb-0 me-4'>
                                    <span className={desc}>Unfollow</span>
                                    <span className='mt-1'>Add this to your saved items</span>
                                </h4>
                            </a>
                        </div>
                    }
                </div>

                <div className='post-with-photo-quote'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur possimus nesciunt neque deleniti dolores, nobis ratione itaque,
                        adipisci architecto, aspernatur repudiandae aliquid. Nobis alias natus nihil dolore architecto.
                        Veritatis, amet.
                        <a href="">See More</a></p>
                </div>
                <div className='post-with-photo-pic'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <a href="#">
                                <img src={require('../../../assets/images/t-31.jpg').default} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='post-with-photo-footer d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <a className='likes d-flex align-items-center me-4' href="">
                            <FcLike className='likes-icon' />
                            <span className={Footer}>2.8K Like</span>
                        </a>
                        <a className='likes d-flex align-items-center ' href="">
                            <AiOutlineComment className='likes-icon' />
                            <span className={Footer}>22 Comment</span>
                        </a>
                    </div>
                    <a href="">
                        <AiOutlineShareAlt className='share-icon me-1' />
                        <span className={Footer}>Share</span>
                    </a>
                </div>
            </div>
            <div className={posts}>
                <div className='post-with-photo-header d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <span className='post-with-photo-user-photo me-3'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-8.png').default} alt="" />
                        </span>
                        <div className='d-flex flex-column post-with-photo-header-left'>
                            <h4 style={{ fontWeight: 700 }} className={Names}>
                                Aysel Baghirova
                            </h4>
                            <span>
                                2 hour ago
                            </span>
                        </div>
                    </div>
                    <span className='post-with-photo-menu'>
                        <BsThreeDots onClick={() => handledropforposts()} />
                    </span>
                    {postsdrop &&
                        <div className={postsDrop} >
                            <a className='d-flex not-drop d-flex align-items-center mb-0' href="">
                                <VscSave className='me-3' />
                                <h4 className='mb-0 me-4'>
                                    <span className={desc}>Save Post</span>
                                    <span className='mt-1'>Add this to your saved items</span>
                                </h4>
                            </a>
                            <a className='d-flex not-drop d-flex align-items-center mb-0 mt-2' href="">
                                <BiBlock className='me-3' />
                                <h4 className='mb-0 me-4'  >
                                    <span className={desc}>Block User</span>
                                    <span className='mt-1'>Add this to your saved items</span>
                                </h4>
                            </a>
                            <a className='d-flex not-drop d-flex align-items-center mb-0 mt-2' href="">
                                <RiUserUnfollowLine className='me-3' />
                                <h4 className='mb-0 me-4'>
                                    <span className={desc}>Unfollow</span>
                                    <span className='mt-1'>Add this to your saved items</span>
                                </h4>
                            </a>
                        </div>
                    }
                </div>

                <div className='post-with-photo-quote'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur possimus nesciunt neque deleniti dolores, nobis ratione itaque,
                        adipisci architecto, aspernatur repudiandae aliquid. Nobis alias natus nihil dolore architecto.
                        Veritatis, amet.
                        <a href="">See More</a></p>
                </div>
                <div className='post-with-photo-footer d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <a className='likes d-flex align-items-center me-4' href="">
                            <FcLike className='likes-icon' />
                            <span className={Footer}>2.8K Like</span>
                        </a>
                        <a className='likes d-flex align-items-center ' href="">
                            <AiOutlineComment className='likes-icon' />
                            <span className={Footer}>22 Comment</span>
                        </a>
                    </div>
                    <a href="">
                        <AiOutlineShareAlt className='share-icon me-1' />
                        <span className={Footer}>Share</span>
                    </a>
                </div>
            </div>
        </>
    )
})