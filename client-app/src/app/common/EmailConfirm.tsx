import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useDarkMode } from "../stores/store";

export default observer(function EmailConfirm(this: any) {

    const { userStore } = useDarkMode()
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const username = params.get('UserName');
        userStore.emailConfirm(token, username)
    }, [userStore.emailConfirm])
    return (
        <div className="alert alert-primary" role="alert">
            {
                userStore.errorData !== null ?
                    userStore.errorData
                    :
                    <p>Your Email is confirmed successfully. Now Log In!!</p>
            }
        </div>
    )
})