import React, { useRef, useState } from "react";
import { FaMeetup } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHome, AiOutlineHistory, AiOutlineUsergroupDelete, AiOutlineMenu } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdChatBubbleOutline } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { VscSettingsGear } from "react-icons/vsc";
import profile4 from '../../../assets/images/avatar3.jpg'
import user8 from '../../../assets/images/user-8.png'
import { Switch } from "antd"
import './Header.scss';
import 'antd/dist/antd.css'
import { observer } from "mobx-react-lite";
import classnames from 'classnames'
import { UseChatMode } from "../../../app/stores/chatboxstore";
import { useDarkMode } from "../../../app/stores/store";
import { UseSideBar } from "../../../app/stores/sidebarstore";
import { Link } from "react-router-dom";
import { User } from "../../../app/models/user";
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { PagingParams } from "../../../app/models/pagination";
import { TailSpin } from "react-loader-spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from "semantic-ui-react";

export default observer(function Header() {
    // built-in hooks
    const [notificiationDropdown, SetnotificiationDropdown] = useState(false);
    const [settingsDropdown, SetsettingsDropdown] = useState(false);
    const [checkedBoxDarkMode, SetcheckedBoxDarkMode] = useState(false);
    const [sidebarcollapsedmode, Setsidebarcollapsedmode] = useState(false);
    const [menuBackground, SetmenuBackground] = useState("");
    const [searchItem, setSearchItem] = useState("");

    //custom hooks
    const { activitystore, userStore, profileStore, chatStore, searchStore } = useDarkMode();
    const { chatstore } = UseChatMode();
    const { sidestore } = UseSideBar();
    const { darkMode, setDarkMode } = activitystore
    const { setChatMode } = chatstore
    const { setSideBarCollapseMode } = sidestore
    const { profile } = profileStore
    const user = userStore.user as User
    const user1 = profile as User


    //custom local methods
    function handleMenuBackColor(color: string) {
        menuBackground.length === 0 ? SetmenuBackground(color) : SetmenuBackground("");
    }
    const handleNotDropdown = () => {
        SetnotificiationDropdown(!notificiationDropdown)
    }
    const handleSettingsDropdown = () => {
        SetsettingsDropdown(!settingsDropdown);
    }
    const handleToggleiconDarkMode = () => {
        SetcheckedBoxDarkMode(!checkedBoxDarkMode)
    }
    const handleSideBarCollapseMode = () => {
        Setsidebarcollapsedmode(!sidebarcollapsedmode)
    }

    //classnames
    const navbardark = classnames({ navbardark: darkMode })
    const notificationDrop = classnames("notification-drop shadow-lg", { notificationdropdark: darkMode })
    const settingsDrop = classnames("settings-drop shadow-lg", { settingsdropdark: darkMode })
    const notificationHeader = classnames("fw-700 font-xs mb-4", { notificationheaderdark: darkMode })
    const notificationNames = classnames("notificationdropnames", { notificationdropnameslight: !darkMode }, { notificationnames: darkMode })
    const seetingMenu = classnames("settings-menu", { seetingmenudark: darkMode })
    const toggleCatch = classnames("nav-right-logo")
    const darkModeToggleButtonClassNames = classnames("toggle-button-settings", { 'ant-switch-checked': checkedBoxDarkMode })
    const SideBarToggleButtonClassNames = classnames("toggle-button-settings", { 'ant-switch-checked': sidebarcollapsedmode })

    const [loadingNext, setLoadingNext] = useState(false)
    const handleGetNext = () => {
        setLoadingNext(true)
        chatStore.setPagingParams(new PagingParams(chatStore.pagination!.currentPage + 1, 7))
        chatStore.loadNotificationsPagination()
        setLoadingNext(false)
    }
    return (
        <header className={navbardark}  >
            <div className='custom-container'>
                <div className={`nav-head  shadow-xs `}>
                    <div className='navleft'>
                        <Link to='/home' className='d-flex text-decoration-none logo-Link align-items-center'>
                            <FaMeetup className='meetup-Logo' />
                            <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
                        </Link>
                    </div>
                    <div className='navmiddle d-flex'>
                        <form className='d-lg-flex d-none'>
                            <div className='form-group search-input-wrapper'>
                                <FiSearch style={{ color: darkMode ? 'white' : 'grey' }} className='search-input-logo' />
                                <input onClick={() => searchStore.searchUser()} onChange={(e) => setSearchItem(e.target.value)} className='search-input' placeholder='Start typing to search..' autoComplete="off" type="text" name="dsiplayName" />
                            </div>
                        </form>
                        {
                            searchItem.length > 0 && searchStore.users.some(x => x.dsiplayName.toLowerCase().startsWith(searchItem.toLowerCase())) &&
                            <div className="search-dropdown">
                                <ul className="mb-0">
                                    {searchStore.users.filter(x => x.dsiplayName.toLowerCase().startsWith(searchItem.toLowerCase())).map(item => (
                                        <li onClick={() => setSearchItem("")}><Link to={`/userprofile/${item.userName}`} className="d-flex align-items-center">
                                            <span className='post-with-photo-user-photo me-3'>
                                                <img className='user-profile-pic' src={item.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                                            </span>
                                            <div className="d-flex flex-column">
                                                <span style={{ color: '#999c9f', fontWeight: '600' }}>{item.dsiplayName}</span>
                                                <span style={{ fontSize: '13px' }}>@{item.userName}</span>
                                            </div>
                                        </Link></li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <div className='d-flex'>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link xl-none'>
                                <AiOutlineHome className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} className=' nav-middle-link d-none search-991' href="#">
                                <MdChatBubbleOutline onClick={() => setChatMode()} className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link xl-none'>
                                <AiOutlineUsergroupDelete className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link d-none search-991'>
                                <AiOutlineMenu className='nav-middle-Logo' />
                            </a>
                        </div>
                    </div>

                    <div className='nav-right align-items-center d-lg-flex d-none w-100 justify-content-end'>
                        <a className='text-decoration-none nav-right-link' onClick={() => {
                            handleNotDropdown()
                            chatStore.loadNotifications()
                            chatStore.notificationCount = 0
                        }} href="#">
                            {chatStore.notificationCount > 0 &&
                                <span className='notification'>{chatStore.notificationCount}
                                </span>}
                            <BiBell fill='#0d6efd' className='nav-right-logo' />
                        </a>
                        {
                            notificiationDropdown &&
                            <div id="target-not" className={notificationDrop}>
                                <h4 className={notificationHeader}>Notification</h4>
                                <InfiniteScroll
                                    dataLength={chatStore.groupedNotifcations.length}
                                    next={handleGetNext}
                                    scrollableTarget="target-not"
                                    hasMore={!loadingNext && !!chatStore.pagination && chatStore.pagination.currentPage < chatStore.pagination.totalPages}
                                    loader={<div className="d-flex justify-content-center mb-5">
                                        <TailSpin
                                            height={20}
                                            width="20"
                                            color='#0d6efd'
                                            ariaLabel='loading'
                                        />
                                    </div>}
                                >
                                    {chatStore.groupedNotifcations?.map(note => (
                                        <a className='d-flex not-drop' href="">
                                            <img className='not-user-pics' src={note?.value.fromUserImage || user8} alt="" />
                                            <div className='ms-2 w-100'>
                                                <h5 className={notificationNames}>
                                                    {note?.value.fromUserName}
                                                    <span className='time-not-user'>{formatDistanceToNow(new Date(note.value.createdDate))}</span>
                                                </h5>
                                                {note.value.notificationTypeName === 'Chat' ?
                                                    <h6>You have new message</h6> :
                                                    <h6>You have new comment</h6>
                                                }
                                            </div>
                                        </a>
                                    ))}
                                </InfiniteScroll>
                            </div>
                        }

                        <a className=' text-decoration-none nav-right-link' onClick={() => chatStore.getUsers}>
                            <MdChatBubbleOutline onClick={() => {
                                setChatMode()
                                chatStore.getUsers()
                            }} fill='#0d6efd' className='nav-right-logo' />
                        </a>
                        <Link to='/settings' className=' text-decoration-none nav-right-link rotate' onClick={() => handleSettingsDropdown()} >
                            <VscSettingsGear fill='#0d6efd' className={toggleCatch} />
                        </Link>
                        {/* {
                            settingsDropdown &&
                            <div className={settingsDrop}>
                                <h4 className={notificationHeader}>Settings</h4>
                                <h6 className='choose-color'>Choose Color Theme</h6>
                                <ul className='' style={{ padding: 0 }}>
                                    <li>
                                        <li className='colors-settings'>
                                            <label htmlFor="">
                                                <input type="radio" name="" id="" />
                                                <span style={{ backgroundColor: 'pink' }} className='colors-settings-bg'></span>
                                            </label>
                                        </li>
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
                                    <li>
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
                                        <li className='colors-settings'>
                                            <label htmlFor="">
                                                <input type="radio" name="" id="" />
                                                <span style={{ backgroundColor: 'blue' }} className='colors-settings-bg'></span>
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
                                                <span style={{ backgroundColor: 'grey' }} className='colors-settings-bg'></span>
                                            </label>
                                        </li>
                                        <li className='colors-settings'>
                                            <label htmlFor="">
                                                <input type="radio" name="" id="" />
                                                <span style={{ backgroundColor: 'brown' }} className='colors-settings-bg'></span>
                                            </label>
                                        </li>
                                    </li>
                                </ul>

                                <div className='settings-toggle d-flex'>
                                    <h4 className={seetingMenu}>Side Bar Background</h4>
                                    <div>
                                        <Switch onClick={() => handleMenuBackColor("red")} className='toggle-button-settings' />
                                    </div>

                                </div>
                                <div className='settings-toggle d-flex'>
                                    <h4 className={seetingMenu}>Menu Position</h4>
                                    <div>
                                        <Switch aria-checked={sidebarcollapsedmode ? true : false} onClick={() => setSideBarCollapseMode()} onChange={() => handleSideBarCollapseMode()} className={SideBarToggleButtonClassNames} />
                                    </div>
                                </div>
                                <div className='settings-toggle d-flex'>
                                    <h4 className={seetingMenu}>Dark Mode</h4>
                                    <div>
                                        <label htmlFor="dark-mode-toggle-checkbox">
                                            <Switch aria-checked={checkedBoxDarkMode ? true : false} onClick={() => setDarkMode()} onChange={() => handleToggleiconDarkMode()} className={darkModeToggleButtonClassNames} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        } */}
                        <Link className=' text-decoration-none nav-right-link' to={"/settings"}>
                            {user1?.userName === user?.userName ?
                                <img className='profile-img' src={user1?.image || user?.image || profile4} alt="" />
                                :
                                <img className='profile-img' src={user?.image || user1?.image || profile4} alt="" />
                            }

                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
})