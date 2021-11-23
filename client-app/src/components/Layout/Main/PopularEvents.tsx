import classNames from "classnames";
import React from "react";
import { useDarkMode } from "../../../app/stores/store";


export default function PopularEvents() {

    const { activitystore } = useDarkMode()
    const { darkMode } = activitystore

    const desc = classNames("popular-events-wrapper", { "popular-events-wrapper-dark": darkMode })
    const event = classNames("event", { "event-dark": darkMode })
    const headerEvents = classNames("header-events", { "header-events-dark": darkMode })

    return (
        <div className={desc}>
            <div className='popular-events-header d-flex align-items-center justify-content-between'>
                <h4  style={{ fontWeight: 700 }} className={headerEvents}>Events</h4>
                <a href="">See all</a>
            </div>
            <div className='popular-events d-flex align-items-center '>
                <div className='bg-success me-2 p-3 date-wrapper d-flex'>
                    <h4>
                        <span className='ls-1 d-block font-xsss text-white fw-600'>FEB</span>
                        22
                    </h4>
                </div>
                <h4 className='event-info'>
                    <span className={event} style={{ fontWeight: 700 }}> Meeting with clients</span>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#adb5bd' }} className='ls-1 d-block fw-600 event-address-main'>41 madison ave, floor 24 new work, NY 10010</span>
                </h4>
            </div>
            <div className='popular-events d-flex align-items-center '>
                <div className='bg-warning me-2 p-3 date-wrapper d-flex'>
                    <h4>
                        <span className='ls-1 d-block font-xsss text-white fw-600'>FEB</span>
                        22
                    </h4>
                </div>
                <h4 className='event-info'>
                    <span className={event} style={{ fontWeight: 700 }}>Developer Programe</span>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#adb5bd' }} className='ls-1 d-block fw-600 event-address-main'>41 madison ave, floor 24 new work, NY 10010</span>
                </h4>
            </div>
            <div className='popular-events d-flex align-items-center'>
                <div className='bg-primary me-2 p-3 date-wrapper d-flex'>
                    <h4>
                        <span className='ls-1 d-block font-xsss text-white fw-600'>FEB</span>
                        22
                    </h4>
                </div>
                <h4 className='event-info'>
                    <span className={event} style={{ fontWeight: 700 }}>Internship</span>
                    <span style={{ fontWeight: 600, fontSize: '11px', color: '#adb5bd' }} className='ls-1 d-block fw-600 event-address-main'>41 madison ave, floor 24 new work, NY 10010</span>
                </h4>
            </div>
        </div>
    )

}