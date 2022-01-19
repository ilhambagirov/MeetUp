import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react'
import MyTextInput from '../../../app/common/MyTextInput';
import { User } from '../../../app/models/user';
import { dark, useDarkMode } from "../../../app/stores/store";
import './ChatBox.scss'
import ScrollableFeed from 'react-scrollable-feed'

export default observer(function ChatBox() {

    const { chatStore, userStore } = useDarkMode()
    const { boxMode } = chatStore
    const { user } = userStore
    const u = user as User


    // const messagesEndRef = useRef(null)

    // const scrollToBottom = () => {
    //     console.log('salam auye')
    //     messagesEndRef.current?.scrollIntoView({
    //         behavior: "smooth", block: 'start', inline: "nearest"
    //     })
    // }

    React.useEffect(() => {
        console.log('salam')
        window.scrollTo(10, 10);
    }, []);

    return (
        <div className='chatBox'>
            <div className='messages'>
                <ScrollableFeed>
                    {chatStore.messages.map(message => (
                        message.messageText ?
                            <div key={message.id} className={message.sender?.userName === u?.userName ? 'sender mb-1 p-1' : 'receiver mb-1 p-1'}>{message.messageText}</div>
                            :
                            <div key={message.id} className='sender mb-1 p-1'>{message}</div>
                    ))}
                </ScrollableFeed>
                {/* <div ref={messagesEndRef} /> */}
            </div>
            <div className='d-flex footer-box'>
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        chatStore.sendMessage(values).then(() => resetForm())
                        // scrollToBottom()
                    }
                    }
                    initialValues={{ message: '' }}>
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form>
                            <MyTextInput style="col-8 form-control ml-1 shadow-none textarea comment-textarea"
                                name="message"
                                placeholder="Add Comment" />
                            <button type='submit' className='col-4'>Send</button>
                        </Form>
                    )}
                </Formik>
            </div >
        </div >
    )
})






