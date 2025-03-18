import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../../Layout'
import { forgetPassword } from '../../Redux/Actions/AuthAction'
import { toastify } from '../../Utils/Function'
import { validEmail } from '../../Utils/Validation';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [error, setError] = useState(false)
    const emailState = useSelector(state => state)
    const { Auth: { forgetPasswordRes } } = emailState
    const handleForgetPassword = (e) => {
        e.preventDefault()
        if (validEmail(email)) {
            dispatch(forgetPassword({ "email": email, "phone_number": phone }))
        } else {
            setError(true)
        }
    }
    useEffect(() => {
        if (forgetPasswordRes?.status === 200) {
            navigate("/reset-password", { state: { email: email } })
            toastify(toast.success, forgetPasswordRes?.message, "dark")
        }
        if (forgetPasswordRes?.response?.data?.status === 404) {
            toastify(toast.error, "Invalid Information! Please check again", "dark")
        }
    }, [forgetPasswordRes])

    return (
        <Layout>
            <section className="newsletter-section" style={{ padding: "150px 0" }}>
                <div className="anim-icons full-width">
                    <span className="icon icon-shape-3 wow fadeIn"></span>
                    <span className="icon icon-line-1 wow fadeIn"></span>
                </div>
                <div className="auto-container" >
                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                        </div>
                        <div className="form-column col-lg-8 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="contact-form">
                                    <div className="sec-title text-center">
                                        <h2>Forgot Password</h2>
                                        <div className="text">Please enter your email address to search for your account..</div>
                                    </div>

                                    <form method="post" action="login_submit.php" className="form" id="contact-form" onSubmit={handleForgetPassword}>
                                        <div className="row clearfix">

                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group" id="emailerror">
                                                <input type="text" autofocus name="txtusername" placeholder="Email ID" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <p className="form-text " style={{ color: "red" }}>{(!email.length && error) ? "Email is Required" : (!validEmail(email) && error) ? "Input Field accepts only valid email format string with @ symbol" : ""}</p>
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group" id="emailerror">
                                                <input type="number" autofocus name="txtusername" placeholder="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                <p className="form-text " style={{ color: "red" }}>{(!email.length && error) ? "Email is Required" : ""}</p>
                                            </div>

                                            <div className="col-lg-12 col-md-12 col-sm-12 mt-3 ">
                                                <div className="btn-box">
                                                    <a href="confirm-password" ><button className="btn btn-primary " tabindex="6" type="submit" name="submit" style={{ width: "100%" }}><span className="btn-title">submit</span></button></a>

                                                </div>
                                            </div>
                                            <div className="col-lg-9 col-md-9 col-sm-9 mt-3">
                                                <span className=""> New User Register ?<Link to="/signup" tabindex="7"> SignUp</Link></span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ForgotPassword