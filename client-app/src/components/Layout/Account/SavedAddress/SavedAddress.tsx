import React from "react";
import './SavedAddress.scss'
import '../../Main/Main.scss'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function SavedAddress() {

    return (
        <div className='main-content address-content'>
            <div className='address-wrapper'>
                <div className='address-header border-0 p-4 w-100 d-flex align-items-center'>
                    <Link to='/settings'>
                        <AiOutlineArrowLeft className='goback-icon' />
                    </Link>
                    <h4 style={{ fontWeight: 600 }} className='ms-4 mb-0'>Saved Address</h4>
                </div>
                <div className='address-content border-0 p-lg-5 p-4'>
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

                        <div className='row'>
                            <div className='col-12 map'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24313.215380891517!2d49.86191205!3d40.3833254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1628778602654!5m2!1sen!2s"
                                    width="100%" height="250px" style={{ border: 0 }} loading="lazy"></iframe>
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