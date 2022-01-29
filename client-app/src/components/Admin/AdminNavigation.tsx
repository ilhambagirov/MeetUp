import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import { FiUsers } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { Link } from "react-router-dom";
import '../Layout/Navigation/Navigation.scss'
export default observer(function Navigation() {
    //classnames
    const navigation = classNames("navigation scroll-bar")
    const navWrap = classNames("nav-wrap")
    const navWrap0 = classNames("nav-wrap navwrapp-0")
    const navWrapInfos = classNames("nav-wrap-info")
    const container = classNames("custom-container")
    return (
        <div className={container}>
            <nav className={navigation} style={{width:'320px'}}>
                <div className='nav-content '>
                    <div className={navWrap}>
                        <h6 className='nav-wrap-header'>General</h6>
                        <ul className='mb-1'>
                            <li>
                                <Link to='/userList' className='nav-wrap-sidebar-feed' href="">
                                    <span style={{ background: `linear-gradient(#d42c4a, #ec2424)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                        <FiUsers />
                                    </span>
                                    <span className={navWrapInfos}>Users</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/adminDashboard' className='nav-wrap-sidebar-feed' href="">
                                    <span style={{ background: `linear-gradient(#1848ff, #0400b0)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                        <GoReport />
                                    </span>
                                    <span className={navWrapInfos}>Requested Reports</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
})