import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { setTimeout } from "timers";
import { UseChatMode } from "../../../app/stores/chatboxstore";
import './ChatBox.scss'
import UserWindow from "./ChatDisable";

export default observer(function Main() {
    const { chatstore } = UseChatMode();
    const { ChatMode, setChatMode } = chatstore

    let chatList = classNames("chat-List right-scroll-bar", { chatmodeopen: ChatMode })

    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         setTimeout(() => {
    //             if (ChatMode) {
    //                 setChatMode()
    //             }
    //         }, 2000);
    //     });
    // })


    return (
        <div className={chatList}>
            <div className='chat-list-content'>
                <section className='chatlist-friends'>
                    <h6 style={{ fontWeight: 700, letterSpacing: 1 }} className='chat-list-header'>Friends</h6>
                    <ul className='friends-list'>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-12.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='notification-chatlist'>2</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-8.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='offline-chatlist'>2days</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-12.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='notification-chatlist'>2</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='offline-chatlist'>2days</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='offline-chatlist'>2days</span>
                        </li>
                    </ul>
                </section>
                <section className='chatlist-friends'>
                    <h6 style={{ fontWeight: 700, letterSpacing: 1 }} className='chat-list-header'>Groups</h6>
                    <ul className='friends-list'>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-12.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='notification-chatlist'>2</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-8.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='offline-chatlist'>2days</span>
                        </li>
                    </ul>
                </section>

                <section className='chatlist-friends'>
                    <h6 style={{ fontWeight: 700, letterSpacing: 1 }} className='chat-list-header'>Pages</h6>
                    <ul className='friends-list'>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-12.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-8.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className='friends-names' href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
})