import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LookingForModal from '../../components/SignupModal/LookingForModal';
import SignUpModal from '../../components/SignupModal/SignUpModal';
import Layout from '../../Layout'
import { getCommunities, getFamilyNames, getReligion, registerUser } from '../../Redux/Actions/AuthAction';
import { firstNameAndLastNameValidation, userNameValidation, validEmail, validPassword } from '../../Utils/Validation';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toastify } from '../../Utils/Function';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { setLocalStorage } from '../../Utils/LocalStorage';

const SignUp = () => {
    const navigate = useNavigate()
    const religionState = useSelector(state => state)
    const { Auth: { religionData, communitiesData, familyNameData } } = religionState
    const dispatch = useDispatch()
    const [register, setRegister] = useState({
        profile_for: "",
        dob: "",
        dobYear: "",
        dobMonth: "",
        religion: "",
        community: "",
        family_name: "",
        living_in: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        mobile_number: "",
        gender: "",
        first_name: "",
        last_name: "",
    })
    const [dateOfBirth, setDateOfBirth] = useState({
        dob: "",
        dobYear: "",
        dobMonth: "",
    })
    const [modalShow, setModalShow] = useState(false);
    const [lookingForModal, setLookingForModal] = useState(false)
    const [error, setError] = useState(false)
    const [years, setYears] = useState([])
    const [selectedId, setSelectedId] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const reducerData = useSelector(state => state)
    const { Auth: { registrationRequest } } = reducerData;
    const handleRegister = (e) => {
        const { name, value } = e.target;
        if (name === "religion") {
            const item = religionData?.filter(item => item.name === value)[0]
            dispatch(getCommunities(item.id))
        }
        if (name === "community") {
            const item = communitiesData?.filter(item => item.name === value)[0]
            dispatch(getFamilyNames(item.id))
        }
        if (name === "family_name") {
            const item = familyNameData?.filter(item => item.name === value)[0]
            dispatch(getReligion(item.id))
        }
        setRegister((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        let checkbox = document.getElementById('agree-terms');
        if (checkbox.checked){
            if (!!register.email?.length && !!register.password?.length && register.community && register.confirm_password && register.living_in && register.mobile_number && register.password && register.religion && register.username && register.first_name && register.last_name && register.family_name) {
                if (!validEmail(register.email) && !validPassword(register.password) && register.mobile_number?.length !== 10 && !userNameValidation(register.username)) {
                    setError(true)
                } else {
                    if (!validEmail(register.email)) {
                        setError(true)
                    } else if (!validPassword(register.password)) {
                        setError(true)
                    } else if (register.mobile_number?.length !== 10) {
                        setError(true)
                    } else if (!userNameValidation(register.username)) {
                        setError(true)
                    } else {
                        dispatch(registerUser(register))
                    }
                }
            } else {
                setError(true)
            }
        }
        else{
            alert('Accept the privacy policy');
        }
        setTimeout(() => setError(false), 5000)
    }
    const handleLookingFor = (item) => {
        if (item.looking !== "My Self") {
            setModalShow(true)
            setLookingForModal(false)
            setRegister({ ...register, gender: item.gender, profile_for: item.looking })
        } else {
            setRegister({ ...register, profile_for: item.looking })
        }
        setSelectedId(item.id)
    }
    const handleGender = (gender) => {
        setRegister({ ...register, gender: gender })
        setModalShow(true)
        setLookingForModal(false)
    }
    const handleShowPassword = (data) => {
        if (data === "password") {
            setShowPassword(!showPassword)
        } else {
            setShowConfirmPassword(!showConfirmPassword)

        }
    }
    useEffect(() => {
        if (register.dob && register.dobMonth && register.dobYear) {
            let obj = { ...register }
            let newObj = { ...register, date_of_birth: obj.dobYear + "-" + obj.dobMonth + "-" + obj.dob }
            delete newObj.dobMonth
            setDateOfBirth({ ...dateOfBirth, dob: register.dob, dobMonth: register.dobMonth, dobYear: register.dobYear })
            delete newObj.dob
            delete newObj.dobMonth
            delete newObj.dobYear
            setRegister(newObj)

        }
    }, [register.dob, register.dobMonth, register.dobYear])
    useEffect(() => {
        if (register.community && register.religion && register.living_in) {
            setModalShow(false)
            toastify(toast, "Add Some Information Regarding your Profile", "dark")
        }
    }, [register.community, register.religion, register.living_in])
    useEffect(() => {
        setLookingForModal(true)
        dispatch(getReligion())
    }, [])

    /*make a year array based on gender legal age*/
    useEffect(() => {
        let legalAge = register.gender === "Male" ? 21 : 18
        let max = new Date().getFullYear() - legalAge
        let years = []
        for (let i = max; i >= 1950; i--) {
            years.push(i)
        }
        setYears(years)
    }, [register.gender])
    useEffect(() => {
        let res = registrationRequest;
        console.log('res>>>>', res)
        if (register.email != "") {
            if (res?.response?.status === 400) {
                toastify(toast.error, res?.response?.data?.error, "dark")
            }
            else if (registrationRequest?.status_code === 201) {
                const { access_token, refresh_token, user_id } = res
                setLocalStorage("access_token", access_token)
                setLocalStorage("refresh_token", refresh_token)
                setLocalStorage("user_id", user_id)
                toastify(toast.success, registrationRequest?.message, "dark")
                setRegister({
                    profile_for: "",
                    dob: "",
                    dobYear: "",
                    dobMonth: "",
                    religion: "",
                    community: "",
                    living_in: "",
                    username: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    mobile_number: "",
                    gender: ""
                })
                setDateOfBirth({
                    dob: "",
                    dobYear: "",
                    dobMonth: "",
                })
                setTimeout(() => {
                    window.location.href = "/profile-info"
                }, 1000);
            }
        }

    }, [registrationRequest])


    return (
        <div>
            <Layout >
                <div className='pt-5'>
                    <section className="page-title" style={{ backgroundColor: "#800925" }}>
                        <div className="auto-container">
                            <h1 className="d-none d-lg-block d-xl-block d-md-block">Signup</h1>
                            <ul className="bread-crumb clearfix">
                                <li><a href="index">Home</a></li>
                                <li>Signup</li>
                            </ul>
                        </div>
                    </section>
                    <section className="newsletter-section ">
                        <div className="anim-icons full-width">
                            <span className="icon icon-shape-3 wow fadeIn"></span>
                            <span className="icon icon-line-1 wow fadeIn"></span>
                        </div>
                        <div className="auto-container">
                            <div className="upper-box">
                                <div className="sec-title text-center">
                                    <div className="text"><h2 className="title">Matches Within Your community,</h2>Verified Profile | Safe and Secured | Entire Profile Description.</div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-lg-12 alert alert-info " id="doberror" style={{ display: 'none' }}>Select valid Birth Date</div>
                                <div className="col-lg-12 alert alert-info" id="doberror1" style={{ display: 'none' }}></div>
                                <div className="col-lg-12 alert alert-info " id="doberror2" style={{ display: 'none' }}></div>
                                <div className="col-lg-2 col-md-4 col-sm-4">
                                </div>
                                <div className="form-column col-lg-8 col-md-12 col-sm-12">
                                    <div className="inner-column">
                                        <div className="contact-form ">

                                            <form method="post" action="#" id="contact-form" name="matri" onSubmit={(e) => handleSubmit(e)}>
                                                <div className="row clearfix">
                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" maxlength="40" name="first_name" placeholder="First Name" tabindex="1" onChange={(e) => handleRegister(e)} />
                                                        <p className="form-text " style={{ color: "red" }}>{(!register.first_name?.length && error) ? "First Name is Required" : (!firstNameAndLastNameValidation(register.first_name) && error) ? "The First Name must be the only letter that may be in uppercase or lowercase and minimum characters length 4." : ""}</p>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                                                        <input type="text" maxlength="10" name="last_name" placeholder="Last Name" tabindex="2" onChange={(e) => handleRegister(e)} />
                                                        <p className="form-text " style={{ color: "red" }}>{(!register.last_name?.length && error) ? "First Name is Required" : (!firstNameAndLastNameValidation(register.last_name) && error) ? "The Last Name must be the only letter that may be in uppercase or lowercase and minimum characters length 4." : ""}</p>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                                                        <input type="text" name="username" placeholder="User Name" maxlength="20" value={register.username} onChange={(e) => handleRegister(e)} />
                                                        <p className="form-text " style={{ color: "red" }}>{(!register.username.length && error) ? "User Name is Required" : (!userNameValidation(register.username) && error) ? "Please use only letter (a-z), numbers and periods and user-name must be a minimum 5 letters." : ""}</p>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group mt-3" id="emailerror">
                                                        <input type="email" autofocus name="email" placeholder="Email ID." value={register.email} onChange={(e) => handleRegister(e)} />
                                                        <p className="form-text " style={{ color: "red" }}>{(!register.email.length && error) ? "Email is Required" : (!validEmail(register.email) && error) ? "Input Field accepts only valid email format string with @ symbol" : ""}</p>
                                                        <div className="mt-2 "></div>

                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 form-group mt-3" id="">
                                                        <input type="number" autofocus name="mobile_number" placeholder="Mobile No." value={register.mobile_number} onChange={(e) => handleRegister(e)} />
                                                        <p className="form-text " style={{ color: "red" }}>{(!register.mobile_number.length && error) ? "Mobile Number is required" : (error && register.mobile_number.length != 10 || register.mobile_number.length > 10) ? "Mobile Number is not valid" : ""}</p>
                                                        <div className="mt-2 "></div>

                                                    </div>

                                                    {/* <div className="col-lg-4 col-md-4 col-sm-12 form-group ">
                                                        <select className="custom-select-box" name="dobMonth" tabindex="7" id="month" onChange={(e) => handleRegister(e, 'dob')}>
                                                            <option value="" disabled selected hidden>Birth Month</option>
                                                            <option value="1">January</option>
                                                            <option value="2">February</option>
                                                            <option value="3">March</option>
                                                            <option value="4">April</option>
                                                            <option value="5">May</option>
                                                            <option value="6">Jun</option>
                                                            <option value="7">July</option>
                                                            <option value="8">August</option>
                                                            <option value="9">September</option>
                                                            <option value="10">October</option>
                                                            <option value="11">November</option>
                                                            <option value="12">December</option>
                                                        </select>
                                                        <p className="form-text " style={{ color: "red" }}>{(!dateOfBirth?.dobMonth && error) ? "Please select the Birth Month" : ""}</p>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4 col-sm-12 form-group " onChange={(e) => handleRegister(e, "dob")}>
                                                        <select name="dob" className="custom-select-box" tabindex="8" id="day" >
                                                            <option value="" disabled selected hidden>Birth Day</option>
                                                            {[...Array(31)].map((_, i) => {
                                                                i = i + 1
                                                                return <option value="1">{i}</option>
                                                            })}
                                                        </select>
                                                        <p className="form-text " style={{ color: "red" }}>{(!dateOfBirth?.dob && error) ? "Please select the Birth Day" : ""}</p>
                                                    </div>

                                                    <div className="col-lg-4 col-md-4 col-sm-12 form-group ">
                                                        <select name="dobYear" className="custom-select-box" tabindex="9" id="year" onChange={(e) => handleRegister(e,)}>
                                                            <option value="" disabled selected hidden>Birth Year</option>
                                                            {years.map((o) => {
                                                                return <option value={o} >{o}</option>
                                                            })}
                                                        </select>
                                                        <p className="form-text " style={{ color: "red" }}>{(!dateOfBirth.dobYear && error) ? "Please select the Birth Year" : ""}</p>

                                                    </div> */}
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

                                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="btn-box">
                                                            <div className="text"><input id='agree-terms' type="checkbox" tabindex="10" style={{ verticalAlign: "text-bottom" }} />  I have read and agree to the <Link to="/privacy-policy" target={"_blank"}><u>terms, conditions</u></Link> and <Link to="/privacy-policy" target={"_blank"}><u>  privacy policy.</u> </Link></div>
                                                        </div>
                                                        <a><button className="btn btn-primary mt-4 mb-4" type="submit" name="submit" style={{ width: "100%" }}> <span tabindex="11" className="btn-title">Register  </span></button></a>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                    <SignUpModal setModalShow={setModalShow} modalShow={modalShow} handleRegister={handleRegister} religionData={religionData} communitiesData={communitiesData} familyNameData={familyNameData} />
                    <LookingForModal setModalShow={setLookingForModal} modalShow={lookingForModal} handleLookingFor={(item) => handleLookingFor(item)} selectedId={selectedId} handleGender={handleGender} />
                </div>
            </Layout >
        </div >
    )
}

export default SignUp;