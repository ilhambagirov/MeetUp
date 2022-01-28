import React from "react";
import './PasswordChange.scss'
import '../../Main/Main.scss'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Formik } from "formik";
import { useDarkMode } from "../../../../app/stores/store";
import MyTextInput from "../../../../app/common/MyTextInput";
import * as Yup from 'yup'
import { FaSpinner } from "react-icons/fa";


export default function SavedAddress() {
    const { activitystore, userStore } = useDarkMode();
    const validationSchema = Yup.object(
        {
            current: Yup.string().required("The current password is required"),
            new: Yup.string().required("The new password is required"),
            newconfirm: Yup.string().required("Confirm password is required"),
        }
    )
    return (
        <div className='main-content password-change-content'>
            <div className='password-change-wrapper'>
                <div className='password-change-header border-0 p-4 w-100 d-flex align-items-center'>
                    <Link to='/settings'>
                        <AiOutlineArrowLeft className='goback-icon' />
                    </Link>
                    <h4 style={{ fontWeight: 600 }} className='ms-4 mb-0 mt-0'>Saved Address</h4>
                </div>
                <div className='password-change-content border-0 p-lg-5 p-4'>
                    <Formik
                        initialValues={{ current: '', new: '', newconfirm: '', error: null }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setErrors }) => userStore.changeUserPassword(values).catch(error => setErrors({ error: 'Invalid Email or Password' }))}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12 mb-3">
                                        <label htmlFor="">Current Password</label>
                                        <MyTextInput name='current' style='d-block form-control' type="text" placeholder='Current Password' />
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="">Change Password</label>
                                            <MyTextInput name='new' style='d-block form-control' type="password" placeholder='Current Password' />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="">Confirm Change Password</label>
                                            <MyTextInput name='newconfirm' style='d-block form-control' type="password" placeholder='Current Password' />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12 mb-3'>
                                        <button className='save-btn' type="submit">
                                            {isSubmitting ? <FaSpinner className="spinner" />
                                                : "Save"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}