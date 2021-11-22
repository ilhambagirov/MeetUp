import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import { UseChatMode } from "../../../app/stores/chatboxstore";
import { dark, useDarkMode } from "../../../app/stores/store";
import './ChatBox.scss'

export default observer(function Main() {
    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         setTimeout(() => {
    //             if (ChatMode) {
    //                 setChatMode()
    //             }
    //         }, 2000);
    //     });
    // })

    //custom hooks
    const { chatstore } = UseChatMode();
    const { ChatMode, } = chatstore
    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    //classnames
    const darkmode = classNames("chat-list-content", { "chat-list-content-dark": darkMode })
    const names = classNames("friends-names", { "friends-names-dark": darkMode })
    let chatList = classNames("chat-List right-scroll-bar", { chatmodeopen: ChatMode })

    return (
        <div className={chatList}>
            <div className={darkmode}>
                <section className='chatlist-friends'>
                    <h6 style={{ fontWeight: 700, letterSpacing: 1 }} className='chat-list-header'>Friends</h6>
                    <ul className='friends-list'>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-12.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='notification-chatlist'>2</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-8.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='offline-chatlist'>2days</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-12.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='notification-chatlist'>2</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='offline-chatlist'>2days</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
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
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='notification-chatlist'>2</span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-8.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
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
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                        <li className='d-flex align-items-center pe-0 ps-0 pt-2 pb-2'>
                            <span className='me-2'>
                                <img className='friends-profile-img' src={require('../../../assets/images/user-8.png').default} alt="" />
                            </span>
                            <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                                <a className={names} href="">Hurin Seary</a>
                            </h3>
                            <span className='online-chatlist'></span>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    )
})