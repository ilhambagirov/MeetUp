import classNames from "classnames";
import React from "react";
import { FaMeetup } from "react-icons/fa";
import { useDarkMode } from "../../../../app/stores/store";
import '../../../Layout/Login/Login.scss'
import '../../../../App.css';
import { ErrorMessage, Formik } from "formik";
import { Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import MyTextInput from "../../../../app/common/MyTextInput";
import { Link } from "react-router-dom";
export default observer(function SendEmailResetPass() {
    const { activitystore, userStore } = useDarkMode();
    const { darkMode } = activitystore

    const container = classNames("container-fluid", { containerdark: darkMode })
    console.log(userStore.isLoggedIn)
    return (

        <div className={container}>
            <div className='login-nav'>
                <a className='d-flex text-decoration-none logo-Link align-items-center' href="#">
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
                                initialValues={{ email: '', error: null }}
                                onSubmit={(values, { setErrors }) => userStore.resetPassword(values).catch(error => setErrors({ error: 'Invalid Email' }))}
                            >
                                {({ handleSubmit, errors }) => (
                                    <form onSubmit={handleSubmit} className='w-100' action="">
                                        <div className='form-group'>
                                            <MyTextInput name='email' style='mb-2 form-control login-inputs' type="text" placeholder='Email' />
                                        </div>
                                        <ErrorMessage name='error' render={() =>
                                            <Label basic color='red' style={{ marginBottom: 10 }} content={errors.error} />}
                                        />
                                        <button type="submit" className='Login-btn d-flex align-items-center justify-content-center'> <span style={{ fontSize: 19 }}>Send Email</span> </button>
                                    </form>
                                )}
                            </Formik>
                        </div>
                        <div className='d-flex align-items-center mt-3'>
                            <h6 style={{ color: '#adb5bd', fontSize: 14 }} className='mb-0 me-1'>Remember? Back to </h6>
                            <Link to='/' style={{ fontWeight: 700 }} className='text-decoration-none'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})