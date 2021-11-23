import React from "react";
import { FaMeetup } from "react-icons/fa";
import './Login.scss'


export default function Login() {

    return (
        <>
         <div className='login-nav'>
            <a className='d-flex text-decoration-none logo-Link' href="#">
                <FaMeetup className='meetup-Logo' />
                <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
            </a>
        </div>
        <div className='row content-login'>
            <div className='col-xl-5 login-left'></div>
        </div>
        </>
       
    )
}