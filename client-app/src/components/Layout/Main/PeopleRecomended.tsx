import Slider from "react-slick";
import React from "react";
import './PeopleRecomended.scss'
import { useDarkMode } from "../../../app/stores/store";
import classNames from "classnames";

export default  function PeopleRecomended() {
    const settings = {
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 5,
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
                    slidesToScroll: 2,
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

    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    const Names = classNames("person-card-username", { "person-card-username-dark": darkMode })
    const People = classNames("person-card-body", { "person-card-body-dark": darkMode })
    return (
        <div className='people-recommended'>
            <Slider {...settings}>
                <div className='person-card'>
                    <div className={People}>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className={Names}>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className={People}>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-8.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className={Names}>
                            Aysel Baghirova
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className={People}>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-12.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className={Names}>
                            Tatyana July
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className={People}>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className={Names}>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className={People}>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className={Names}>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
            </Slider>
        </div>
    )
}