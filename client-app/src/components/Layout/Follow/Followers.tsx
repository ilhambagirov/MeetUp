import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { User } from "../../../app/models/user";
import { useDarkMode } from "../../../app/stores/store";
import { history } from "../../..";
import './Follow.scss'
import { TailSpin } from "react-loader-spinner";
export default observer(function Followers(props: any) {
    const { profileStore, userStore } = useDarkMode();
    const { updateFollowing, loadFollows } = profileStore
    const { loadUser } = userStore
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        loadUser().then(result =>
            loadFollows(result?.userName, 'followers')
        )
       setTimeout(() => {
        setLoading(false)
       }, 500);
    }, [profileStore.loadProfile, props.location])
    return (
        loading ?
        <div className="d-flex justify-content-center mb-5 post-loader">
            <TailSpin
                height={50}
                width="50"
                color='#0d6efd'
                ariaLabel='loading'
            />
        </div>
        :
        <div className='main-content'>
            <div className='UserProfile-wrapper'>
                <div className='UserProfile-body'>
                    <div className="row d-flex">
                    <h3>My Followers</h3>
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