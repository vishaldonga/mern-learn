import React from 'react';
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h1>404 Error Not Found</h1>
            <div className="button">
                <NavLink to="/">Back To Home</NavLink>
            </div>
        </div>
    )
}

export default ErrorPage
