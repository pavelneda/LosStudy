import React from "react";
import InputMask from 'react-input-mask';
import './about.css';

const About = () => {

    return (
        <React.Fragment>
            <section className="statistic">
                <div className="container">

                    <div className="section-header">
                        <h2 className="section-title">These figures are a real indicator of our work</h2>
                    </div>


                    <div className="stat">
                        <div className="stat-item">
                            <h3 className="stat-title">100 000+</h3>
                            <p className="stat-text">Hours of viewing</p>
                        </div>

                        <div className="stat-item">
                            <h3 className="stat-title">100+</h3>
                            <p className="stat-text">Highly qualified teachers</p>
                        </div>

                        <div className="stat-item">
                            <h3 className="stat-title">50 000+</h3>
                            <p className="stat-text">Graduates</p>
                        </div>

                        <div className="stat-item">
                            <h3 className="stat-title">1 000+</h3>
                            <p className="stat-text">Students per month</p>
                        </div>

                    </div>
                </div>
            </section>


            <section className="call">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">To help with the course, enter the number or call us!</h2>
                    </div>

                    <div className="call-iner">
                        <form action="/" method="post" className="call-form">
                            <InputMask className="call-input" type="tel" name="number" id="number" placeholder="38 (___) ___ __ __" mask="3\8 (999) 999 99 99" maskChar="_" />
                            <button className="call-button" type="submit">Call me</button>
                        </form>

                        <div className="call-numbers">
                            <div className="number">
                                <a href="tel:+380982284569"><i className="fa-solid fa-phone"></i></a>
                                +380 (098) 228 45 69
                            </div>
                            <div className="number">
                                <a href="tel:+380983450277"><i className="fa-solid fa-phone"></i></a>
                                +380 (098) 345 02 77
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </React.Fragment>
    );
};

export default About;