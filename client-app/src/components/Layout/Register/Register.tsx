import classNames from "classnames";
import React from "react";
import { FaMeetup } from "react-icons/fa";
import { useDarkMode } from "../../../app/stores/store";
import '../Login/Login.scss'
import '../../../App.css';
import { Link } from "react-router-dom";
import { Formik } from "formik";
import MyTextInput from "../../../app/common/MyTextInput";
import * as Yup from 'yup'

export default function Login() {
    const { activitystore, userStore } = useDarkMode();
    const { darkMode } = activitystore

    const container = classNames("container-fluid", { containerdark: darkMode })

    const validationSchema = Yup.object(
        {
            displayName: Yup.string().required("The displayname is required"),
            username: Yup.string().required("The username is required"),
            email: Yup.string().required("The email is required"),
            password: Yup.string().required("The password is required"),
        })
    return (
        <div className={container}>
            <div className='login-nav'>
                <a className='d-flex text-decoration-none logo-Link' href="#">
                    <FaMeetup className='meetup-Logo' />
                    <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>MeetUp.</span>
                </a>
            </div>
            <div className='row content-login'>
                <div className='col-xl-5 d-none d-xl-block login-left register-page'></div>
                <div className='col-xl-7 login-right'>
                    <div className='Login-wrapper'>
                        <div className='Login-form-wrapper'>
                            <Formik
                                initialValues={{displayName: '',username: '', email: '', password: '', error: null }}
                                onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error: 'Problem while register' }))}
                                validationSchema={validationSchema}
                            >
                                {({ handleSubmit, errors }) => (
                                    <form onSubmit={handleSubmit} className='w-100' action="">
                                        <div className='form-group'>
                                            <MyTextInput style='mb-2 form-control login-inputs' name='displayName' type="text" placeholder='Displayname' />
                                        </div>
                                        <div className='form-group'>
                                            <MyTextInput style='mb-2 form-control login-inputs'  name='username' type="text" placeholder='Username' />
                                        </div>
                                        <div className='form-group'>
                                            <MyTextInput style='mb-2 form-control login-inputs' name='email' type="text" placeholder='Email' />
                                        </div>
                                        <div className='form-group'>
                                            <MyTextInput style='mb-2 form-control login-inputs' name='password' type="password" placeholder='Password' />
                                        </div>
                                        <div className='form-saved mb-3 justify-content-between'>
                                            <div className='d-flex align-items-center'>
                                                <input className='me-1  checkbox-input' type="checkbox" />
                                                <span style={{ color: '#adb5bd', fontSize: 13 }} className='me-1'>Accept terms and condition</span>
                                            </div>
                                        </div>
                                        <div className='btnLogin'>
                                            <button type="submit" className='Login-btn'>Register</button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <h6 style={{ color: '#adb5bd', fontSize: 14 }} className='mb-0 me-1'>Have an account?</h6>
                            <Link to='/' style={{ fontWeight: 700 }} className='text-decoration-none' href="">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}