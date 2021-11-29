import React from "react";
import { AiOutlineCreditCard, AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";
import '../Main/Main.scss'
import './Settings.scss'
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTwitter } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiBell, BiHelpCircle } from "react-icons/bi";

export default function Settings() {

    return (
        <div className='main-content settings-content'>
            <div className='settings-wrapper'>
                <div className='settings-body'>
                    <div className='row'>
                        <div className='col-12'>
                            <h4 className='mb-4 mb-lg-5 mb-4' style={{ fontWeight: 700 }}>Settings</h4>
                            <div className='setting-caption mb-2'>General</div>
                            <ul className='mb-4'>
                                <li className=' border-bottom'>
                                    <Link className=' pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='/accountdetails' >
                                        <div className='d-flex align-items-center ' >
                                            <span style={{ background: `linear-gradient(#0e0eec, #6a6aaf)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <AiOutlineHome />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Account Information</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                                <li className=' border-bottom'>
                                    <Link className='pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center justify-content-center' >
                                            <span style={{ background: `linear-gradient(#f2994a,#f2c94c)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <HiOutlineLocationMarker />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Saved Adresses</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center justify-content-center' >
                                            <span style={{ background: `linear-gradient(#e44d26,#f16529)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <BsTwitter />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Social Account</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                            </ul>
                            <div className='setting-caption mb-2'>Account</div>
                            <ul className='mb-4'>
                                <li className=' border-bottom'>
                                    <Link className=' pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center ' >
                                            <span style={{ background: `linear-gradient(#0e0eec, #6a6aaf)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <AiOutlineCreditCard />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>My Cards</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center justify-content-center' >
                                            <span style={{ background: `linear-gradient(#f2994a,#f2c94c)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <RiLockPasswordLine />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Password</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                            </ul>
                            <div className='setting-caption mb-2'>Other</div>
                            <ul>
                                <li className=' border-bottom'>
                                    <Link className=' pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center ' >
                                            <span style={{ background: `linear-gradient(#0e0eec, #6a6aaf)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <BiBell />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>My Cards</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                                <li className='border-bottom'>
                                    <Link className='pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center justify-content-center' >
                                            <span style={{ background: `linear-gradient(#f2994a,#f2c94c)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <BiHelpCircle />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Password</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                                <li>
                                    <Link className='pb-2 pt-2 d-flex align-items-center justify-content-between w-100' to='' >
                                        <div className='d-flex align-items-center justify-content-center' >
                                            <span style={{ background: `linear-gradient(#e44d26,#f16529)` }} className='me-3 d-flex align-items-center nav-wrap-sidebar-feed-icon-wrap'>
                                                <AiOutlineLogout />
                                            </span>
                                            <h4 style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>Social Account</h4>
                                        </div>
                                        <MdKeyboardArrowRight className='arrow-settings' />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}