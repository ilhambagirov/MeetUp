import React, { useState } from "react";
import { FcLike } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { useDarkMode } from "../../../app/stores/store";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import './Main.scss'
import PostsSettings from "./PostsSettings";
import PostShareDropdown from "./PostsShareDropDown";
import { Post, PostFormValues } from "../../../app/models/post";
import MyTextInput from "../../../app/common/MyTextInput";
import * as Yup from 'yup'
import { Formik } from "formik";
import { User } from "../../../app/models/user";
import { Link } from "react-router-dom";
import { profile } from "console";

interface Props {
    post: Post
    user?: User
}
export default observer(function PostWithPhoto({ post, user }: Props) {
    const { postStore, profileStore } = useDarkMode()
    let { loadProfile } = profileStore
    //built in hooks
    const [postsShareDrop, setpostsShareDrop] = useState(0)

    //custom hooks
    const { activitystore } = useDarkMode()
    const { postDrop, setPostDropDown } = postStore
    const { darkMode } = activitystore

    //classnames
    const posts = classNames("post-with-photo", { "post-with-photo-dark": darkMode })
    const Names = classNames("mb-0 post-with-photo-user-name", { "post-with-photo-user-name-dark": darkMode })
    const Footer = classNames("likes-count", { "likes-count-dark": darkMode })

    //local methods
    const handledropforposts = (id: number) => {
        postDrop !== id ? setPostDropDown(id) : setPostDropDown(0)
    }
    const handleSharedropforposts = (id: number) => {
        postsShareDrop !== id ? setpostsShareDrop(id) : setpostsShareDrop(0)
    }

    const handleClickUpdate = (post: PostFormValues, n: number) => {
        post.id = n
        console.log(n)
        postStore.updateActivity(post!)
        postStore.setEditMode(0)
    }
    let id = 0
    const validationSchema = Yup.object(
        {
            title: Yup.string().required("The title is required"),
        }
    )
    return (
        <>
            <div className={posts}>
                <div className='post-with-photo-header d-flex align-items-center justify-content-between'>
                    {window.location.pathname.includes('/userprofile') ?
                        <div className='d-flex align-items-center'>
                            <span className='post-with-photo-user-photo me-3'>
                                <img className='user-profile-pic' src={post.createdByUser?.image || user?.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                            </span>
                            <div className='d-flex flex-column post-with-photo-header-left'>
                                <h4 style={{ fontWeight: 700 }} className={Names}>
                                    {post.createdByUser?.dsiplayName || user?.dsiplayName}
                                </h4>
                                <span>
                                    2 hours ago
                                </span>
                            </div>
                        </div>
                        :
                        <div className='d-flex align-items-center' onClick={() => loadProfile(post.createdByUser?.userName)}>
                            <Link to={`/userprofile/${post.createdByUser?.userName}`}>
                                <span className='post-with-photo-user-photo me-3'>
                                    <img className='user-profile-pic' src={post.createdByUser?.image || user?.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                                </span>
                            </Link>
                            <Link to={`/userprofile/${post.createdByUser?.userName}`} >
                                <div className='d-flex flex-column post-with-photo-header-left'>
                                    <h4 style={{ fontWeight: 700 }} className={Names}>
                                        {post.createdByUser?.dsiplayName || user?.dsiplayName}
                                    </h4>
                                    <span>
                                        2 hours ago
                                    </span>
                                </div>
                            </Link>
                        </div>
                    }
                    <span className='post-with-photo-menu'>
                        <BsThreeDots onClick={() => handledropforposts(post.id)} />
                    </span>

                    {postDrop === post.id &&
                        <PostsSettings post={post} />
                    }
                </div>

                <div className='post-with-photo-quote'>

                    {postStore.editMode != post.id &&
                        <p>{post.title}
                            <a href="">See More</a></p>}
                    {
                        postStore.editMode == post.id &&
                        <Formik validationSchema={validationSchema}
                            onSubmit={(values) => {
                                handleClickUpdate(values, post.id)
                            }}
                            enableReinitialize
                            initialValues={{ title: ({ ...post }).title }}
                        >
                            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                <form className="d-flex editform" onSubmit={handleSubmit}>
                                    <MyTextInput name='title' style="editinp" placeholder="Edit your post title" />
                                    <div className="d-flex justify-content-end">
                                        <button className="editbtns ms-2 bg-success" type="submit">Save</button>
                                        <button onClick={() => postStore.setEditMode(0)} className="editbtns ms-2 bg-warning" type="submit">Cancel</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    }
                </div>
                {
                    post.image &&
                    <div className='post-with-photo-pic'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <a href="#">
                                    <img src={require('../../../assets/images/t-31.jpg').default} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                }
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
                    <label>
                        <AiOutlineShareAlt onClick={() => handleSharedropforposts(1)} className='share-icon me-1' />
                        <span className={Footer}>Share</span>
                    </label>
                    {postsShareDrop === 1 &&
                        <PostShareDropdown />
                    }
                </div>
            </div >
            {/* <div className={posts}>
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
                        <BsThreeDots onClick={() => handledropforposts(2)} />
                    </span>
                    {postsdrop == 2 &&
                        <PostsSettings />
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
                    <label >
                        <AiOutlineShareAlt onClick={() => handleSharedropforposts(2)} className='share-icon me-1' />
                        <span className={Footer}>Share</span>
                    </label>
                    {postsShareDrop === 2 &&
                        <PostShareDropdown />
                    }
                </div>
            </div> */}
        </>
    )
})

