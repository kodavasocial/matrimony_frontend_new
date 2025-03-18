import React, { useEffect, useState, memo, useCallback } from 'react'
import "./LikeDislikeCard.css"
import { advanceSearchh, getAllProfileUser, getCustomSearchProfile, getSearchProfileUser, sendFriendRequest } from '../../Redux/Actions/ProfileActions'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../Layout'
import { baseUrl } from '../../Utils/ApiUrl'
import { getLocalStorage } from '../../Utils/LocalStorage'
import { useLocation, useNavigate } from 'react-router-dom'

const LikeDislikeCard = () => {
    const [wait, setWait] = useState(true);
    const { state } = useLocation();
    const navigate = useNavigate()
    if (state == null) {
        navigate('/');
    }
    const dispatch = useDispatch()
    const profile = useSelector((state) => state.Profile)
    const { allProfile, allSearchData, advanceSearchRes } = profile;
    const [advanceSearch, setAdvanceSearch] = useState({
        startheight: "",
        endheight: "",
        education: "",
        minweight: "",
        maxweight: "",
        minincome: "",
        maxincome: "",
        skin_tone: "",
        marital_status: "",
    })
    const [frame, setFrame] = useState(null)
    const [current, setCurrent] = useState(null)
    const [likeText, setLikeText] = useState(null)
    const [imgCount, setImageCount] = useState(0)
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [allProfilesData, setAllProfilesData] = useState([])
    const [acceptedUsers, setAcceptedUsers] = useState([]);
    const [rejectedUsers, setRejectedUsers] = useState([]);
    const [weight, setWeight] = useState([])
    const [income, setIncome] = useState([])

    useEffect(() => {
        if (state?.searchById) {
            dispatch(getCustomSearchProfile(state.searchById))
        } else if (state?.searchByFilter) {
            dispatch(getSearchProfileUser(state?.searchByFilter))
        }
        document.getElementsByClassName('flaticon-search')[0]?.click();
    }, [])

    useEffect(() => {
        setAllProfilesData([]);
        setWait(false)
        if (!!advanceSearchRes?.length) {
            setAllProfilesData(advanceSearchRes)
        }
        else if (!!allSearchData?.length) {
            setAllProfilesData(allSearchData)
        }
        else if (!!allProfile?.length) {
            let userId = getLocalStorage('user_id');
            let data = allProfile.filter(x => x.user_id != userId);
            setAllProfilesData(data)
        }
    }, [allProfile, allSearchData, advanceSearchRes])

    let startX = 0, startY = 0, moveX = 0, moveY = 0
    const hanedleLikeDislike = (action) => {
        const currentUserProfileData = allProfilesData[currentCardIndex];
        const userId = currentUserProfileData.user_id;
        if (action == "like") {
            moveX = 1
            moveY = 0
            complete()
            // dispatch(sendFriendRequest(userId))
            setAcceptedUsers([...acceptedUsers, userId]);
        } else {
            moveX = -1
            moveY = 0
            complete()
            // dispatch(sendFriendRequest(userId, true))
            setRejectedUsers([...rejectedUsers, userId]);
        }

    }
    useEffect(() => {
        let classId = document.body.querySelector('.frame')
        if (classId) setFrame(classId)
    }, [frame])
    useEffect(() => {
        document.getElementById("fram").innerHTML = '';
        setCurrent(null);
        if (allProfilesData?.length > 0) {
            allProfilesData.forEach((_data, index) => appendCard(_data, index))
            let getChild = frame?.querySelector('.card:last-child')
            if (getChild) {
                setCurrent(getChild)
                setLikeText(getChild.children[0])
            }
            setWait(false);
        }
    }, [frame, allProfilesData])
    useEffect(() => {
        initCard(current)
    }, [current])
    const appendCard = useCallback((data, index) => {
        const firstCard = frame?.children[0]
        const newCard = document.createElement('div')
        newCard.setAttribute('key', index)
        newCard.className = 'card'
        newCard.style.backgroundImage = `url(${data?.profile_picture ? baseUrl + data?.profile_picture : "/assets/images/background/bg.jpg"})`
        newCard.innerHTML = `
            <div class="is-like">LIKE</div>
            <div class="bottom">
                <div class="title">
                <span>${data.first_name + ' ' + data.last_name}</span>
                <span>${data.age ? data.age : ''}</span>
                </div>
                <div class="info">
                User ID: ${data.custom_id}
                </div>
            </div>
            `
        if (firstCard) frame?.insertBefore(newCard, firstCard)
        else frame?.appendChild(newCard)
        setImageCount(prev => prev + 1)
    }, [frame])

    function initCard(card) {
        card?.addEventListener('pointerdown', onPointerDown)
    }
    const setTransform = useCallback((x, y, deg, duration) => {
        current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`
        likeText.style.opacity = Math.abs((x / window.innerWidth * 2.1))
        likeText.className = `is-like ${x > 0 ? 'like' : 'nope'}`
        if (duration) current.style.transition = `transform 3s`
    }, [current, likeText])

    const onPointerDown = useCallback(({ clientX, clientY }) => {
        startX = clientX
        startY = clientY
        current.addEventListener('pointermove', onPointerMove)
        current.addEventListener('pointerup', onPointerUp)
        current.addEventListener('pointerleave', onPointerUp)
    }, [current])
    const onPointerMove = useCallback(({ clientX, clientY }) => {
        moveX = clientX - startX
        moveY = clientY - startY
        setTransform(moveX, moveY, moveX / window.innerWidth * 50)
    }, [current])

    const onPointerUp = useCallback(() => {
        current.removeEventListener('pointermove', onPointerMove)
        current.removeEventListener('pointerup', onPointerUp)
        current.removeEventListener('pointerleave', onPointerUp)
        if (Math.abs(moveX) > frame.clientWidth / 2) {
            current.removeEventListener('pointerdown', onPointerDown)
            console.log("how many")
            complete()
        } else cancel()
    }, [current, frame, onPointerDown])


    const complete = useCallback(() => {
        const flyX = (Math.abs(moveX) / moveX) * window.innerWidth * 1.3;
        const flyY = (moveY / moveX) * flyX;
        setTransform(flyX, flyY, (flyX / window.innerWidth) * 50, window.innerWidth);
        setTimeout(() => {
            if (frame.contains(current)) {
                frame.removeChild(current);
            }
        }, 1000);

        const next = current.previousElementSibling;
        if (next) {
            initCard(next);
        }
        setCurrent(next);
        setLikeText(next?.children[0]);

        if (currentCardIndex < allProfilesData.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
        }

        if (next == null) {
            document.getElementById('icns').style.display = "none";
            const newCard = document.createElement('div')
            newCard.className = 'error-msg'
            newCard.innerHTML = `
                <div>No Data Available.</div>`
            frame?.appendChild(newCard);
        }

        // appendCard(data[imgCount % 4]);
        if (moveX > 0) {
            const currentUserProfileData = allProfilesData[currentCardIndex];
            const userId = currentUserProfileData.user_id;
            dispatch(sendFriendRequest(userId))
            // let x = setTimeout(() => {
            //     dispatch(sendFriendRequest(userId))
            // }, 800)

            // if (x) clearInterval(x)
            // setAcceptedUsers([...acceptedUsers, userId]);
            // if (currentCardIndex < allProfilesData.length - 1) {
            //     setCurrentCardIndex(currentCardIndex + 1);
            // }
        } else {
            const currentUserProfileData = allProfilesData[currentCardIndex];
            const userId = currentUserProfileData.user_id;
            dispatch(sendFriendRequest(userId, true))
        }

    })

    function cancel() {
        setTransform(0, 0, 0, 100)
        setTimeout(() => current.style.transition = '', 100)
    }
    const handleSearch = (e) => {
        const { name, value } = e.target;
        setAdvanceSearch((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleAdvanceSearch = (e) => {
        setWait(true);
        e.preventDefault()
        let userId = getLocalStorage('user_id');
        let req = state.searchByFilter;
        Object.keys(advanceSearch).forEach((element, index) => {
            if (advanceSearch[element] != '') {
                req += '&'
                req += element + '=' + advanceSearch[element];
            }
        });
        // dispatch(advanceSearchh(req))
        dispatch(getSearchProfileUser(req))
    }

    useEffect(() => {
        let weightCount = []
        let income = []
        for (let i = 1; i < [...Array(150)].length; i++) {
            if (i <= 10) income.push(i + "00000")
            if (i > 49) weightCount.push(i)
        }
        setIncome(income)
        setWeight(weightCount)
    }, [])
    const incomeS = [100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, '10 Lacs +']
    return (
        <Layout>
            <section>
                <div class="auto-container ">
                    <div class="row align-items-center mt-5">
                        <div className='col-md-5'>
                        <section className="coming-soon-section mt-5" >
                            <div className="auto-container mb-5">
                                <div className="outer-box ">
                                    <div className="time-counter ">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <form className="form-inline"
                                                //    onSubmit={handleSearchSubmit}
                                                >
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search">Min Height(Cm)</span></label>
                                                        <select className="dropselect" name="startheight"
                                                            value={advanceSearch.startheight}
                                                            onChange={handleSearch}
                                                        >
                                                            <option value="" selected disabled hidden>Select</option>
                                                            <option value="150">150</option>
                                                            <option value="151">151</option>
                                                            <option value="152">152</option>
                                                            <option value="153">153</option>
                                                            <option value="154">154</option>
                                                            <option value="155">155</option>
                                                            <option value="156">156</option>
                                                            <option value="157">157</option>
                                                            <option value="158">158</option>
                                                            <option value="159">159</option>
                                                            <option value="160">160</option>
                                                            <option value="161">161</option>
                                                            <option value="162">162</option>
                                                            <option value="163">163</option>
                                                            <option value="164">164</option>
                                                            <option value="165">165</option>
                                                            <option value="166">166</option>
                                                            <option value="167">167</option>
                                                            <option value="168">168</option>
                                                            <option value="169">169</option>
                                                            <option value="170">170</option>
                                                            <option value="171">171</option>
                                                            <option value="172">172</option>
                                                            <option value="173">173</option>
                                                            <option value="174">174</option>
                                                            <option value="175">175</option>
                                                            <option value="176">176</option>
                                                            <option value="177">177</option>
                                                            <option value="178">178</option>
                                                            <option value="179">179</option>
                                                            <option value="180">180</option>
                                                            <option value="181">181</option>
                                                            <option value="182">182</option>
                                                            <option value="183">183</option>
                                                            <option value="184">184</option>
                                                            <option value="185">185</option>
                                                            <option value="186">186</option>
                                                            <option value="187">187</option>
                                                            <option value="188">188</option>
                                                            <option value="189">189</option>
                                                            <option value="190">190</option>
                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.looking_for && error) ? "Looking for is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search">Max Height(Cm)</span></label>
                                                        <select className="dropselect" id="fromage"
                                                            onChange={handleSearch}
                                                            value={advanceSearch.endheight}
                                                            name="endheight"
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            <option value="150">150</option>
                                                            <option value="151">151</option>
                                                            <option value="152">152</option>
                                                            <option value="153">153</option>
                                                            <option value="154">154</option>
                                                            <option value="155">155</option>
                                                            <option value="156">156</option>

                                                            <option value="157">157</option>
                                                            <option value="158">158</option>
                                                            <option value="159">159</option>
                                                            <option value="160">160</option>
                                                            <option value="161">161</option>
                                                            <option value="162">162</option>
                                                            <option value="163">163</option>
                                                            <option value="164">164</option>
                                                            <option value="165">165</option>
                                                            <option value="166">166</option>
                                                            <option value="167">167</option>
                                                            <option value="168">168</option>
                                                            <option value="169">169</option>
                                                            <option value="170">170</option>
                                                            <option value="171">171</option>
                                                            <option value="172">172</option>
                                                            <option value="173">173</option>
                                                            <option value="174">174</option>
                                                            <option value="175">175</option>
                                                            <option value="176">176</option>
                                                            <option value="177">177</option>
                                                            <option value="178">178</option>
                                                            <option value="179">179</option>
                                                            <option value="180">180</option>
                                                            <option value="181">181</option>
                                                            <option value="182">182</option>
                                                            <option value="183">183</option>
                                                            <option value="184">184</option>
                                                            <option value="185">185</option>
                                                            <option value="186">186</option>
                                                            <option value="187">187</option>
                                                            <option value="188">188</option>
                                                            <option value="189">189</option>
                                                            <option value="190">190</option>
                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.from_age && error) ? "From age is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search">Your Education</span></label>
                                                        <select className="dropselect" id="toage"
                                                            value={advanceSearch.education}
                                                            name="education"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            <option value="associat">Associate's Degree in Education</option>
                                                            <option value="bachelor">Bachelor's Degree in Education (B.Ed., B.A. in Education)</option>
                                                            <option value="master">Master's Degree in Education (M.Ed., M.A. in Education)</option>
                                                            <option value="doctor">Doctorate in Education (Ed.D., Ph.D. in Education)</option>
                                                            <option value="teacher">Teaching Credential/Certification</option>
                                                            <option value="special_certificate">Specialized Certificates or Endorsements</option>
                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.to_age && error) ? "To age is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search" >Min Weight(Kg)</span></label>
                                                        <select className="dropselect"
                                                            value={advanceSearch.minweight}
                                                            name="minweight" id="weight"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            {!!weight.length && weight.map((item, index) => {
                                                                return <option value={item} key={index}>{item}</option>
                                                            })}

                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search" >Max Weight(Kg)</span></label>
                                                        <select className="dropselect"
                                                            value={advanceSearch.maxweight}
                                                            name="maxweight" id="weight"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            {!!weight.length && weight.map((item, index) => {
                                                                return <option value={item} key={index}>{item}</option>
                                                            })}

                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search" >Minimum Income</span></label>
                                                        <select className="dropselect"
                                                            value={advanceSearch.minincome}
                                                            name="minincome" id="weight"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            {!!income.length && income.map((item, index) => {
                                                                return <option value={item} key={index}>{item}</option>
                                                            })}

                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search" >Maximum Income</span></label>
                                                        <select className="dropselect"
                                                            value={advanceSearch.maxincome}
                                                            name="maxincome" id="weight"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            {!!incomeS.length && incomeS.map((item, index) => {
                                                                return <option value={item} key={index}>{item}</option>
                                                            })}

                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search" >Skin Tone</span></label>
                                                        <select className="dropselect"
                                                            value={advanceSearch.skin_tone}
                                                            name="skin_tone" id="skin_tone"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            <option value="extremely">Extremely Fair Skin</option>
                                                            <option value="fair">Fair Skin</option>
                                                            <option value="medium">Medium Skin</option>
                                                            <option value="light_brown">Light Brown Skin</option>
                                                            <option value="brown">Brown Skin</option>
                                                            <option value="black">Black Skin</option>

                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="col-md-12 form-group">
                                                        <label className="label" htmlFor="lookingfor"><span className="search" >Maritial status</span></label>
                                                        <select className="dropselect"
                                                            value={advanceSearch.marital_status}
                                                            name="marital_status" id="marital_status"
                                                            onChange={handleSearch}
                                                            required>
                                                            <option value="" selected disabled hidden>Select</option>
                                                            <option value="single">Single</option>
                                                            <option value="Widowed">Widowed</option>
                                                            <option value="Divorced">Divorced</option>
                                                            <option value="Separated">Separated</option>
                                                            <option value="Registered partnership">Registered partnership</option>

                                                        </select>
                                                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                                                    </div>
                                                    <div className="btn-box col-md-12 text-center mt-3 ">
                                                        <button value="Lets's Begin" className="btn btn-primary" onClick={handleAdvanceSearch}>
                                                            <span className="btn-title">Lets's Begin </span></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        </div>
                        <div class="col-md-7  cards-one">
                            {allProfilesData?.length == 0 &&
                                <>
                                    <div>
                                        {wait ?
                                        <div class="d-flex justify-content-center">
                                            <div class="spinner-border" role="status">
                                            <span class="visually-hidden"></span>
                                            </div>
                                        </div>
                                        : <b>Sorry No Data at the moment <br />
                                            Please try again later</b>}
                                    </div>
                                </>}
                            <div class="frame" id="fram"></div>
                            {allProfilesData?.length > 0 ?
                                <>
                                    <div class="icons" id="icns">
                                        <svg id="hate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.07 127.89" onClick={() => hanedleLikeDislike("hate")}>
                                            <path class="a" d="M128.07,64.07c-.5,36.31-28,63.57-64,63.82S-.17,99.33,0,63.29C.17,28.25,29.23-.3,64.43,0A63.88,63.88,0,0,1,128.07,64.07ZM45.32,38.54c-2.44.36-4.63,1.12-6,3.68a6.39,6.39,0,0,0,.94,7.83A143,143,0,0,0,50.42,60.36c2.73,2.48,3.44,4.31.2,7a98.44,98.44,0,0,0-9.52,9.53c-3.62,4-3.66,7.48-.47,10.59,2.82,2.76,7.12,2.54,10.7-.79,3.05-2.83,5.91-5.86,8.85-8.8,2.58-2.57,5.16-2.53,7.73,0,2.83,2.81,5.62,5.67,8.52,8.42,3.87,3.68,8.08,4.08,11,1.15,3.23-3.21,3-6.85-.83-11C83.57,73.21,80.44,70,77.1,67c-2.37-2.13-2.71-3.65-.13-5.91,3.24-2.85,6.15-6.08,9.2-9.15,4.17-4.2,4.66-8,1.45-11.34-2.93-3-7.58-2.61-11.49,1.19-3.34,3.25-6.66,6.52-9.85,9.91-1.64,1.74-2.85,1.73-4.49,0-3.32-3.5-6.84-6.81-10.21-10.26A9,9,0,0,0,45.32,38.54Z" />
                                            <path d="M45.32,38.54a9,9,0,0,1,6.26,2.87c3.37,3.45,6.89,6.76,10.21,10.26,1.64,1.73,2.85,1.74,4.49,0,3.19-3.39,6.51-6.66,9.85-9.91C80,38,84.69,37.52,87.62,40.57c3.21,3.34,2.72,7.14-1.45,11.34-3,3.07-6,6.3-9.2,9.15-2.58,2.26-2.24,3.78.13,5.91,3.34,3,6.47,6.24,9.53,9.52,3.87,4.16,4.06,7.8.83,11-2.95,2.93-7.16,2.53-11-1.15-2.9-2.75-5.69-5.61-8.52-8.42-2.57-2.54-5.15-2.58-7.73,0-2.94,2.94-5.8,6-8.85,8.8-3.58,3.33-7.88,3.55-10.7.79-3.19-3.11-3.15-6.6.47-10.59a98.44,98.44,0,0,1,9.52-9.53c3.24-2.72,2.53-4.55-.2-7A143,143,0,0,1,40.28,50.05a6.39,6.39,0,0,1-.94-7.83C40.69,39.66,42.88,38.9,45.32,38.54Z" />
                                        </svg>
                                        <svg id="like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.06 127.99" onClick={() => hanedleLikeDislike("like")}>
                                            <path class="a" d="M128.06,63.83a63.65,63.65,0,0,1-64,64.16A63.57,63.57,0,0,1,0,64a64,64,0,0,1,128.06-.13ZM96,56.53c0-5.82-3.9-13.3-10.19-16.05-6.9-3-13.67-2.67-19.37,2.82-2,1.9-3.16,1.41-4.93-.17-2.34-2.08-4.86-3.89-8.25-4.24-9.13-.92-15.31,2.3-19.11,10.25-3.89,8.11-2.42,17.27,4,23.34,7.5,7,15.22,13.88,22.77,20.89,2.06,1.92,3.76,2.27,6,.21C74.36,86.7,82,80,89.39,73.09,93.57,69.21,96.06,64.45,96,56.53Z" />
                                            <path d="M96,56.53c.08,7.92-2.41,12.68-6.59,16.56C82,80,74.36,86.7,66.93,93.58c-2.23,2.06-3.93,1.71-6-.21-7.55-7-15.27-13.84-22.77-20.89-6.46-6.07-7.93-15.23-4-23.34,3.8-8,10-11.17,19.11-10.25,3.39.35,5.91,2.16,8.25,4.24,1.77,1.58,2.95,2.07,4.93.17,5.7-5.49,12.47-5.84,19.37-2.82C92.08,43.23,96,50.71,96,56.53Z" />
                                        </svg>
                                    </div>
                                </>
                                :
                                <>
                                    {/* <div className='no-data'>Sorry no data available</div> */}
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default memo(LikeDislikeCard)