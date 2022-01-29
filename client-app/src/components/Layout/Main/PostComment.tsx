import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MyTextInput from "../../../app/common/MyTextInput";
import { User } from "../../../app/models/user";
import { useDarkMode } from "../../../app/stores/store";
import { format, formatDistanceToNow } from 'date-fns'
import * as Yup from 'yup'

interface Props {
    postId: number
    userId: string
}

export default observer(function PostComment({ postId, userId }: Props) {
    const { commentStore, userStore, chatStore } = useDarkMode()
    const { user } = userStore
    const user1 = user as User

    useEffect(() => {
        if (postId) {
            commentStore.loadComment(postId.toString())
        }

    }, [commentStore, postId])

    const validationSchema = Yup.object(
        {
            body: Yup.string().required("The body is required"),
        }
    )
    return (
        <>
            {commentStore.comments.map(comment => (
                <div className="mt-3 d-flex" key={comment.id}>
                    {console.log(comment)}
                    <Link to={`/userprofile/${comment.username}`}>
                        <img className="rounded-circle me-2" src={comment.image || "https://i.imgur.com/RpzrMR2.jpg"} width="40" height="40" />
                    </Link>
                    <div className="user d-flex flex-column">
                        <span className="d-flex justify-content-between">
                            <small className="font-weight-bold me-2 username-comment">{comment.dsiplayName}</small>
                            <small>{formatDistanceToNow(new Date(comment.createdDate!)) + ' ago'}</small>
                            {console.log(comment.createdDate)}
                        </span>
                        <span >
                            <small className="comment">{comment.body}</small>
                        </span>
                        {/* <div className="action d-flex justify-content-between mt-2 align-items-center">
                 <div className="reply px-4"> <small>Remove</small>  </div>
             </div> */}
                    </div>
                </div>
            ))}

            <div className="mt-3">
                <Formik
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) =>
                        commentStore.addComment(values, userId).then(() => resetForm())}
                    initialValues={{ body: '', postId: postId.toString() }}>
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-end comment-body">
                                <img className="rounded-circle me-1" src={user1.image || "https://i.imgur.com/RpzrMR2.jpg"} width="40" />
                                <MyTextInput style="form-control ml-1 shadow-none textarea comment-textarea"
                                    name="body"
                                    placeholder="Add Comment" />
                            </div>
                            <div className="mt-2 text-right d-flex justify-content-end btns-com">
                                <button className="btn btn-primary btn-sm shadow-none me-2" type="submit">Post comment</button>
                                <button onClick={() => commentStore.commentMode !== postId ? commentStore.setCommentMode(postId) : commentStore.setCommentMode(0)} className="btn btn-outline-primary btn-sm ml-1 shadow-none" type="button">Cancel</button>
                            </div>
                        </Form>
                    )}

                </Formik>
            </div>
        </>
    )
})