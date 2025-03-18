import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from "../../Layout";
import { loginUser } from '../../Redux/Actions/AuthAction';
import { toastify } from '../../Utils/Function';
import { userNameValidation, validEmail, validPassword } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { getLocalStorage, setLocalStorage } from '../../Utils/LocalStorage';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loginState = useSelector((state) => state)
    const [loginData, setLoginData] = useState({
        text: "",
        password: "",
    })
    const [loginResponse, setLoginResponse] = useState(null)
    const [error, setError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { Auth: { loginRequest } } = loginState;
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSumbit = (e) => {
        e.preventDefault()
        let checkbox = document.getElementById('agree-terms');
        if (checkbox.checked){
            if (((!!loginData.text?.length) && !!loginData.password?.length)) {
                // const location = window.navigator && window.navigator.geolocation;
                // if (location) {
                // location.getCurrentPosition((position) => {
                const long = "77.250473"
                const lat = "28.675377"
                if (validEmail(loginData.text)) {
                    const obj = {
                        email: loginData.text,
                        password: loginData.password,
                        latitude: lat,
                        longitude: long,
                    }
                    dispatch(loginUser(obj))
                } else if (userNameValidation(loginData.text)) {
                    const obj = {
                        username: loginData.text,
                        password: loginData.password,
                        latitude: lat,
                        longitude: long,
                    }
                    dispatch(loginUser(obj))
                } else {
                    setError(true)
                }
                // }, (error) => {
                //     alert("Please allow navigation");
                // })
                // }
                // } else {
                //     setError(true)
                // }
                setTimeout(() => setError(false), 5000)
            }
            else{
                setError(true);
            }
        }
        else{
            alert('Accept the privacy policy');
        }
    }

    useEffect(() => {
        setLoginResponse(loginRequest)
    }, [loginRequest])

    useEffect(() => {
        console.log('loginResponse>>>>', loginResponse);
        if (loginResponse?.status_code === 200) {
            toastify(toast.success, "Login Successfully", "dark")
            const { access_token, refresh_token, user_id, username } = loginResponse
            setLocalStorage("access_token", access_token)
            setLocalStorage("username", username)
            setLocalStorage("refresh_token", refresh_token)
            setLocalStorage("user_id", user_id)
            setTimeout(()=>{
                window.location.href = "/";
            }, 1000)
        } else {
            if (loginResponse?.response?.data?.status_code === 404 || loginResponse?.response?.data?.status_code === 401 || loginResponse?.response?.data?.status_code === 403 || loginResponse?.response?.data?.status_code === 400) {
                toastify(toast.error, loginResponse?.response?.data?.detail, "dark")
                setLoginData({ ...loginData, text: "", password: "" })
            }
        }
    }, [loginResponse, getLocalStorage("access_token")])


    return (
        <div className="login-container">
            <Layout >
                <section className="newsletter-section loginSection mt-4 mb-5 d-block">
                    <div className="anim-icons full-width">
                        <span className="icon icon-shape-3 wow fadeIn"></span>
                        <span className="icon icon-line-1 wow fadeIn"></span>
                    </div>
                    <div className="auto-container">
                        <div className="row">
                            <div className="col-lg-2 col-md-4 col-sm-4"></div>
                            <div className="form-column col-lg-8 col-md-12 col-sm-12">
                                <div className="inner-column">
                                    <div className="contact-form">
                                        <div className="sec-title text-center">
                                            <h2>Login</h2>
                                            <div className="text">Existing Member? Login</div>
                                        </div>
                                        <form
                                            method="post"
                                            action="login_submit.php"
                                            className="form"
                                            id="contact-form"
                                            onSubmit={(e) => handleSumbit(e)}>
                                            <div className="row clearfix">
                                                <div
                                                    className="col-lg-12 col-md-12 col-sm-12 form-group"
                                                    id="email error">
                                                    <input
                                                        type="text"
                                                        autofocus
                                                        placeholder="Enter User Name/Email"
                                                        tabindex="1"
                                                        value={loginData.text}
                                                        name="text"
                                                        onChange={(e) => handleLoginChange(e)} />
                                                    <p class="form-text " style={{ color: "red" }}>{(!loginData?.text?.length && error) ? "User Name or Email is Required" : (((!validEmail(loginData.text)) || ((!userNameValidation(loginData?.text)))) && error) ? "User Name/Email is not valid" : ""}</p>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter Password"
                                                        maxlength="35"
                                                        id="pass"
                                                        className='position-relative'
                                                        tabindex="2"
                                                        value={loginData.password}
                                                        name="password"
                                                        onChange={(e) => handleLoginChange(e)} />
                                                    {!!loginData.password?.length ? showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="input_eyes_icon" size={20} /> : <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="input_eyes_icon" size={20} /> : null}

                                                    <p class="form-text " style={{ color: "red" }}>{(!loginData.password.length && error) ? "Email and Password is Required" : (error && !validPassword(loginData.password)) ? "Input accepts a combination of one uppercase & lowercase letter, number, special characters & minimum characters length 6. Even It will not accept any white spaces." : ""}</p>
                                                </div>

                                                <div className="col-lg-9 col-md-9 col-sm-9 mb-2 AcknowledgeSection">
                                                    <label
                                                        className="labelcss mr-2"
                                                        style={{ verticalAlign: `middle` }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            style={{ verticalAlign: `middle` }}
                                                            id='agree-terms'
                                                        />
                                                    </label>
                                                    I Agree{" "}
                                                    <Link
                                                        to="/privacy-policy"
                                                        target="_blank"
                                                        tabindex="3"
                                                    >
                                                        <u>Terms of Service </u>
                                                    </Link>{" "}
                                                    <span className="privacyPolicy">
                                                        {" "}
                                                        And
                                                        <Link
                                                            to="/privacy-policy"
                                                            target="_blank"
                                                        >
                                                            <u> Privacy Policy*</u>
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 mt-2 keepin_Sign">
                                                    <li className="switch-agileits float-left"></li>
                                                    <label
                                                        className="labelcss"
                                                        style={{ verticalAlign: `middle` }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            style={{ verticalAlign: `middle` }}
                                                            name="remember_me"
                                                            value="1"
                                                            tabindex="4"
                                                        />
                                                        <span className="slider-switch round mx-1"></span>
                                                        Keep me signed in
                                                    </label>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-6 text-right mt-2 troubleSection">
                                                    <Link to="/forgot-password"
                                                        href="#"
                                                        className="ml-4"
                                                        tabindex="5"
                                                    >
                                                        Forgot Password?
                                                    </Link>
                                                </div>

                                                <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
                                                    <div className="btn-box">
                                                        <button
                                                            className="btn btn-primary"
                                                            tabindex="6"
                                                            type="submit"
                                                            name="submit"
                                                            style={{ width: `100%` }}
                                                        >
                                                            <span className="">Log In</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-lg-9 col-md-9 col-sm-9 mt-3 registerSection">
                                                    <span className="">
                                                        {" "}
                                                        New User Register ?
                                                        <Link
                                                            to="/signup"
                                                            tabindex="7"
                                                        >
                                                            {" "}
                                                            SignUp
                                                        </Link>
                                                    </span>
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
        </div>
    )
}

export default Login