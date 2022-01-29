import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState, useEffect, useRef } from 'react'
import MyTextInput from '../../../app/common/MyTextInput';
import { User } from '../../../app/models/user';
import { dark, useDarkMode } from "../../../app/stores/store";
import './ChatBox.scss'
import ScrollableFeed from 'react-scrollable-feed'
import { formatDistanceToNow } from 'date-fns';
import { FiSend } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default observer(function ChatBox() {

    const { chatStore, userStore } = useDarkMode()
    const { boxMode } = chatStore
    const { user } = userStore
    const u = user as User

    const receiver = chatStore.users.find(x => x.userName == chatStore.receiverName)


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
        console.log(formatDistanceToNow(new Date('2022-01-21 14:57:15.0286944Z')) + 'ago')
    }, []);

    return (
        <div className='chatBox'>
            <div className='chat-header d-flex justify-content-between'>
                <div className='d-flex'>
                    <span className='me-2'>
                        <img className='friends-profile-img' src={receiver?.image || require('../../../assets/images/user-12.png').default} alt="" />
                    </span>
                    <h3 className='fw-700 mb-0 mt-0 d-flex align-items-center'>
                        <a className='friends-names'>{chatStore.receiverName}</a>
                    </h3>
                </div>
                <div onClick={() => chatStore.setBoxMode(receiver?.userName)}>
                    <AiOutlineCloseCircle className='close-box' />
                </div>
            </div>
            <div className='messages'>
                <ScrollableFeed>
                    {chatStore.messages.map(message => (
                        message.messageText ?
                            <>  <div key={message.id} className={message.sender?.userName === u?.userName ? 'sender mb-1' : 'receiver mb-1'}>{message.messageText}</div>
                                <div key={message.id + 1} className={message.sender?.userName === u?.userName ? 'sender-date mb-1' : "mb-1"}>{formatDistanceToNow(new Date(message.date)) + 'ago'}</div></>
                            :
                            <>
                                <div key={message.id} className='sender mb-1'>{message}</div>
                                {/* <div key={message.id + 1} className='sender-date mb-1'>{message.date + ' ago'}</div> */}
                            </>
                    ))}
                </ScrollableFeed>
                {/* <div ref={messagesEndRef} /> */}
            </div>
            <div className='footer-box mb-1'>
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        chatStore.sendMessage(values).then(() => resetForm())
                        // scrollToBottom()
                    }
                    }
                    initialValues={{ message: '' }}>
                    {({ isSubmitting, isValid, handleSubmit }) => (
                        <Form className='d-flex justify-content-between align-items-end'>
                            <div className='col-10'><MyTextInput autoComplete='off' style="ml-1 shadow-none textarea chat-textarea send-input"
                                name="message"
                                placeholder="Add message" /></div>
                            <button type='submit' className='col-2 btn sendBtn'><FiSend /></button>
                        </Form>
                    )}
                </Formik>
            </div >
        </div >
    )
})






