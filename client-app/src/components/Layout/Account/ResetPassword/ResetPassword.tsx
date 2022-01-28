import classNames from "classnames";
import React, { useEffect } from "react";
import { FaMeetup } from "react-icons/fa";
import { useDarkMode } from "../../../../app/stores/store";
import '../../../Layout/Login/Login.scss'
import '../../../../App.css';
import { Link, NavLink } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import MyTextInput from "../../../../app/common/MyTextInput";
export default observer(function ResetPassword() {
    const { activitystore, userStore } = useDarkMode();
    const { darkMode } = activitystore

    const container = classNames("container-fluid", { containerdark: darkMode })
    console.log(userStore.isLoggedIn)
  
    const params = new URLSearchParams(window.location.search);
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
                                initialValues={{ password: '', passwordConfirm: '', error: null }}
                                onSubmit={(values, { setErrors }) => userStore.resetPasswordConfirm(params.get('token'),params.get('Email'), values).catch(error => setErrors({ error: 'Invalid Email or Password' }))}
                            >
                                {({ handleSubmit, errors }) => (
                                    <form onSubmit={handleSubmit} className='w-100' action="">
                                        <div className='form-group'>
                                            <MyTextInput name='password' style='mb-2 form-control login-inputs' type="text" placeholder='Password' />
                                        </div>
                                        <div className='form-group'>
                                            <MyTextInput name='passwordConfirm' style='mb-2 form-control login-inputs' type="text" placeholder='Password confirm' />
                                        </div>
                                        <ErrorMessage name='error' render={() =>
                                            <Label basic color='red' style={{ marginBottom: 10 }} content={errors.error} />}
                                        />
                                        <button type="submit" className='Login-btn d-flex align-items-center justify-content-center'> <span style={{ fontSize: 19 }}>Reset Password</span> </button>
                                    </form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
})