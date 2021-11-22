import React from "react";
import './Main.scss'
import Slider from "react-slick";
import { FiPlus } from "react-icons/fi";
import { useDarkMode } from "../../../app/stores/store";
import classNames from "classnames";
import { observer } from "mobx-react-lite";

export default observer(function StorySlider() {
    //react slider settings
    const settings = {
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
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
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    //custom hooks
    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    const addSlide = classNames("story-item story-item-add", { "darkModeadd-slider": darkMode })
    return (
        <div className='story-slider'>
            <Slider {...settings}>
                <div className='story'>
                    <div className={addSlide}>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <FiPlus className='add-icon' />
                                </span>
                                <h4 style={{ fontWeight: 700 }} className='mb-1 mt-2 story-author' >Add Story</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{ backgroundImage: 'url(/static/media/s-1.2af0f014.jpg)' }} className='story-item stories-bottom-shadow'>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                                </span>
                                <h4 style={{ fontWeight: 600 }} className='mb-1 mt-2 story-author story-img-down' >Aysel Bagirova</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='story-item stories-bottom-shadow story-of-user-slide'>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <img className='user-profile-pic' src={require('../../../assets/images/user-12.png').default} alt="" />
                                </span>
                                <h4 style={{ fontWeight: 600 }} className='mb-1 mt-2 story-author story-img-down' >Ilham Bagirov</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='story-item stories-bottom-shadow story-of-user-slide2'>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                                </span>
                                <h4 style={{ fontWeight: 600 }} className='mb-1 mt-2 story-author story-img-down' >Aysel Bagirova</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='story-item stories-bottom-shadow story-of-user-slide'>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <img className='user-profile-pic' src={require('../../../assets/images/user-12.png').default} alt="" />
                                </span>
                                <h4 style={{ fontWeight: 600 }} className='mb-1 mt-2 story-author story-img-down' >Ilham Bagirov</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='story-item stories-bottom-shadow story-of-user-slide2'>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                                </span>
                                <h4 style={{ fontWeight: 600 }} className='mb-1 mt-2 story-author story-img-down' >Aysel Bagirova</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='story-item stories-bottom-shadow story-of-user-slide'>
                        <div className='add-button-wrap'>
                            <a href="#">
                                <span className='add-button'>
                                    <img className='user-profile-pic' src={require('../../../assets/images/user-12.png').default} alt="" />
                                </span>
                                <h4 style={{ fontWeight: 600 }} className='mb-1 mt-2 story-author story-img-down' >Ilham Bagirov</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    )
})