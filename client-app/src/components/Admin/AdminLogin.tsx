import classNames from "classnames";
import React from "react";
import { FaMeetup } from "react-icons/fa";
// import { useDarkMode } from "../../../app/stores/store";
import '../Layout/Login/Login.scss'
import '../../App';
import { Link, NavLink } from "react-router-dom";
import { ErrorMessage, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import MyTextInput from "../../app/common/MyTextInput";
import { useDarkMode } from "../../app/stores/store";
export default observer(function Login() {
    const { activitystore, adminstore } = useDarkMode();
    const { darkMode } = activitystore

    const container = classNames("container-fluid", { containerdark: darkMode })
    return (
        
        <div className={container}>
            <div className='login-nav'>
                <a className='d-flex text-decoration-none logo-Link align-items-center' href="#">
                    <FaMeetup className='meetup-Logo' />
                    <span className='d-inline-block fredoka-font ls-3 text-current font-xxl logo-text mb-0 customlogotext'>Admin Login</span>
                </a>
            </div>
            <div className='row content-login'>
                <div className='col-xl-5 d-none d-xl-block login-left'></div>
                <div className='col-xl-7 login-right'>
                    <div className='Login-wrapper'>
                        <div className='Login-form-wrapper'>
                            <Formik
                                initialValues={{ email: '', password: '', error: null }}
                                onSubmit={(values, { setErrors }) => adminstore.login(values).catch(() => setErrors({ error: 'Invalid Email or Password' }))}
                            >
                                {({ handleSubmit, errors }) => (
                                    <form onSubmit={handleSubmit} className='w-100' action="">
                                        <div className='form-group'>
                                            <MyTextInput name='email' style='mb-2 form-control login-inputs' type="text" placeholder='Email' />
                                        </div>
                                        <div className='form-group'>
                                            <MyTextInput name='password' style='mb-2 form-control login-inputs' type="text" placeholder='Password' />
                                        </div>
                                        <ErrorMessage name='error' render={() =>
                                            <Label basic color='red' style={{ marginBottom: 10 }} content={errors.error} />}
                                        />
                                        <button type="submit" className='Login-btn d-flex align-items-center justify-content-center'> <span style={{ fontSize: 19 }}>Login</span> </button>
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

