import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineComment, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
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
import CommentStore from "../../../app/stores/commentStore";
import PostComment from "./PostComment";
import swal from "sweetalert";
interface Props {
    post: Post
    user?: User
}
export default observer(function PostWithPhoto({ post, user }: Props) {
    const { postStore, profileStore, commentStore } = useDarkMode()
    let { loadProfile } = profileStore
    //built in hooks
    const [postsShareDrop, setpostsShareDrop] = useState(0)

    //custom hooks
    const { activitystore } = useDarkMode()
    const { postDrop, setPostDropDown, updateLike } = postStore
    const { darkMode } = activitystore

    //classnames
    const posts = classNames("post-with-photo", { "post-with-photo-dark": darkMode })
    const Names = classNames("mb-0 post-with-photo-user-name", { "post-with-photo-user-name-dark": darkMode })
    const Footer = classNames("likes-count", { "likes-count-dark": darkMode })

    //local methods
    const handledropforposts = (id: number) => {
        postDrop !== id ? setPostDropDown(id) : setPostDropDown(0)
    }

    const handleComments = (id: number) => {
        commentStore.commentMode !== id ? commentStore.setCommentMode(id) : commentStore.setCommentMode(0)
    }
    const handleSharedropforposts = (id: number) => {
        postsShareDrop !== id ? setpostsShareDrop(id) : setpostsShareDrop(0)
    }

    const handleClickUpdate = (post: PostFormValues, n: number) => {
        post.id = n
        postStore.setEditMode(0)
        postStore.updateActivity(post!)
        swal("Your post has been updated!", {
            icon: "success",
        });
    }
    let id = 0
    const validationSchema = Yup.object(
        {
            title: Yup.string().required("The title is required"),
        }
    )
    return (
        <>
            {console.log(post)}
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
                    {console.log(post)}
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
                    post.filePath &&
                    <div className='post-with-photo-pic'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <a href="#">
                                    <img src={post.filePath} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                }
                <div className='post-with-photo-footer d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <a onClick={() => updateLike(post.id, post.liking, post.createdByUser.userName)} className='likes d-flex align-items-center me-4'>
                            <AiOutlineLike className={post.liking ? 'likes-icon liked-icon' : 'likes-icon'} />
                            <span className={Footer}>{post.likeCount} Like</span>
                        </a>
                        <div className='likes d-flex align-items-center comments-btn ' onClick={() => handleComments(post.id)}>
                            <AiOutlineComment className='comments-icon' />
                            <span className={Footer}>{post.comments?.length} Comment</span>
                        </div>
                    </div>
                    <label>
                        <AiOutlineShareAlt onClick={() => handleSharedropforposts(1)} className='share-icon me-1' />
                        <span className={Footer}>Share</span>
                    </label>
                    {postsShareDrop === 1 &&
                        <PostShareDropdown />
                    }
                </div>
                {commentStore.commentMode === post.id &&
                    <PostComment postId={post.id} />
                }
            </div >
        </>
    )
})

