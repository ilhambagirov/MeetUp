import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { FaMeetup } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiBell } from "react-icons/bi";
// import user8 from '../../assets/images/user-8.png'
// import profile4 from '../../assets/images/avatar3.jpg'
import '../Layout/Header/Header.scss';
import './Navbar.scss'
function AdminNavbar(props: any) {
    const [notificiationDropdown, SetnotificiationDropdown] = useState(false);

    const handleNotDropdown = () => {
        SetnotificiationDropdown(!notificiationDropdown)
    }
    //classnames
    const notificationDrop = classnames("notification-drop admin-not shadow-lg")
    const settingsDrop = classnames("settings-drop shadow-lg")
    const notificationHeader = classnames("fw-700 font-xs mb-4")
    const notificationNames = classnames("notificationdropnames")
    return (
        <header>
            <div className='custom-container'>
                <div className={`nav-head  shadow-xs `}>
                    <div className='navleft col-4'>
                        <Link to='/home' className='d-flex text-decoration-none logo-Link align-items-center' style={{maxWidth:'500px'}}>
                            <FaMeetup className='meetup-Logo' />
                            <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp Admin Dashboard.</span>
                        </Link>
                    </div>
                   <div className="d-flex justify-content-between w-100">
                   <div className='navmiddle d-flex'>
                        <form className='d-lg-flex d-none'>
                            <div className='form-group search-input-wrapper'>
                                <FiSearch className='search-input-logo' />
                                <input className='search-input' placeholder='Start typing to search..' autoComplete="off" type="text" name="dsiplayName" />
                            </div>
                        </form>
                        
                    </div>
                    <div className='nav-right align-items-center d-lg-flex d-none col-8 justify-content-end' style={{maxWidth:'123px'}}>
                            <a className='text-decoration-none nav-right-link' onClick={() => handleNotDropdown()} href="#">
                                <span className='notification'></span>
                                <BiBell fill='#0d6efd' className='nav-right-logo' />
                            </a>
                            {/* {
                                notificiationDropdown &&
                                // <div className={notificationDrop}>
                                //     <h4 className={notificationHeader}>Notification</h4>
                                //     <a className='d-flex not-drop' href="">
                                //         <img className='not-user-pics' src={user8} alt="" />
                                //         <div className='ms-2'>
                                //             <h5 className={notificationNames}>
                                //                 Ilham Baghirov
                                //                 <span className='time-not-user'>3 min</span>
                                //             </h5>
                                //             <h6 >You have new Follow request!</h6>
                                //         </div>
                                //     </a>
                                //     <a className='d-flex not-drop' href="">
                                //         <img className='not-user-pics' src={user8} alt="" />
                                //         <div className='ms-2'>
                                //             <h5 className={notificationNames}>
                                //                 Ilham Baghirov
                                //                 <span className='time-not-user'>3 min</span>
                                //             </h5>
                                //             <h6 >You have new Follow request!</h6>
                                //         </div>
                                //     </a>
                                //     <a className='d-flex not-drop' href="">
                                //         <img className='not-user-pics' src={user8} alt="" />
                                //         <div className='ms-2'>
                                //             <h5 className={notificationNames}>
                                //                 Ilham Baghirov
                                //                 <span className='time-not-user'>3 min</span>
                                //             </h5>
                                //             <h6 >You have new Follow request!</h6>
                                //         </div>
                                //     </a>
                                //     <a className='d-flex not-drop mb-0' href="">
                                //         <img className='not-user-pics' src={user8} alt="" />
                                //         <div className='ms-2'>
                                //             <h5 className={notificationNames}>
                                //                 Ilham Baghirov
                                //                 <span className='time-not-user'>3 min</span>
                                //             </h5>
                                //             <h6 >You have new Follow request!!</h6>
                                //         </div>
                                //     </a>
                                // </div>
                            } */}
                            <Link className=' text-decoration-none nav-right-link' to={"/settings"}>
                                {/* {user1?.userName === user?.userName ? */}
                                {/* <img className='profile-img' src={profile4} alt="" /> */}
                                {/* :
                                <img className='profile-img' src={user?.image || user1?.image || profile4} alt="" />
                            } */}
                            </Link>
                        </div>
                   </div>
                </div>
            </div>
        </header>
    )
}

export default AdminNavbar;