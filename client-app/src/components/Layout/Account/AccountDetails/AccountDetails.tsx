import React, { useEffect, useState } from "react";
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
import { User } from "../../../../app/models/user";

export default observer(function AccountDetails() {

    const universities: { value: any; label: any }[] = []
    agent.Universities.get().then(data => {
        data.map((item: any) => {
            universities.push({ value: item.name, label: item.name })
        })
    })
    const [editModeDetails, setEditModeDetails] = useState(false)

    const { userStore } = useDarkMode()
    const { user } = userStore
    const u = user as User
    return (
        <div className='main-content account-detail-content'>
            <div className='account-wrapper'>
                <div className="account-header border-0 p-4 w-100 d-flex align-items-center">
                    <Link to='/settings'>
                        <AiOutlineArrowLeft className='goback-icon' />
                    </Link>
                    <h4 style={{ fontWeight: 600 }} className='ms-4 mt-0 mb-0'>Account Details</h4>
                </div>
                <div className="account-content border-0 p-lg-5 p-4 d-flex align-items-center justify-content-center">
                    <div className='User-profile-pic w-100'>
                        <div className="row justify-content-center">
                            <div className="col-lg-4 text-center">
                                <figure className='ms-auto me-auto mb-0 mt-2 w100'>
                                    <img className='w-100' src={u?.image || require('../../../../assets/images/avatar3.jpg').default} alt="" />
                                </figure>
                                <h2 style={{ fontWeight: 700, fontSize: 20, color: '#212529' }} className='mt-2'>{u?.dsiplayName}</h2>
                                <h4 className='location-account'>Neftchala</h4>
                            </div>
                        </div>
                        {
                            !editModeDetails ?
                                <form className="details-form">
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="">Display Name</label>
                                            <p style={{
                                                padding: '0.7rem 0.8rem',
                                                border: ' 2px #eee solid',
                                                color: '#6a6a6a',
                                                fontWeight: 500
                                            }}
                                                className='d-block form-control'>{u.dsiplayName}</p>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="">Username</label>
                                                <p style={{
                                                    padding: '0.7rem 0.8rem',
                                                    border: ' 2px #eee solid',
                                                    color: '#6a6a6a',
                                                    fontWeight: 500
                                                }}
                                                    className='d-block form-control'>{u.userName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="">Email</label>
                                            <p style={{
                                                padding: '0.7rem 0.8rem',
                                                border: ' 2px #eee solid',
                                                color: '#6a6a6a',
                                                fontWeight: 500
                                            }}
                                                className='d-block form-control'>{u.email}</p>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="">Phone Number</label>
                                                <p style={{
                                                    padding: '0.7rem 0.8rem',
                                                    border: ' 2px #eee solid',
                                                    color: '#6a6a6a',
                                                    fontWeight: 500
                                                }}
                                                    className='d-block form-control'>{u.phoneNumber ? u.phoneNumber : 'Empty'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3">
                                            <label htmlFor="">School</label>
                                            <p style={{
                                                padding: '0.7rem 0.8rem',
                                                border: ' 2px #eee solid',
                                                color: '#6a6a6a',
                                                fontWeight: 500
                                            }}
                                                className='d-block form-control'>{u.school ? u.school : 'Empty'}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="">University</label>
                                            <Select options={universities} name='university' />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <div className="form-group">
                                                <label htmlFor="">Academic Degree</label>
                                                <p style={{
                                                    padding: '0.7rem 0.8rem',
                                                    border: ' 2px #eee solid',
                                                    color: '#6a6a6a',
                                                    fontWeight: 500
                                                }}
                                                    className='d-block form-control'>{u.academicDegree ? u.academicDegree : 'Empty'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3">
                                            <label htmlFor="">Profession</label>
                                            <p style={{
                                                padding: '0.7rem 0.8rem',
                                                border: ' 2px #eee solid',
                                                color: '#6a6a6a',
                                                fontWeight: 500
                                            }}
                                                className='d-block form-control'>{u.profession ? u.profession : 'Empty'}</p>
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
                                            <a onClick={() => setEditModeDetails(true)} className='save-btn'>Edit</a>
                                        </div>
                                    </div>
                                </form>
                                :
                                <Formik
                                    initialValues={{
                                        dsiplayName: ({ ...u })?.dsiplayName?.toString() || null,
                                        userName: '',
                                        email: ({ ...u })?.email?.toString() || null,
                                        phoneNumber: ({ ...u })?.phoneNumber?.toString() || null,
                                        school: ({ ...u })?.school?.toString() || null,
                                        university: ({ ...u })?.university?.toString() || null,
                                        academicDegree: ({ ...u })?.academicDegree?.toString() || null,
                                        profession: ({ ...u })?.profession?.toString() || null,
                                        bio: ({ ...u })?.bio?.toString() || null,
                                        error: null
                                    }}
                                    onSubmit={(values, { setErrors }) => (
                                        userStore.updateUserDetails(values).catch(error => setErrors({ error: 'Invalid Email or Password' })
                                        ))}
                                >
                                    {({ handleSubmit, errors, values }) => (
                                        <form className="details-form" onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <MyTextInput name='dsiplayName' style='d-block form-control mt-0' label='Display Name' type="text" />
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Username</label>
                                                        <p style={{
                                                            padding: '0.7rem 0.8rem',
                                                            border: ' 2px #eee solid',
                                                            color: '#6a6a6a',
                                                            fontWeight: 500
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
                                                    <MyTextInput style='d-block form-control' defaultValue={u.school} label="School" normal={true} name='school' type="text" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-6 mb-3">
                                                    <label htmlFor="">University</label>
                                                    <Select options={universities} name='university' />
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
                                                <div className="d-flex">
                                                    <div onClick={() => setTimeout(() => (setEditModeDetails(false), 1000))} className="col-lg-3 mb-3">
                                                        <button className='save-btn' type="submit">Save</button>
                                                    </div>
                                                    <div className="col-lg-3 ms-2 mb-3">
                                                        <button onClick={() => setEditModeDetails(false)} className='save-btn'>Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
})


