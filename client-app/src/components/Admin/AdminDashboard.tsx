import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { useDarkMode } from "../../app/stores/store";
import AdminNavigation from "./AdminNavigation";
import DataTable from "./AdminTableData";
import AdminNavbar from "./Navbar";
import UserDataTable from "../Admin/AdminTableData";
import './Navbar.scss'
import { FiUsers } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import classNames from "classnames";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FcStatistics } from "react-icons/fc";
export default observer(function AdminDashboard() {
    const { adminstore } = useDarkMode()
    const navigation = classNames("navigation scroll-bar")
    const navWrap = classNames("nav-wrap")
    const navWrap0 = classNames("nav-wrap navwrapp-0")
    const navWrapInfos = classNames("nav-wrap-info")
    const container = classNames("custom-container")
    useEffect(() => {
        adminstore.loadUsers()
    }, [ adminstore.loadUsers])
    return (
        <Tabs>
            <AdminNavbar />
            <div className="row">
                <div className="col-3">
                    <div className={container}>
                        <nav className={navigation} style={{ width: '320px' }}>
                            <div className='nav-content '>
                                <div className={navWrap}>
                                    <h6 className='nav-wrap-header'>General</h6>
                                    <TabList className='mb-1'>
                                        <Tab className='me-5 pt-2 pb-1 ls-1 d-inline-block'>
                                            <a className='nav-wrap-sidebar-feed'>
                                                <span style={{ background: `linear-gradient(#d42c4a, #ec2424)` }} className='nav-wrap-sidebar-feed-icon-wrap'>
                                                    <FiUsers />
                                                </span>
                                                <span className={navWrapInfos}>Users</span>
                                            </a>
                                        </Tab>
                                    </TabList>
                                </div>
                            </div>
                        </nav>
                    </div >
                </div>
                <div className="content-admin col-9">
                    <TabPanel>
                        <UserDataTable />
                    </TabPanel>
                </div>
            </div>
        </Tabs>
    )
})