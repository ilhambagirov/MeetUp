import React from "react";
import './SocialAccount.scss'
import '../../Main/Main.scss'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function SavedAddress() {

    return (
        <div className='main-content socialaccount-content'>
            <div className='socialaccount-wrapper'>
                <div className='socialaccount-header border-0 p-4 w-100 d-flex align-items-center'>
                    <Link to='/settings'>
                        <AiOutlineArrowLeft className='goback-icon' />
                    </Link>
                    <h4 style={{ fontWeight: 600 }} className='ms-4 mb-0'>Saved Address</h4>
                </div>
                <div className='socialaccount-content border-0 p-lg-5 p-4'>
                    <form action="">
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="">Country</label>
                                <input className='d-block form-control' type="text" />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="">City</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="">Address</label>
                                <input className='d-block form-control' type="text" />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="">PostCode</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 mb-3">
                                <label htmlFor="">Address</label>
                                <input className='d-block form-control' type="text" />
                            </div>
                            <div className="col-lg-6 mb-3">
                                <div className="form-group">
                                    <label htmlFor="">PostCode</label>
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