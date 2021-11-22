import React from "react";
import { FcLike } from "react-icons/fc";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";

export default function PostWithPhoto() {

    return (
        <>
            <div className='post-with-photo'>
                <div className='post-with-photo-header d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <span className='post-with-photo-user-photo me-3'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-12.png').default} alt="" />
                        </span>
                        <div className='d-flex flex-column post-with-photo-header-left'>
                            <h4 style={{ fontWeight: 700 }} className='mb-0 post-with-photo-user-name '>
                                Ilham Baghirov
                            </h4>
                            <span>
                                2 hour ago
                            </span>
                        </div>
                    </div>
                    <a href="" className='post-with-photo-menu'>
                        <BsThreeDots />
                    </a>
                </div>

                <div className='post-with-photo-quote'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur possimus nesciunt neque deleniti dolores, nobis ratione itaque,
                        adipisci architecto, aspernatur repudiandae aliquid. Nobis alias natus nihil dolore architecto.
                        Veritatis, amet.
                        <a href="">See More</a></p>
                </div>
                <div className='post-with-photo-pic'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <a href="#">
                                <img src={require('../../../assets/images/t-31.jpg').default} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='post-with-photo-footer d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <a className='likes d-flex align-items-center me-4' href="">
                            <FcLike className='likes-icon' />
                            <span className='likes-count'>2.8K Like</span>
                        </a>
                        <a className='likes d-flex align-items-center ' href="">
                            <AiOutlineComment className='likes-icon' />
                            <span className='likes-count'>22 Comment</span>
                        </a>
                    </div>
                    <a href="">
                        <AiOutlineShareAlt className='share-icon me-1' />
                        <span className='likes-count'>Share</span>
                    </a>
                </div>
            </div>
            <div className='post-with-photo'>
                <div className='post-with-photo-header d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <span className='post-with-photo-user-photo me-3'>
                            <img className='user-profile-pic' src={require('../../../assets/images/user-8.png').default} alt="" />
                        </span>
                        <div className='d-flex flex-column post-with-photo-header-left'>
                            <h4 style={{ fontWeight: 700 }} className='mb-0 post-with-photo-user-name '>
                                Aysel Baghirova
                            </h4>
                            <span>
                                2 hour ago
                            </span>
                        </div>
                    </div>
                    <a href="" className='post-with-photo-menu'>
                        <BsThreeDots />
                    </a>
                </div>

                <div className='post-with-photo-quote'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur possimus nesciunt neque deleniti dolores, nobis ratione itaque,
                        adipisci architecto, aspernatur repudiandae aliquid. Nobis alias natus nihil dolore architecto.
                        Veritatis, amet.
                        <a href="">See More</a></p>
                </div>
                <div className='post-with-photo-footer d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <a className='likes d-flex align-items-center me-4' href="">
                            <FcLike className='likes-icon' />
                            <span className='likes-count'>2.8K Like</span>
                        </a>
                        <a className='likes d-flex align-items-center ' href="">
                            <AiOutlineComment className='likes-icon' />
                            <span className='likes-count'>22 Comment</span>
                        </a>
                    </div>
                    <a href="">
                        <AiOutlineShareAlt className='share-icon me-1' />
                        <span className='likes-count'>Share</span>
                    </a>
                </div>
            </div>
        </>
    )
}