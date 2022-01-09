import React, { useState } from "react";
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

export default observer(function Header() {
    // built-in hooks
    const [notificiationDropdown, SetnotificiationDropdown] = useState(false);
    const [settingsDropdown, SetsettingsDropdown] = useState(false);
    const [checkedBoxDarkMode, SetcheckedBoxDarkMode] = useState(false);
    const [sidebarcollapsedmode, Setsidebarcollapsedmode] = useState(false);
    const [menuBackground, SetmenuBackground] = useState("");

    //custom hooks
    const { activitystore, userStore } = useDarkMode();
    const { chatstore } = UseChatMode();
    const { sidestore } = UseSideBar();
    const { darkMode, setDarkMode } = activitystore
    const { setChatMode } = chatstore
    const { setSideBarCollapseMode } = sidestore
    const user = userStore.user as User

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

    return (
        <header className={navbardark}  >
            <div className='custom-container'>
                <div className={`nav-head  shadow-xs `}>
                    <div className='navleft'>
                        <Link to='/home' className='d-flex text-decoration-none logo-Link'>
                            <FaMeetup className='meetup-Logo' />
                            <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
                        </Link>
                    </div>
                    <div className='navmiddle d-flex'>
                        <form action="" className='d-lg-flex d-none'>
                            <div className='form-group search-input-wrapper'>

                                <FiSearch style={{ color: darkMode ? 'white' : 'grey' }} className='search-input-logo' />

                                <input style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} className='search-input' placeholder='Start typing to search..' type="text" name="searchInput" id="" />
                            </div>
                        </form>
                        <div className='d-flex'>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link xl-none'>
                                <AiOutlineHome className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link d-none search-991'>
                                <FiSearch className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} className=' nav-middle-link d-none search-991' href="#">
                                <MdChatBubbleOutline onClick={() => setChatMode()}  className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link lg-show'>
                                <AiOutlineHistory className='nav-middle-Logo' />
                            </a>
                            <a style={{ backgroundColor: darkMode ? '#1a2236' : '#eee' }} href="" className='nav-middle-link xl-none'>
                                <BsCameraVideo className='nav-middle-Logo' />
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
                        <a className='text-decoration-none nav-right-link' onClick={() => handleNotDropdown()} href="#">
                            <span className='notification'></span>
                            <BiBell fill='#0d6efd' className='nav-right-logo' />
                        </a>
                        {
                            notificiationDropdown &&
                            <div className={notificationDrop}>
                                <h4 className={notificationHeader}>Notification</h4>
                                <a className='d-flex not-drop' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5 className={notificationNames}>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!</h6>
                                    </div>
                                </a>
                                <a className='d-flex not-drop' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5 className={notificationNames}>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!</h6>
                                    </div>
                                </a>
                                <a className='d-flex not-drop' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5 className={notificationNames}>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!</h6>
                                    </div>
                                </a>
                                <a className='d-flex not-drop mb-0' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5 className={notificationNames}>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!!</h6>
                                    </div>
                                </a>
                            </div>
                        }

                        <a className=' text-decoration-none nav-right-link' href="#">
                            <MdChatBubbleOutline onClick={() => setChatMode()} fill='#0d6efd' className='nav-right-logo' />
                        </a>
                        <a className=' text-decoration-none nav-right-link rotate' onClick={() => handleSettingsDropdown()} href="#">

                            <VscSettingsGear fill='#0d6efd' className={toggleCatch} />
                        </a>
                        {
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
                        }
                        <Link className=' text-decoration-none nav-right-link' to={"/settings"}>
                            <img className='profile-img' src={user.image || profile4} alt="" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
})