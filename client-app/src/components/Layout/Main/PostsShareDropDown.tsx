import classNames from "classnames";
import React from "react";
import { BiBlock } from "react-icons/bi";
import { RiUserUnfollowLine } from "react-icons/ri";
import { VscSave } from "react-icons/vsc";
import { useDarkMode } from "../../../app/stores/store";
import './Main.scss'



export default function PostShareDropdown() {

    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    const postsDrop = classNames("posts-drop posts-drop-position", { "posts-drop-dark": darkMode })
    const desc = classNames("desc", { "desc-dark": darkMode })

    return (
        <div className={postsDrop} >
            <h4 className='header-share-menu' style={{ fontWeight: 700 }}>Share</h4>
            <ul className='' style={{ padding: 0 }}>
                <li>
                    <li className='colors-settings'>
                        <label htmlFor="">
                            <input type="radio" name="" id="" />
                            <span style={{ backgroundColor: '#ffcc00' }} className='colors-settings-bg'></span>
                        </label>
                    </li>
                    <li className='colors-settings'>
                        <label htmlFor="">
                            <input type="radio" name="" id="" />
                            <span style={{ backgroundColor: 'teal' }} className='colors-settings-bg'></span>
                        </label>
                    </li>
                    <li className='colors-settings'>
                        <label htmlFor="">
                            <input type="radio" name="" id="" />
                            <span style={{ backgroundColor: '#5f9ea0' }} className='colors-settings-bg'></span>
                        </label>
                    </li>
                    <li className='colors-settings'>
                        <label htmlFor="">
                            <input type="radio" name="" id="" />
                            <span style={{ backgroundColor: 'red' }} className='colors-settings-bg'></span>
                        </label>
                    </li>
                    <li className='colors-settings'>
                        <label htmlFor="">
                            <input type="radio" name="" id="" />
                            <span style={{ backgroundColor: 'green' }} className='colors-settings-bg'></span>
                        </label>
                    </li>
                </li>
            </ul>
        </div>
    )
}