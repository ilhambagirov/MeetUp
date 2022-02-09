import { observer } from "mobx-react-lite";
import React from "react";

export default observer(function Statistics() {
    return (

        <div className="stats">
            <div className='person-card col-xl-2 text-center col-xxl-3 col-lg-2'>
                <div className='following'>
                    <span className='person-card-image'>
                        Total Posts
                    </span>
                    <h4 style={{ fontWeight: 700 }} className='following-name'>
                       405
                    </h4>
                </div>
            </div>
        </div>
    )
})