import React, { useState } from "react";
import './AccountDetails.scss'
import '../../Main/Main.scss'
import { AiOutlineArrowLeft, AiOutlineCloudDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Select, { GroupBase } from 'react-select'
import agent from "../../../../app/api/agent";
import { useDarkMode } from "../../../../app/stores/store";
import { values } from "mobx";
import { Event } from "react-toastify/dist/core";
import { Formik } from "formik";
import MyTextInput from "../../../../app/common/MyTextInput";


export default observer(function AccountDetails() {

    const universities: { value: any; label: any }[] = []
    agent.Universities.get().then(data => {
        data.map((item: any) => {
            universities.push({ value: item.name, label: item.name })
        })
    })

    const { userStore } = useDarkMode()
    const { user } = userStore
    const u = JSON.parse(JSON.stringify(user))
    console.log(u)
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
                                <h2 style={{ fontWeight: 700, fontSize: 20, color: '#212529' }} className='mt-2'>{u?.dsiplayName}</h2>
                                <h4 className='location-account'>Neftchala</h4>
                            </div>
                        </div>
                        <Formik
                            initialValues={{
                                dsiplayName: '',
                                userName: '',
                                email: '',
                                phoneNumber: '',
                                school: u.school, university: '', academicDegree: '', profession: '', bio: '', error: null
                            }}
                            onSubmit={(values, { setErrors }) => userStore.updateUserDetails(values).catch(error => setErrors({ error: 'Invalid Email or Password' }))}
                        >
                            {({ handleSubmit, errors, values }) => (
                                <form className="details-form" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <MyTextInput style='d-block form-control mt-0' label='Display Name' name='dsiplayName' type="text" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="">Username</label>
                                                <p style={{
                                                    padding: '0.7rem 0.8rem',
                                                    border:' 2px #eee solid',
                                                    color:'#6a6a6a',
                                                    fontWeight:500
                                                }} 
                                                className='d-block form-control'>{u.userName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <MyTextInput style='d-block form-control' label="Email" normal={true} name='email' type="text" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <MyTextInput style='d-block form-control' label="Phone" normal={true} name='phoneNumber' type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3">
                                            <MyTextInput style='d-block form-control' label="School" normal={true} name='school' type="text" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="">University</label>
                                            <Select defaultValue={u?.university} options={universities} name='university' />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <MyTextInput style='d-block form-control' normal={true} label="Academic Degree" name='academicDegree' defaultValue={u?.academicDegree} type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3">
                                            <MyTextInput style='d-block form-control' label="Profession" normal={true} name='profession' defaultValue={u?.profession} type="text" />
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
                                                <label htmlFor="">Bio</label>
                                                <textarea className='d-block form-control p-3' name='bio' defaultValue={u?.bio} placeholder='Write your description' />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 mb-3">
                                            <button className='save-btn' type="submit">Save</button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
})


