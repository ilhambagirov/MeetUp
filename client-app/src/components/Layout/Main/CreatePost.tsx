import React from "react";
import { MdOutlineCreate } from 'react-icons/md'
import { FiImage } from 'react-icons/fi'
import './Main.scss'
import { observer } from "mobx-react-lite";
import classNames from "classnames";
import { useDarkMode } from "../../../app/stores/store";
import { Formik } from "formik";
import * as Yup from 'yup'
import { PostFormValues } from "../../../app/models/post";
import { v4 as uuid } from 'uuid';
import MyTextArea from "../../../app/common/MyTextArea";
import MyTextInput from "../../../app/common/MyTextInput";


export default observer(function CreatePost() {
    //custom hooks
    const { activitystore, postStore } = useDarkMode()
    const { darkMode } = activitystore
    const { createActivity } = postStore

    //classnames
    const postAdd = classNames("post-add", { "postadd-dark-mode": darkMode })
    const postAddSpans = classNames("create-post-link", { "create-post-link-dark": darkMode })
    const postAddTextArea = classNames("post-textarea", { "post-textarea-dark": darkMode })

    const validationSchema = Yup.object(
        {
            title: Yup.string().required("The title is required"),
        }
    )

    function handleFormSubmit(post: PostFormValues) {
        let newActivity = {
            ...post,
            id: uuid()
        }
        createActivity(newActivity)

        console.log('salam')
    }
    return (
        <div className={postAdd}>

            <Formik validationSchema={validationSchema}
                onSubmit={values => handleFormSubmit(values)}
                enableReinitialize
                initialValues={{ title: '' }}
            >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <form onSubmit={handleSubmit} >
                        <div className='post-header'>
                            <button type="submit" className='d-flex align-items-center'>
                                <MdOutlineCreate className='create-button-post me-1' />
                                <span className='create-post-link'>Create Post</span>
                            </button>
                        </div>
                        <div className='post-content'>
                            <span className='me-2 my-profile-img-add-post-wrapper'>
                                <img className='my-profile-img-add-post' src={require('../../../assets/images/user-11.png').default} alt="" />
                            </span>
                            <MyTextInput name='title' style={postAddTextArea} placeholder='Create your post' />
                        </div>
                    </form>
                )}
            </Formik>
            <div className='post-footer'>
                <a href="">
                    <FiImage />
                    <span className={postAddSpans}>Photo/Video</span>
                </a>
            </div>
        </div>
    )
})
