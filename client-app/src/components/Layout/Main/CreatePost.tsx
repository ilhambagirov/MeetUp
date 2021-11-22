import React from "react";
import { MdOutlineCreate } from 'react-icons/md'
import { FiImage } from 'react-icons/fi'
import './Main.scss'
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useDarkMode } from "../../../app/stores/store";


export default observer(function CreatePost() {
    //custom hooks
    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    //classnames
    const postAdd = classNames("post-add", { "postadd-dark-mode": darkMode })
    const postAddSpans = classNames("create-post-link", { "create-post-link-dark": darkMode })
    const postAddTextArea = classNames("post-textarea", { "post-textarea-dark": darkMode })
    return (
        <div className={postAdd}>
            <div className='post-header'>
                <a href="" className='d-flex align-items-center'>
                    <MdOutlineCreate className='create-button-post me-1' />
                    <span className='create-post-link'>Create Post</span>
                </a>
            </div>
            <div className='post-content'>
                <span className='me-2 my-profile-img-add-post-wrapper'>
                    <img className='my-profile-img-add-post' src={require('../../../assets/images/user-11.png').default} alt="" />
                </span>
                <textarea className={postAddTextArea} name="" id="" placeholder="What's on your mind?"></textarea>
            </div>
            <div className='post-footer'>
                <a href="">
                    <FiImage />
                    <span className={postAddSpans}>Photo/Video</span>
                </a>
            </div>
        </div>
    )
})
