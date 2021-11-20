import classNames from "classnames";
import React from "react";
import { UseChatMode } from "../../../app/stores/store";
import './Main.scss'
import StorySlider from "./StrorySlider";

export default function Main() {

    const { chatstore } = UseChatMode()
    const { ChatMode } = chatstore

    const menuContent = classNames("main-content ", { "main-content-chatopen": ChatMode })
    return (
        <div className={menuContent}>
            <div className='main-content-wrapper'>
                <div className='main-content-container'>
                    <div className='row feed-body'>
                        <div className='main-content-left col-xl-9 col-lg-9 '>
                            <StorySlider />
                        </div>
                        <div className='main-content-right col-xl-3 col-lg-3 d-lg-block d-none'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}