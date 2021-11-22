import Slider from "react-slick";
import React from "react";
import './PeopleRecomended.scss'

export default function PeopleRecomended() {
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
    return (
        <div className='people-recommended'>
            <Slider {...settings}>
                <div className='person-card'>
                    <div className='person-card-body'>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className='person-card-username'>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className='person-card-body'>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className='person-card-username'>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className='person-card-body'>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className='person-card-username'>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className='person-card-body'>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className='person-card-username'>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className='person-card-body'>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className='person-card-username'>
                            Ilham Baghirov
                        </h4>
                        <p>@ilhambb</p>
                        <a className='followbtn-recommended' href="">Follow</a>
                    </div>
                </div>
                <div className='person-card'>
                    <div className='person-card-body'>
                        <span className='person-card-image'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-11.png').default} alt="" />
                        </span>
                        <h4 style={{ fontWeight: 700 }} className='person-card-username'>
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