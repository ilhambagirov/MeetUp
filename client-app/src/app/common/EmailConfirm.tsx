import React, { useEffect } from "react";
import { useDarkMode } from "../stores/store";

export default function EmailConfirm(this: any) {

    const { userStore } = useDarkMode()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const username = params.get('UserName');
        console.log(token , username)
        userStore.emailConfirm(token, username)
    }, [userStore.emailConfirm])
    return (
        <div className="alert alert-primary" role="alert">
            Your Email is confirmed successfully. Now Log In!!
        </div>
    )
}