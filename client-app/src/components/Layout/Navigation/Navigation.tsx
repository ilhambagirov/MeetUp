import React from "react";
import { CgLivePhoto, CgProfile } from "react-icons/cg";
import { GiWorld } from "react-icons/gi";
import { MdOutlineGroups } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiUserFollowLine } from "react-icons/ri";
import './Navigation.scss'
import { AiOutlineDisconnect } from "react-icons/ai";
import { VscSettingsGear } from "react-icons/vsc";
import { useDarkMode } from "../../../app/stores/store";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

export default observer(function Navigation() {

    const { activitystore } = useDarkMode();
    const { darkMode } = activitystore
    console.log(darkMode)
    const navigation = classNames("navigation scroll-bar", { darkmodeNavigation: darkMode })
    const navWrap = classNames("nav-wrap", { nawrapdarkmode: darkMode })
    const navWrap0 = classNames("nav-wrap navwrapp-0", { nawrapdarkmode: darkMode })
    const navWrapInfos = classNames("nav-wrap-info", { nawrapinfodarkmode: darkMode })
    return (
        <nav className={navigation}>
            <div className='nav-content '>
                <div className={navWrap}>
                    <h6 className='nav-wrap-header'>New Feeds</h6>
                    <ul className='mb-1'>
                        <li>
                            <a className='nav-wrap-sidebar-feed' href="">
                                <span style={{ background: `linear-gradient(#0e0eec, #6a6aaf)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                    <CgLivePhoto />
                                </span>
                                <span className={navWrapInfos}>Newsfeed</span>
                            </a>
                        </li>
                        <li>
                            <a className='nav-wrap-sidebar-feed' href="">
                                <span style={{ background: `linear-gradient(#f80404, #e9a3a3)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                    <GiWorld />
                                </span>
                                <span className={navWrapInfos}>Explore Stories</span>
                            </a>
                        </li>
                        <li>
                            <a className='nav-wrap-sidebar-feed' href="">
                                <span style={{ background: `linear-gradient(#003de6, #4da7e2)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                    <MdOutlineGroups />
                                </span>
                                <span className={navWrapInfos}>Groups</span>
                            </a>
                        </li>
                        <li>
                            <a className='nav-wrap-sidebar-feed' href="">
                                <span style={{ background: `linear-gradient(#64392e, #e4b0a3)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                    <CgProfile />
                                </span>
                                <span className={navWrapInfos}>My Profile</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={navWrap0}>
                    <ul className='mb-1'>
                        <li>
                            <a className='nav-wrap-sidebar-feed nav-wrap-sidebar-feed-down ' href="">
                                <RiUserFollowLine className='sidebar-logos' />
                                <span className={navWrapInfos}>Followers</span>
                            </a>
                        </li>
                        <li>
                            <a className='nav-wrap-sidebar-feed nav-wrap-sidebar-feed-down ' href="">
                                <AiOutlineDisconnect className='sidebar-logos' />
                                <span className={navWrapInfos}>Connections</span>
                            </a>
                        </li>
                        <li>
                            <a className='nav-wrap-sidebar-feed nav-wrap-sidebar-feed-down ' href="">
                                <HiOutlineLocationMarker className='sidebar-logos' />
                                <span className={navWrapInfos}>Latest Events</span>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={navWrap0}>
                    <ul className='mb-1'>
                        <li>
                            <a className='nav-wrap-sidebar-feed nav-wrap-sidebar-feed-down ' href="">
                                <VscSettingsGear className='sidebar-logos' />
                                <span className={navWrapInfos}>Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
})