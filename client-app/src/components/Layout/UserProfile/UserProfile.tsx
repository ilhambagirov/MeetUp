import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsEnvelope } from "react-icons/bs";
import { User } from "../../../app/models/user";
import { useDarkMode } from "../../../app/stores/store";
import CreatePost from "../Main/CreatePost";
import '../Main/Main.scss'
import PopularEvents from "../Main/PopularEvents";
import PostWithPhoto from "../Main/PostWithPhoto";
import './UserProfile.scss'
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";
import { FiDroplet, FiPlus } from "react-icons/fi";
import { history } from "../../..";
import { TailSpin } from "react-loader-spinner";

export default observer(function UserProfile(props: any) {
    const { postStore, profileStore, userStore, chatStore } = useDarkMode();
    const { groupedPosts } = postStore
    const { profile, changeImage, updateFollowing } = profileStore
    const user1 = profile as User
    const { user } = userStore
    const user2 = user as User
    // modal

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        var point = window.location.pathname.lastIndexOf('/')
        profileStore.loadProfile(window.location.pathname.substring(point + 1))
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [profileStore.loadProfile, props.location])

    // photo upload

    const styleDropzone = {
        borderColor: '#eee',
        borderRadius: '5px',
        textAlign: 'center' as 'center',
        height: 300,
        position: 'relative' as 'relative'
    }
    const styleDropzoneActive = {
        borderColor: 'green',
    }
    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((item: any) => Object.assign(item, {
            preview: URL.createObjectURL(item)
        })))
    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
                        <Tabs>
                            <div className='col-xl-12 userprofile-header'>
                                <div className='header-content mb-3 mt-3'>
                                    <div className='background-image-profile '></div>
                                    <div className="header-body">
                                        <figure onClick={openModal} className='user-prof-image'>
                                            <img className='w-100' src={user1?.image || require('../../../assets/images/avatar3.jpg').default} alt="" />
                                        </figure>
                                        {user1?.userName === user2?.userName && <Modal
                                            isOpen={modalIsOpen}
                                            onRequestClose={closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <div className="photoupload-modal">
                                                <div {...getRootProps()} className='' style={isDragActive ? { ...styleDropzone, ...styleDropzoneActive } : { ...styleDropzone }}>
                                                    {/* <MdOutlineCancel onClick={(e) => {
                                                    closeModal()
                                                    e.stopPropagation()
                                                }} className="cancel-upload-photo" /> */}
                                                    <input {...getInputProps()} />
                                                    {files && files.length > 0 ?
                                                        <>
                                                            <img style={{ width: '400px', height: '400px', borderRadius: '50%' }} src={files[0].preview} alt="" />
                                                            <div className='add-button-wrap'>
                                                                <div onClick={(e) => {
                                                                    changeImage(files[0])
                                                                    closeModal()
                                                                    e.stopPropagation()
                                                                }}>
                                                                    <span className='add-button'>
                                                                        <FiPlus className='add-icon' />
                                                                    </span>
                                                                    <h4 style={{ fontWeight: 700 }} className='mb-1 mt-2 story-author' >Add Photo</h4>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="icon-drop">
                                                                <FiDroplet className="drop-upload-photo" />
                                                                <p>Drag & Drop or Upload</p>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </Modal>}
                                        <h4 style={{ fontWeight: 700, letterSpacing: 0.4, fontSize: 18 }} className='mb-0'>{user1?.dsiplayName}</h4>
                                        <span className='username-user-profile'>{user1?.userName}</span>
                                        <div className='features-following d-flex align-items-center pt-0 position-absolute left-15 top-10 mt-3 ms-1'>
                                            <h4 style={{ fontWeight: 600 }}>
                                                <b>{user1?.posts?.length}</b>
                                                <span>Posts</span>
                                            </h4>
                                            <h4 style={{ fontWeight: 600 }}>
                                                <b>{user1?.followersCount}</b>
                                                <span>Followers</span>
                                            </h4>
                                            <h4 style={{ fontWeight: 600 }}>
                                                <b>{user1?.followingCount}</b>
                                                <span>Following</span>
                                            </h4>
                                            <h4 style={{ fontWeight: 600 }}>
                                                <b>{user1?.likesCount}</b>
                                                <span>Likes</span>
                                            </h4>
                                        </div>
                                        <a href="" className='follow-btn-left position-absolute'>Follow</a>
                                        {user1?.userName !== user2?.userName &&
                                            <div className='feature-btns d-flex align-items-center justify-content-center position-absolute right-15 top-10 mt-2 me-2'>
                                                {
                                                    user1?.following ?
                                                        <div onClick={() => updateFollowing(user1?.userName, user1.following)} className='unfollow-btn'>Unfollow</div>
                                                        :
                                                        <div onClick={() => updateFollowing(user1?.userName, user1.following)} className='follow-btn'>Follow</div>
                                                }
                                                <a className='other-btns-user-profile'>
                                                    <BsEnvelope onClick={() => chatStore.setBoxMode(user1?.userName)} />
                                                </a>
                                                <a className='other-btns-user-profile' href="">
                                                    <BiDotsHorizontalRounded />
                                                </a>
                                            </div>
                                        }
                                    </div>
                                    <div className='header-footer'>
                                        <TabList className='ps-4 d-flex'>
                                            <Tab className='me-5 pt-3 pb-3 ls-1 d-inline-block'>All</Tab>
                                            <Tab className='me-5 pt-3 pb-3 ls-1 d-inline-block'>Gallery</Tab>
                                            <Tab onClick={() => profileStore.loadFollow('followers')} className='me-5 pt-3 pb-3 ls-1 d-inline-block'>Followers</Tab>
                                            <Tab onClick={() => profileStore.loadFollow('following')} className='me-5 pt-3 pb-3 ls-1 d-inline-block'>Following</Tab>
                                        </TabList>
                                    </div>
                                </div>
                            </div>
                            <TabPanel>
                                <div className="row row-custom-user-profile">
                                    <div className='col-xl-4 col-xxl-4 col-lg-4 userprofile-left'>
                                        <PopularEvents />
                                    </div>
                                    <div className='col-xl-8 col-xxl-8 col-lg-8 userprofile-right mt-3'>
                                        {postStore.loading ?
                                            <div className="d-flex justify-content-center mb-5 post-loader-profile">
                                                <TailSpin
                                                    height={50}
                                                    width="50"
                                                    color='#0d6efd'
                                                    ariaLabel='loading'
                                                />
                                            </div>
                                            :
                                            <>
                                                <CreatePost />
                                                {groupedPosts.map((post) => (
                                                    <>
                                                        {console.log(post.value)}
                                                        <PostWithPhoto key={post.id}
                                                            post={post.value}
                                                            userr={user1} />
                                                    </>
                                                ))}</>
                                        }
                                    </div >
                                </div >
                            </TabPanel>
                            <TabPanel>
                                <div className="row d-flex row-custom-user-profile">
                                    {user1?.photos?.map((item) => (
                                        <div className='col-xl-3 text-center col-xxl-4 col-lg-3 userprofile-pics mt-3' key={item.id}><img src={item.url} alt="" /></div>
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row d-flex">
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
                                                        <a onClick={() => updateFollowing(item?.userName, item.following)} className='followbtn-recommended'>Unfollow</a>
                                                        :
                                                        <a onClick={() => updateFollowing(item?.userName, item.following)} className='followbtn-recommended'>Follow</a>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="row d-flex">
                                    {profileStore.followings?.map((item) => (
                                        <div className='person-card col-xl-2 text-center col-xxl-3 col-lg-2'>
                                            <div className='following'>
                                                <span className='person-card-image'>
                                                    <img className='user-profile-pic' src={item.image || require('../../../assets/images/user-11.png').default} alt="" />
                                                </span>
                                                <h4 style={{ fontWeight: 700 }} className='following-name'>
                                                    {item.dsiplayName}
                                                </h4>
                                                <p>{item.userName}</p>
                                                {
                                                    item?.following ?
                                                        <a onClick={() => updateFollowing(item?.userName, item.following)} className='followbtn-recommended'>Unfollow</a>
                                                        :
                                                        <a onClick={() => updateFollowing(item?.userName, item.following)} className='followbtn-recommended'>Follow</a>
                                                }
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
            </div>
    )
})