import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import image from "../../assets/images/background/5.jpg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AddFeedback, getContact } from '../../Redux/Actions/ProfileActions'
import { toastify } from '../../Utils/Function'
import { toast } from 'react-toastify'
import { validEmail, userNameValidation } from '../../Utils/Validation';
import './contact.css'

const Contactus = () => {
    const dispatch = useDispatch();
    const profileState = useSelector((state) => state.Profile)
    const { contactRes, feedbackRes } = profileState;
    const [contact, setContact] = useState({})

    const initialState = {
        name: "",
        phoneNumber: "",
        email: "",
        subject: "",
        message: "",
    };

    const [feedback, setFeedBack] = useState(initialState)

    useEffect(() => {
        dispatch(getContact())
    }, []);

    useEffect(() => {
        setContact(contactRes)
    }, [contactRes])

    useEffect(() => {
        if (feedbackRes?.id && feedback.name) {
            toastify(toast.success, "Thanks for the FeedBack!", "dark");
            setFeedBack(initialState);
        }
    }, [feedbackRes])

    const handleFeedBack = (e) => {
        const { name, value } = e.target;
        setFeedBack((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (feedback.phoneNumber.length == 10 &&
            userNameValidation(feedback.name) &&
            validEmail(feedback.email)) {
            dispatch(AddFeedback(feedback));
        }
        else {
            toastify(toast.error, "Please add valid information", "dark");
        }
    }

    return (
        <Layout >
            <div >
                <section className="page-title" style={{ backgroundImage: `url(${image})` }} >
                    <div className="auto-container">
                        <h1 className="d-none d-lg-block d-xl-block d-md-block">Contact Us</h1>
                        <ul className="bread-crumb clearfix">
                            <li><Link to="/">Home</Link></li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </section>
                <section className="newsletter-section contact-page-section">
                    <div className="auto-container">
                        <div className="row clearfix mt-3">

                            <div className="contact-column col-lg-3 col-md-12 col-sm-12 order-2 coninfo" >
                                <div className="inner-column contact-width">
                                    <div className="sec-title">
                                        <h2>Contact Us</h2>
                                    </div>
                                    <ul className="contact-info">
                                        <li>
                                            <span className="icon fa fa-phone-volume"></span>
                                            <p><strong>Call Us</strong>
                                                {contact?.Our_Phone_Number}<br /> </p>

                                        </li>

                                        <li>
                                            <span className="icon fa fa-envelope"></span>
                                            <p><strong>Mail Us</strong></p>
                                            <p>{contact?.our_email}</p>
                                        </li>

                                        <li>
                                            <span className="icon fa fa-clock"></span>
                                            <p><strong>Our Other Services</strong></p>
                                            <p>{contact?.timeing}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="form-column col-lg-9 col-md-12 col-sm-12">

                                <div className="envelope-image"></div>

                                <div className="form-inner">
                                    <div className="contact-form ">
                                        <div className="contact-form">
                                            <div className="sec-title">
                                                <h2>Feedback</h2>
                                                <p className='text-center'>Username , Email , Phone number should be excatly same as you entered during registration.</p>
                                            </div>
                                            <form id="contact-form">
                                                <div className="row clearfix">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" maxLength="40" name="name" placeholder="Username" value={feedback?.name} onChange={(e) => handleFeedBack(e)} tabIndex="1" required />
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="number" maxLength="10" name="phoneNumber" placeholder="Phone" value={feedback?.phoneNumber} onChange={(e) => handleFeedBack(e)} tabIndex="2" required />
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="email" name="email" maxLength="35" placeholder="Email" value={feedback?.email} onChange={(e) => handleFeedBack(e)} tabIndex="3" required="" />
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" name="subject" maxLength="70" placeholder="Subject" value={feedback?.subject} onChange={(e) => handleFeedBack(e)} tabIndex="4" required />
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <textarea name="message" maxLength="250" placeholder="Message" value={feedback?.message} onChange={(e) => handleFeedBack(e)} tabIndex="5"></textarea>
                                                    </div>
                                                    <div className='sub-div'>
                                                        <button className='sub-btn ' onClick={handleSubmit}>Submit</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
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

export default Contactus