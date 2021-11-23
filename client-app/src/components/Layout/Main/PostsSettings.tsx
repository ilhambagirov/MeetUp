import classNames from "classnames";
import React from "react";
import { BiBlock } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { VscSave } from "react-icons/vsc";
import { useDarkMode } from "../../../app/stores/store";
import './Main.scss'



export default function PostsSettings() {

    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    const postsDrop = classNames("posts-drop posts-drop-settings-position", { "posts-drop-dark": darkMode })
    const desc = classNames("desc", { "desc-dark": darkMode })

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
                    <span className={desc}>Unfollow</span>
                    <span className='mt-1'>Add this to your saved items</span>
                </h4>
            </a>
        </div>
    )
}

