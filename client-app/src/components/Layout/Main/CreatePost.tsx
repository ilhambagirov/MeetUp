import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineCancel, MdOutlineCreate } from 'react-icons/md'
import { FiDroplet, FiImage } from 'react-icons/fi'
import './Main.scss'
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useDarkMode } from "../../../app/stores/store";
import { Formik } from "formik";
import * as Yup from 'yup'
import { PostFormValues } from "../../../app/models/post";
import { v4 as uuid } from 'uuid';
import MyTextInput from "../../../app/common/MyTextInput";
import { User } from "../../../app/models/user";
import PhotoWidgetDropzone from "../../../app/common/imageUpload/PhotoWidgetDropzone";
import { useDropzone } from "react-dropzone";


export default observer(function CreatePost() {
    //custom hooks
    const { activitystore, postStore, userStore, profileStore } = useDarkMode()
    const { darkMode } = activitystore
    const { profile } = profileStore
    const { createActivity, addPhotoMode, setAddPhotoMode } = postStore
    let { user } = userStore
    const user1 = user as User
    const user2 = profile as User


    //classnames
    const postAdd = classNames("post-add", { "postadd-dark-mode": darkMode })
    const postAddSpans = classNames("create-post-link", { "create-post-link-dark": darkMode })
    const postAddTextArea = classNames("post-textarea", { "post-textarea-dark": darkMode })

    const validationSchema = Yup.object(
        {
            title: Yup.string().required("The title is required"),
        }
    )
    const initialValues = { title: '' }
    function handleFormSubmit(post: PostFormValues) {
        files.length > 0 ? post.filePath = files[0] : post.filePath = null
        let newActivity = {
            ...post,
            id: uuid()
        }
        // window.location.pathname === '/userprofile' ? 
        // userStore.createPostFromProfile(newActivity) :
        createActivity(newActivity)
        setAddPhotoMode(false)
    }

    // photo upload

    const styleDropzone = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        textAlign: 'center' as 'center',
        height: 300,
        position: 'relative' as 'relative'
    }
    const styleDropzoneActive = {
        borderColor: 'green',
    }
    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((item: any) => Object.assign(item, {
            preview: URL.createObjectURL(item)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.url))
        }
    })

   
    return (
        <div className={postAdd}>
            <Formik validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                    await handleFormSubmit(values)
                    actions.resetForm()
                }}
                enableReinitialize
                initialValues={initialValues}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <form onSubmit={handleSubmit} >
                        <div className='post-header'>
                            <button type="submit" className='create-post-btn d-flex align-items-center'>
                                <MdOutlineCreate className='create-button-post me-1' />
                                <span className='create-post-link'>Create Post</span>
                            </button>
                        </div>
                        <div className='post-content'>
                            <span className='me-2 my-profile-img-add-post-wrapper'>
                                <img className='my-profile-img-add-post' src={ user1?.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                            </span>
                            <MyTextInput name='title' style={postAddTextArea} placeholder='What do you think?' />
                        </div>
                        {addPhotoMode &&
                            // <PhotoWidgetDropzone />
                            <div {...getRootProps()} className='mt-3' style={isDragActive ? { ...styleDropzone, ...styleDropzoneActive } : { ...styleDropzone }}>
                                <MdOutlineCancel onClick={(e) => {
                                    setAddPhotoMode(false)
                                    console.log(e)
                                    e.stopPropagation()
                                }} className="cancel-upload-photo" />
                                <input {...getInputProps()} />
                                {files && files.length > 0 ?
                                    <img style={{ width: '359px', height: '295px' }} src={files[0].preview} alt="" />
                                    :
                                    <>
                                        <div style={{ marginTop: '3rem' }}>
                                            <FiDroplet className="drop-upload-photo" />
                                            <p>Drag & Drop or Upload</p>
                                        </div>
                                    </>
                                }
                            </div>
                        }
                    </form>
                )}
            </Formik>
            {
                !addPhotoMode && <div className='post-footer'>
                    <div onClick={() => setAddPhotoMode(true)}>
                        <FiImage style={{ color: 'green', width: '20px', height: '25px' }} />
                        <span className={postAddSpans}>Photo</span>
                    </div>
                </div>
            }
        </div >
    )
})
