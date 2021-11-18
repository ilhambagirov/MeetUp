import React, { useState } from "react";
import { FaMeetup } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHome, AiOutlineHistory, AiOutlineUsergroupDelete, AiOutlineMenu } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdChatBubbleOutline } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { VscSettingsGear } from "react-icons/vsc";
import profile4 from '../../../assets/images/profile-4.png'
import user8 from '../../../assets/images/user-8.png'
import { Switch } from "antd"
import './Header.scss';
import 'antd/dist/antd.css'


export default function Header() {

    const [notificiationDropdown, SetnotificiationDropdown] = useState(false);
    const [settingsDropdown, SetsettingsDropdown] = useState(false);
    const handleNotDropdown = () => {
        SetnotificiationDropdown(!notificiationDropdown)
    }
    const handleSettingsDropdown = () => {
        SetsettingsDropdown(!settingsDropdown);
    }
    return (
        <header>
            <div className='custom-container'>
                <div className='nav-head shadow-xs'>
                    <div className='navleft'>
                        <a className='d-flex text-decoration-none logo-Link' href="#">
                            <FaMeetup className='meetup-Logo' />
                            <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
                        </a>
                    </div>
                    <div className='navmiddle d-flex'>
                        <form action="" className='d-lg-flex d-none'>
                            <div className='form-group search-input-wrapper'>
                                <FiSearch className='search-input-logo' />
                                <input className='search-input' placeholder='Start typing to search..' type="text" name="searchInput" id="" />
                            </div>
                        </form>
                        <div className='d-flex'>
                            <a href="" className='nav-middle-link xl-none'>
                                <AiOutlineHome className='nav-middle-Logo' />
                            </a>
                            <a href="" className='nav-middle-link d-none search-991'>
                                <FiSearch className='nav-middle-Logo' />
                            </a>
                            <a href="" className='nav-middle-link lg-show'>
                                <AiOutlineHistory className='nav-middle-Logo' />
                            </a>
                            <a href="" className='nav-middle-link lg-show'>
                                <BsCameraVideo className='nav-middle-Logo' />
                            </a>
                            <a href="" className='nav-middle-link xl-none'>
                                <AiOutlineUsergroupDelete className='nav-middle-Logo' />
                            </a>
                            <a href="" className='nav-middle-link d-none search-991'>
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
                            <div className='notification-drop shadow-lg'>
                                <h4 className='fw-700 font-xs mb-4'>Notification</h4>
                                <a className='d-flex not-drop' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!</h6>
                                    </div>
                                </a>
                                <a className='d-flex not-drop' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!</h6>
                                    </div>
                                </a>
                                <a className='d-flex not-drop' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!</h6>
                                    </div>
                                </a>
                                <a className='d-flex not-drop mb-0' href="">
                                    <img className='not-user-pics' src={user8} alt="" />
                                    <div className='ms-2'>
                                        <h5>
                                            Ilham Baghirov
                                            <span className='time-not-user'>3 min</span>
                                        </h5>
                                        <h6 >You have new Follow request!!</h6>
                                    </div>
                                </a>
                            </div>
                        }

                        <a className=' text-decoration-none nav-right-link' href="#">
                            <MdChatBubbleOutline fill='#0d6efd' className='nav-right-logo' />
                        </a>
                        <a className=' text-decoration-none nav-right-link rotate' onClick={() => handleSettingsDropdown()} href="#">
                            <VscSettingsGear fill='#0d6efd' className='nav-right-logo' />
                        </a>
                        {
                            settingsDropdown &&
                            <div className='settings-drop shadow-lg'>
                                <h4 className='fw-700 font-xs mb-4'>Settings</h4>
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
                                                <span style={{ backgroundColor: 'black' }} className='colors-settings-bg'></span>
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
                                    <h4>Side Bar Background</h4>
                                    <div>
                                        <Switch className='toggle-button-settings' />
                                    </div>

                                </div>
                                <div className='settings-toggle d-flex'>
                                    <h4>Menu Position</h4>
                                    <div>
                                        <Switch className='toggle-button-settings' />
                                    </div>
                                </div>
                                <div className='settings-toggle d-flex'>
                                    <h4>Dark Mode</h4>
                                    <div>
                                        <Switch className='toggle-button-settings' />
                                    </div>
                                </div>
                            </div>
                        }

                        <a className=' text-decoration-none nav-right-link' href="#">
                            <img className='profile-img' src={profile4} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}