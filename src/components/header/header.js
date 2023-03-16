import React from "react";
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-top">

                    <a href="#" className="header-logo">
                        <img src="images/logo.png" alt="" />
                        <span className="header-logo-text">LosStudy</span>
                    </a>


                    <div className="header-tel">
                        <a className="header-tel-icon" href="tel:+380982284569"><i className="fa-solid fa-phone"></i></a>
                        <span className="header-tel-text">+38 098 228 45 69</span>
                    </div>


                    <a href="#" className="header-lang">
                        <img src="images/language.png" alt="" />
                        <div className="header-lang-text">
                            ukraine
                        </div>
                    </a>

                    <div className="burger-menu"><i className="fa-solid fa-bars"></i></div>
                    <div className="cross"><i className="fa-solid fa-xmark"></i></div>

                </div>

                <nav className="nav">
                    <a href="#" className="nav-link">Головна</a>
                    <a href="doctors.html" className="nav-link">Наші лікарі</a>
                    <a href="contacts.html" className="nav-link">Контакти</a>
                </nav>

            </div> 
        </header>
    );
};

export default Header;