import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { User } from "../../../app/models/user";
import { useDarkMode } from "../../../app/stores/store";
import { history } from "../../..";
import './Follow.scss'

export default observer(function Followers(props: any) {
    const { profileStore, userStore } = useDarkMode();
    const { loadFollows } = profileStore
    const { loadUser } = userStore

    useEffect(() => {
        loadUser().then(result =>
            loadFollows(result?.userName, 'following')
        )
    }, [profileStore.loadProfile, props.location])
    return (
        <div className='main-content'>
            <div className='UserProfile-wrapper'>
                <div className='UserProfile-body'>
                    <div className="row d-flex">
                        <h3>My Followings</h3>
                        {profileStore.followings?.map((item) => (
                            <div className='person-card col-xl-2 text-center col-xxl-3 col-lg-2'>
                                <div className='following'>
                                    <span onClick={() => {
                                        history.push(`/userprofile/${item?.userName}`)
                                    }} className='person-card-image'>
                                        <img className='user-profile-pic' src={item.image || require('../../../assets/images/user-11.png').default} alt="" />
                                    </span>
                                    <h4 style={{ fontWeight: 700 }} className='following-name'>
                                        {item.dsiplayName}
                                    </h4>
                                    <p>@{item.userName}</p>
                                    {
                                        item?.following ?
                                            <a onClick={() => profileStore.updateFollowings(item?.userName, item.following)} className='unfollow-btn'>Unfollow</a>
                                            :
                                            <a onClick={() => profileStore.updateFollowings(item?.userName, item.following)} className='followbtn-recommended'>Follow</a>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
})