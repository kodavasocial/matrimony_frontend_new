import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../Layout'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { validPassword } from '../../Utils/Validation'
import { useDispatch } from 'react-redux'
import { resetPassword } from '../../Redux/Actions/AuthAction'
import { toastify } from '../../Utils/Function'
import { toast } from 'react-toastify'

const ConfirmPassword = () => {
    const { state } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, setRegister] = useState({
        password: "",
        confirm_password: "",
        email: state.email
    })

    const [error, setError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleShowPassword = (data) => {
        if (data === "password") {
            setShowPassword(!showPassword)
        } else {
            setShowConfirmPassword(!showConfirmPassword)
        }
    }
    const handleRegister = (e) => {
        const { name, value } = e.target;
        setRegister((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!!register.password?.length && register.confirm_password) {
            if (!validPassword(register.password)) {
                setError(true)
            } else {
                if (!validPassword(register.password)) {
                    setError(true)
                } else {
                    console.log("register", register);
                    const req = {
                        username_or_email: register.email,
                        new_password: register.password
                    }
                    dispatch(resetPassword(req))
                        .then((res) => {
                            toastify(toast.success, "Your password is successfully changed", "dark")
                            console.log(res, "resssssssss")
                            navigate('/login');
                        })

                }
            }
        } else {
            setError(true)
        }
        setTimeout(() => setError(false), 5000)
    }

    return (
        <Layout>
            <section className="newsletter-section" style={{ padding: "150px 0" }}>
                <div className="anim-icons full-width">
                    <span className="icon icon-shape-3 wow fadeIn"></span>
                    <span className="icon icon-line-1 wow fadeIn"></span>
                </div>
                <div className="auto-container">
                    <div className="row">
                        <div className="col-lg-2 col-md-4 col-sm-4">
                        </div>
                        <div className="form-column col-lg-8 col-md-12 col-sm-12">
                            <div className="inner-column">
                                <div className="contact-form">
                                    <div className="sec-title text-center">
                                        <h2>Reset Password</h2>
                                    </div>
                                    <form method="post" action="#" id="contact-form" name="matri" onSubmit={(e) => handleSubmit(e)}>
                                        <div className="row clearfix">

                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                <input type={showPassword ? "text" : "password"} name="password" placeholder="Password"
                                                    className='position-relative' maxlength="35" value={register.password}
                                                    onChange={(e) => handleRegister(e)} />
                                                {!!register.password?.length ? showPassword ?
                                                    <AiOutlineEyeInvisible onClick={() => handleShowPassword("password")}
                                                        className="input_eyes_icon" size={20} />
                                                    : <AiOutlineEye onClick={() => handleShowPassword("password")} className="input_eyes_icon" size={20} /> : null}
                                                <p className="form-text " style={{ color: "red" }}>{(!register.password.length && error)
                                                    ? " Password is Required" : (error && !validPassword(register.password)) ?
                                                        "Input accepts a combination of one uppercase & lowercase letter, number, special characters & minimum characters length 8. Even It will not accept any white spaces." : ""}</p>
                                                <div className="mt-2 " style={{ display: "none" }}>Password is too weak</div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                <input type={showConfirmPassword ? "text" : "password"} name="confirm_password" placeholder=" Confirm password" maxlength="35" value={register.confirm_password} onChange={(e) => handleRegister(e)} />
                                                {!!register.confirm_password?.length ? showPassword ? <AiOutlineEyeInvisible onClick={handleShowPassword} className="input_eyes_icon" size={20} /> : <AiOutlineEye onClick={handleShowPassword} className="input_eyes_icon" size={20} /> : null}
                                                <p className="form-text " style={{ color: "red" }}>{(!register.confirm_password.length && error) ? " Confirm Password is Required" : (error && register.password != register.confirm_password) ? "Input Field must be matched with the values of password input Field" : ""}</p>



                                                <div className="mt-2 " style={{ display: "none" }}>Password is too weak</div>
                                            </div>
                                            <div className="col-lg-12 col-md-12 col-sm-12 mt-3 ">
                                                <div className="btn-box">
                                                    <a href="login" ><button className="btn btn-primary " tabindex="6" type="submit" name="submit" style={{ width: "100%" }}><span className="btn-title">Submit</span></button></a>
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

export default ConfirmPassword