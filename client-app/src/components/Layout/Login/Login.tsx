import classNames from "classnames";
import React from "react";
import { FaMeetup } from "react-icons/fa";
import { useDarkMode } from "../../../app/stores/store";
import './Login.scss'
import '../../../App.css';


export default function Login() {
    const { activitystore } = useDarkMode();
    const { darkMode } = activitystore

    const container = classNames("container-fluid", { containerdark: darkMode })
    return (
        <div className={container}>
            <div className='login-nav'>
                <a className='d-flex text-decoration-none logo-Link' href="#">
                    <FaMeetup className='meetup-Logo' />
                    <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
                </a>
            </div>
            <div className='row content-login'>
                <div className='col-xl-5 d-none d-xl-block login-left'></div>
                <div className='col-xl-7 login-right'>
                    <div className='Login-wrapper'>
                        <div className='Login-form-wrapper'>
                            <form className='w-100' action="">
                                <div className='form-group'>
                                    <input className='mb-2 form-control' type="text" placeholder='Email' />
                                </div>
                                <div className='form-group'>
                                    <input className='mb-2 form-control' type="text" placeholder='Password' />
                                </div>
                                <div className='form-saved mb-3 justify-content-between'>
                                    <div className='d-flex align-items-center'>
                                        <input className='me-1  checkbox-input' type="checkbox" />
                                        <span style={{ color: '#adb5bd', fontSize: 13 }} className='me-1'>Remember me</span>
                                    </div>
                                    <a className='text-decoration-none text-black' href="">Forgot your Password?</a>
                                </div>
                                <div className='btnLogin'>
                                    <button className='Login-btn'>Login</button>
                                </div>
                            </form>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <h6 style={{ color: '#adb5bd', fontSize: 14 }} className='mb-0 me-1'>Don't have an account?</h6>
                            <a style={{ fontWeight: 700 }} className='text-decoration-none' href="">Register</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}