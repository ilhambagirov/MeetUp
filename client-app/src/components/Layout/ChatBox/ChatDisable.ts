import { observer } from 'mobx-react-lite';
import React, { useState, useEffect } from 'react'
import { UseChatMode } from '../../../app/stores/chatboxstore';



export default function UserWindow():boolean {

    const { chatstore } = UseChatMode()
    const { ChatMode, setChatMode } = chatstore

    useEffect(() => {
        window.addEventListener('resize', setChatMode);

        return (() => {
            window.removeEventListener('resize', setChatMode);
        })
    }, [setChatMode])
    return (
        ChatMode
    )
}