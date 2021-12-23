import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../../app/stores/store";
import './Error.scss'
export default function NotFound() {

    const { userStore } = useDarkMode()
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested page not found!
                        </div>
                        <div className="error-actions">
                            {!userStore.isLoggedIn ? <Link to='/' className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                Take Me Login </Link> :
                                <Link to='/home' className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                    Take Me Home </Link>
                            }

                            <a href="#" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

