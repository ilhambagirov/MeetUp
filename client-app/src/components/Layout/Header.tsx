import React from "react";
import { FaMeetup } from "react-icons/fa";
import './Header.css';

export default function header() {
    return (
        <header>
            <div className='custom-container'>
                <div className='nav-head'>
                    <div className='navleft'>
                        <a className='d-flex text-decoration-none logo-Link' href="#">
                            <FaMeetup className='meetup-Logo' />
                            <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}