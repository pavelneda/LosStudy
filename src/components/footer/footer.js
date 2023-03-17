import React from "react";
import { Link } from "react-router-dom";

import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">

                <div className="footer-iner">
                    <div className="footer-item">
                        <div className="footer-name">Online studies LosStudy</div>
                        <div className="footer-text">Kyiv, Khreshchatyk street 39</div>
                    </div>

                    <div className="footer-item">
                        <Link className="footer-link" to="/">Main Page</Link>
                    </div>

                    <div className="footer-item">

                        <a className="footer-icons" href="#" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                        <a className="footer-icons" href="#" target="_blank"><i className="fa-brands fa-telegram"></i></a>
                        <a className="footer-icons" href="#" target="_blank"><i className="fa-brands fa-youtube"></i></a>
                        <a className="footer-icons" href="#" target="_blank"><i className="fa-brands fa-facebook"></i></a>
                        <a className="footer-icons" href="#" target="_blank"><i className="fa-brands fa-instagram"></i></a>
                    </div>

                    <div className="footer-item">
                        <div className="footer-name">© 2012-2023 LosStudy.com </div>
                        <div className="footer-text footer-text-right">All rights reserved</div>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;