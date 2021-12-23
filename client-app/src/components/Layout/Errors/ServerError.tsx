import { observer } from "mobx-react-lite";
import React from "react";
import { FaCogs } from "react-icons/fa";
import { Container, Header, Segment } from "semantic-ui-react";
import { useDarkMode } from "../../../app/stores/store";

export default observer(function ServerErros() {
    const { commonStore } = useDarkMode()
    return (
        <div className="page-404">
            <div className="outer">
                <div className="middle">
                    <div className="inner">
                        <div className="inner-circle"><FaCogs/><span className="errorStatus">500</span></div>
                        <span className="inner-status">Opps! Internal Server Error!</span>
                        <span className="inner-detail">Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.</span>
                    </div>
                </div>
            </div>
        </div>
    )
})