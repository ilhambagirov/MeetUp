import classNames from "classnames";
import React from "react";
import { BiCopy } from "react-icons/bi";
import { BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GrLinkedinOption } from "react-icons/gr";
import { useDarkMode } from "../../../app/stores/store";
import './Main.scss'



export default function PostShareDropdown() {

    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    const postsDrop = classNames("posts-drop posts-drop-share-position", { "posts-drop-dark": darkMode })
    const desc = classNames("header-share-menu", { "header-share-menu-dark": darkMode })
    const input = classNames("copy-link-input", { "copy-link-input-dark": darkMode })

    return (
        <div className={postsDrop} >
            <h4 className={desc} style={{ fontWeight: 700 }}>Share</h4>
            <ul className='d-flex' style={{ padding: 0 }}>
                <li className='colors-settings'>
                    <label htmlFor="">
                        <input type="radio" name="" id="" />
                        <span style={{ backgroundColor: '#ffcc00' }} className='colors-settings-bg'>
                            <BsInstagram className='social-media-Links' />
                        </span>
                    </label>
                </li>
                <li className='colors-settings'>
                    <label htmlFor="">
                        <input type="radio" name="" id="" />
                        <span style={{ backgroundColor: 'teal' }} className='colors-settings-bg'>
                            <FaFacebookF className='social-media-Links' />
                        </span>
                    </label>
                </li>
                <li className='colors-settings'>
                    <label htmlFor="">
                        <input type="radio" name="" id="" />
                        <span style={{ backgroundColor: '#5f9ea0' }} className='colors-settings-bg'>
                            <BsTwitter className='social-media-Links' />
                        </span>
                    </label>
                </li>
                <li className='colors-settings'>
                    <label htmlFor="">
                        <input type="radio" name="" id="" />
                        <span style={{ backgroundColor: 'red' }} className='colors-settings-bg'>
                            <GrLinkedinOption className='social-media-Links' />
                        </span>
                    </label>
                </li>
                <li className='colors-settings'>
                    <label htmlFor="">
                        <input type="radio" name="" id="" />
                        <span style={{ backgroundColor: 'green' }} className='colors-settings-bg'>
                            <BsWhatsapp className='social-media-Links' />
                        </span>
                    </label>
                </li>
            </ul>
            <h4 className='copy-link-share-menu' style={{ fontWeight: 700, color: '#adb5bd', fontSize: 13 }}>Copy Link</h4>
            <input className={input} type="text" />
            <BiCopy className='copy-link-icon' />
        </div>
    )
}