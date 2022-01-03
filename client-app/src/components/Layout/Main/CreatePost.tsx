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
import MyTextInput from "../../../app/common/MyTextInput";
import { User } from "../../../app/models/user";


export default observer(function CreatePost() {
    //custom hooks
    const { activitystore, postStore, userStore } = useDarkMode()
    const { darkMode } = activitystore
    const { createActivity } = postStore
    let { user } = userStore 
    const user1 = user as User

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
        let newActivity = {
            ...post,
            id: uuid()
        }
        // window.location.pathname === '/userprofile' ? 
        // userStore.createPostFromProfile(newActivity) :
            createActivity(newActivity)
        console.log(postStore.groupedPosts)
    }
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
                                <img className='my-profile-img-add-post' src={user1.image || require('../../../assets/images/user-12.png').default} alt="" />
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
