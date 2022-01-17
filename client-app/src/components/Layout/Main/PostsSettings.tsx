import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiBlock } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { VscSave } from "react-icons/vsc";
import { Post } from "../../../app/models/post";
import { User } from "../../../app/models/user";
import { useDarkMode } from "../../../app/stores/store";
import './Main.scss'


interface Props {
    post: Post
}
export default observer(function PostsSettings({ post }: Props) {

    const { activitystore, postStore, userStore } = useDarkMode()
    const { darkMode } = activitystore
    const { deletePost, updateActivity, setPostDropDown } = postStore
    let { user } = userStore
    user = user as User
    console.log(post)

    const postsDrop = classNames("posts-drop posts-drop-settings-position", { "posts-drop-dark": darkMode })
    const desc = classNames("desc", { "desc-dark": darkMode })

    const handleClick = (e: any) => {
        e.preventDefault();
        console.log(post.id)
        deletePost(post.id)
    }
    return (
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
                    {post.createdByUser.following === true ?
                        <span className={desc}>Unfollow</span>
                        :
                        <span className={desc}>Follow</span>
                      }
                    <span className='mt-1'>Add this to your saved items</span>
                </h4>
            </a>
            {
                (user?.userName === post?.createdByUser.userName || window.location.pathname === `/userprofile/${user.userName}`) &&
                <><a onClick={handleClick} className='d-flex not-drop d-flex align-items-center mb-0 mt-2'>
                    <AiOutlineDelete className='me-3' />
                    <h4 className='mb-0 me-4'>
                        <span className={desc}>Delete</span>
                        <span className='mt-1'>You will delete this post</span>
                    </h4>
                </a>
                    <a onClick={() => {
                        postStore.setEditMode(post.id)
                        setPostDropDown(1)
                    }} className='d-flex not-drop d-flex align-items-center mb-0 mt-2'>
                        <FiEdit2 className='me-3' />
                        <h4 className='mb-0 me-4'>
                            <span className={desc}>Edit</span>
                            <span className='mt-1'>You will edit this post</span>
                        </h4>
                    </a>
                </>
            }
        </div>
    )
})

