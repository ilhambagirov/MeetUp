import React from "react";
import './AccountDetails.scss'
import '../../Main/Main.scss'
import { AiOutlineArrowLeft, AiOutlineCloudDownload } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function AccountDetails() {

    return (
        <div className='main-content account-detail-content'>
            <div className='account-wrapper'>
                <div className="account-header border-0 p-4 w-100 d-flex align-items-center">
                    <Link to='/settings'>
                        <AiOutlineArrowLeft className='goback-icon' />
                    </Link>
                    <h4 style={{ fontWeight: 600 }} className='ms-4 mb-0'>Account Details</h4>
                </div>
                <div className="account-content border-0 p-lg-5 p-4 d-flex align-items-center justify-content-center">
                    <div className='User-profile-pic w-100'>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 text-center">
                                <figure className='ms-auto me-auto mb-0 mt-2 w100'>
                                    <img className='w-100' src={require('../../../../assets/images/pt-1.jpg').default} alt="" />
                                </figure>
                                <h2 style={{ fontWeight: 700, fontSize: 20, color: '#212529' }} className='mt-2'>Ilham Baghirov</h2>
                                <h4 className='location-account'>Neftchala</h4>
                            </div>
                        </div>

                        <form action="">
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="">First Name</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="">Last Name</label>
                                        <input className='d-block form-control' type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="">Email</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="">Phone</label>
                                        <input className='d-block form-control' type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="">Country</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="">Address</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <label htmlFor="">Town/City</label>
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
                                <div className="col-lg-12 mb-3 mt-3 ">
                                    <input hidden className='d-block form-control' id='file' type="file" />
                                    <label className='p-4 w-100 d-flex flex-column align-items-center drag-label' htmlFor="file">
                                        <AiOutlineCloudDownload style={{ fontSize: 40 }} className='d-block text-center' />
                                        <span>Drag and drop or click to replace</span>
                                    </label>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label htmlFor="">Description</label>
                                        <textarea className='d-block form-control p-3' placeholder='Write your description' />
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <a className='save-btn' href="">Save</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}