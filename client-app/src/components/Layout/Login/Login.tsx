import classNames from "classnames";
import React from "react";
import { FaMeetup } from "react-icons/fa";
import { useDarkMode } from "../../../app/stores/store";
import './Login.scss'
import '../../../App.css';
import { Link, NavLink } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import MyTextInput from "../../../app/common/MyTextInput";


export default observer(function Login() {
    const { activitystore, userStore } = useDarkMode();
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
                            <Formik
                                initialValues={{ email: '', password: '', error: null }}
                                onSubmit={(values, { setErrors }) => userStore.login(values).catch(error => setErrors({ error: 'Invalid Email or Password' }))}
                            >
                                {({ handleSubmit, errors }) => (
                                    <form onSubmit={handleSubmit} className='w-100' action="">
                                        <div className='form-group'>
                                            <MyTextInput name='email' style='mb-2 form-control login-inputs' type="text" placeholder='Email' />
                                        </div>
                                        <div className='form-group'>
                                            <MyTextInput name='password' style='mb-2 form-control login-inputs' type="text" placeholder='Password' />
                                        </div>
                                        <div className='form-saved mb-3 justify-content-between'>
                                            <div className='d-flex align-items-center'>
                                                <input className='me-1  checkbox-input' type="checkbox" />
                                                <span style={{ color: '#adb5bd', fontSize: 13 }} className='me-1'>Remember me</span>
                                            </div>
                                            <a className='text-decoration-none text-black' href="">Forgot your Password?</a>
                                        </div>
                                        <ErrorMessage name='error' render={() =>
                                            <Label basic color='red' style={{ marginBottom: 10 }} content={errors.error} />}
                                        />
                                        <button type="submit" className='Login-btn d-flex align-items-center justify-content-center'> <span style={{ fontSize: 19 }}>Login</span> </button>
                                    </form>
                                )}
                            </Formik>

                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <h6 style={{ color: '#adb5bd', fontSize: 14 }} className='mb-0 me-1'>Don't have an account?</h6>
                            <Link to='/register' style={{ fontWeight: 700 }} className='text-decoration-none'>Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})