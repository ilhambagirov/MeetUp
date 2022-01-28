import Slider from "react-slick";
import React from "react";
import './PeopleRecomended.scss'
import { useDarkMode } from "../../../app/stores/store";
import classNames from "classnames";
import { User } from "../../../app/models/user";
import { Link } from "react-router-dom";
import ChatStore from "../../../app/stores/chatstore";
import { observer } from "mobx-react-lite";
interface Props {
    users: User[]
}
export default observer(function PeopleRecomended({ users }: Props) {
    const settings = {
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 0,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const { activitystore, chatStore } = useDarkMode()
    const { darkMode } = activitystore

    const Names = classNames("person-card-username", { "person-card-username-dark": darkMode })
    const People = classNames("person-card-body", { "person-card-body-dark": darkMode })
    return (
        <div className='people-recommended mb-5'>
            <Slider {...settings}>
                {users.map(user => (
                    <div className='person-card'>
                        <div className={People}>
                            <Link to={`/userprofile/${user?.userName}`} className='person-card-image'>
                                <img className='user-profile-pic' src={user.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                            </Link>
                            <h4 style={{ fontWeight: 700 }} className={Names}>
                                {user?.dsiplayName}
                            </h4>
                            <p>@{user?.userName}</p>
                            {user.following ?
                                <a onClick={() => {
                                    chatStore.updateFollowing(user?.userName, user?.following)
                                }} className='unfollow-btn' >Unfollow</a>
                                :
                                <a onClick={() => {
                                    chatStore.updateFollowing(user?.userName, user?.following)
                                }
                                } className='followbtn-recommended'>Follow</a>
                            }
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
})