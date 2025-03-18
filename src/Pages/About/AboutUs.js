import React from 'react'
import Layout from '../../Layout'
import "./About.css"

import image from "../../assets/images/background/5.jpg"
const AboutUs = () => {
    return (
        <Layout>
            <div >
                <section class="page-title" style={{ backgroundImage: `url(${image})` }} >
                    <div class="auto-container">
                        <h1 class="d-none d-lg-block d-xl-block d-md-block">About Us</h1>
                        <ul class="bread-crumb clearfix">
                            <li><a href="index">Home</a></li>
                            <li>About Us</li>
                        </ul>
                    </div>
                </section>
                <section className="about-section">
                    <div className="auto-container">
                        <div className="row">
                            <div>
                                <span className="icon icon-circle-blue wow fadeIn"></span>

                                <span className="icon icon-circle-1 wow zoomIn"></span>
                            </div>
                            <div className="content-column col-lg-12 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="sec-title">
                                        {/* <span className="title">ABOUT US</span> */}
                                        <h2>Welcome to Coorgimangala </h2>
                                        <div className="text"><p>The Kodava Social and Coorgi Matrimony team is a group of dedicated individuals who are passionate about helping Kodavas find their soulmate online." Our goal is to make the process of choosing a life partner as simple and stress-free as possible. We recognize that choosing the right person to spend the rest of your life with is a major decision, and we're here to support you every step of the journey.
                                            Our staff is comprised of seasoned experts that are dedicated to providing our clients with the best service possible. We think that everyone deserves to find their ideal mate, and we work hard to make that happen. In search of a companion who aligns with your beliefs, passions, or way of life, </p>
                                            <p>We are here to assist you in your search for the one. We are committed at Kodava Social and Coorgi Matrimony to providing a safe and secure platform for our clients to connect with one another. We take our clients' security and confidentiality very seriously, and we have put in place a number of precautions to ensure that your personal information is always secure. We understand that the process of choosing a life partner can be overwhelming, which is why we have built our online platform to be as user-friendly as possible. Our team is always prepared to answer your questions, and we are committed to giving you with the assistance you need to find your right partner. Thank you for your interest in Kodava Social. </p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default AboutUs