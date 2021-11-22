import React from "react";
import { MdOutlineCreate } from 'react-icons/md'
import { FiImage } from 'react-icons/fi'
import './Main.scss'


export default function CreatePost() {
    return (
        <div className='post-add'>
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
                <textarea className='post-textarea' name="" id="" placeholder="What's on your mind?"></textarea>
            </div>
            <div className='post-footer'>
                <a href="">
                    <FiImage />
                    <span className='image-video-post'>Photo/Video</span>
                </a>
            </div>
        </div>
    )
}
