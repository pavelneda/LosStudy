import React from "react";
import './error-indicator.css'
import icon from './death-star.png'

const ErrorIndicator = ({error}) => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error icon" />
            <span className="boom">EROR!</span>
            {
                error && <span>{`${error}`}</span>
            }
            <span>
                something has gone terrible wrong
            </span>
        </div>
    );
};

export default ErrorIndicator;