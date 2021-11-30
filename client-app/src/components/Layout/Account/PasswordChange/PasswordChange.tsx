import React from "react";
import './PasswordChange.scss'
import '../../Main/Main.scss'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function SavedAddress() {

    return (
        <div className='main-content password-change-content'>
            <div className='password-change-wrapper'>
                <div className='password-change-header border-0 p-4 w-100 d-flex align-items-center'>
                    <Link to='/settings'>
                        <AiOutlineArrowLeft className='goback-icon' />
                    </Link>
                    <h4 style={{ fontWeight: 600 }} className='ms-4 mb-0'>Saved Address</h4>
                </div>
                <div className='password-change-content border-0 p-lg-5 p-4'>
                    <form action="">
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <label htmlFor="">Current Password</label>
                                <input className='d-block form-control' type="text" />
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="form-group">
                                    <label htmlFor="">Change Password</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="form-group">
                                    <label htmlFor="">Confirm Change Password</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-lg-12 mb-3'>
                                <a className='save-btn' href="">Save</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}