import React, { useEffect, useState } from "react";
import image from "../assets/banner/banner.jpg"
import "../../src/assets/css/owl.css"
import "./banner.css"
import OwlCarousel from 'react-owl-carousel';
import { getProfile, getProfileImage, getSearchProfileUser, getSuccessStories, getuser } from "../Redux/Actions/ProfileActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../Utils/LocalStorage";
import Stories from "./Stories";
import AIChat from "./AIChat";

const Banner = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state)
  const { Profile: { userData, profileData, profileImage, successStoriesList } } = data
  const [profileUserData, setProfileUserData] = useState({})
  const [searchData, setSearchData] = useState({
    looking_for: "",
    from_age: "",
    to_age: "",
    religion: ""
  })
  const options = {
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    mouseDrag: false,
    autoplay: true,
    animateOut: 'slideOutLeft',
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };

  const [bannerList, setBannerList] = useState([
    { image: '../assets/banner/banner.jpg', heading: 'Someone Special is', subheading: 'Waiting For You' },
    { image: '../assets/banner/banner2.jpg', heading: 'Find Your Prefect', subheading: 'Match Here!!!' }
  ])

  const handleSearch = (e) => {
    const { name, value } = e.target
    setSearchData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  useEffect(() => {
    if (profileData?.response?.data?.detail == "Not found.") {
      navigate("/profile-info")
    }
    else if (!!profileData && !!userData) {
      if (userData?.gender) {
        setSearchData({ ...searchData, looking_for: userData?.gender == 'Male' ? "Female" : "Male" })
      }
      setProfileUserData({ ...profileData, ...userData })
    }
  }, [userData, profileData])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchData.from_age && searchData.to_age && searchData.looking_for && searchData.religion) {
      let id = getLocalStorage("user_id");
      const quary = `?user_id=${id}&age_from=${searchData.from_age}&age_to=${searchData.to_age}&gender=${searchData.looking_for}&religion=${searchData.religion}`
      navigate("/searchprofiles", { state: { searchByFilter: quary } })
    }
  }

  useEffect(() => {
    let id = getLocalStorage("user_id")
    dispatch(getuser(+id))
    dispatch(getProfile(+id))
    dispatch(getProfileImage(+id))
    dispatch(getSuccessStories())
  }, [getLocalStorage("user_id")])

  useEffect(() => {
    setLocalStorage("profileData", JSON.stringify(profileUserData))
  })
  return (
    <>
      <div className="mainBannerSection">
        <section className="banner-section ">
          <div className="banner-carousel owl-carousel owl-theme ">
            <OwlCarousel className="owl-theme" {...options}>
              {bannerList && bannerList.map((item, index) => {
                return (
                  <div className="slide-item" style={{ backgroundImage: `url(${image})` }} key={index}>
                    <div className="auto-container">
                      <div className="content-box mt-5 text-left">

                        <h2> {item.heading} <br />{item.subheading}</h2>
                        {/* <ul className="info-list">
                          <li><span className="icon fas fa-edit"></span> Sign Up</li>
                          <li><span className="icon fas fa-user-plus"></span> Connect</li>
                          <li><span className="icon fas fa-comments"></span> Interact</li>
                        </ul> */}
                      </div>
                    </div>
                  </div>
                )
              })}
            </OwlCarousel>
          </div>
        </section>
      </div>
      <section className="coming-soon-section ">
        <div className="auto-container mb-5">
          <div className="outer-box">
            <div className="inner-border">
              <div className="time-counter ">
                <div className="col-md-12">
                  <div className="row">
                    <form className="form-inline" onSubmit={handleSearchSubmit}>
                      <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                        <label className="label" htmlFor="lookingfor"><span className="search">I'm looking for a</span></label>
                        <select className="dropselect" disabled name="looking_for" value={searchData.looking_for} selected onChange={handleSearch} >
                          <option value="Male">Groom</option>
                          <option value="Female">Bride</option>
                        </select>
                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.looking_for && error) ? "Looking for is Required" : ""}</p> */}
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                        <label className="label" htmlFor="lookingfor"><span className="search">From Age</span></label>
                        <select className="dropselect" id="fromage" onChange={handleSearch} value={searchData.from_age} name="from_age" required>
                          <option value="" selected>Select</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                          <option value="35">35</option>
                          <option value="36">36</option>
                          <option value="37">37</option>
                          <option value="38">38</option>
                          <option value="39">39</option>
                          <option value="40">40</option>
                          <option value="41">41</option>
                          <option value="42">42</option>
                          <option value="43">43</option>
                          <option value="44">44</option>
                          <option value="45">45</option>
                          <option value="46">46</option>
                          <option value="47">47</option>
                          <option value="48">48</option>
                          <option value="49">49</option>
                          <option value="50">50</option>
                          <option value="51">51</option>
                          <option value="52">52</option>
                          <option value="53">53</option>
                          <option value="54">54</option>
                          <option value="55">55</option>
                          <option value="56">56</option>
                          <option value="57">57</option>
                          <option value="58">58</option>
                          <option value="59">59</option>
                          <option value="60">60</option>
                          <option value="61">61</option>
                          <option value="62">62</option>
                          <option value="63">63</option>
                          <option value="64">64</option>
                          <option value="65">65</option>
                        </select>
                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.from_age && error) ? "From age is Required" : ""}</p> */}
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                        <label className="label" htmlFor="lookingfor"><span className="search">To Age</span></label>
                        <select className="dropselect" id="toage" value={searchData.to_age} name="to_age" onChange={handleSearch} required>
                          <option value="" selected>Select</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option>
                          <option value="21">21</option>
                          <option value="22">22</option>
                          <option value="23">23</option>
                          <option value="24">24</option>
                          <option value="25">25</option>
                          <option value="26">26</option>
                          <option value="27">27</option>
                          <option value="28">28</option>
                          <option value="29">29</option>
                          <option value="30">30</option>
                          <option value="31">31</option>
                          <option value="32">32</option>
                          <option value="33">33</option>
                          <option value="34">34</option>
                          <option value="35">35</option>
                          <option value="36">36</option>
                          <option value="37">37</option>
                          <option value="38">38</option>
                          <option value="39">39</option>
                          <option value="40">40</option>
                          <option value="41">41</option>
                          <option value="42">42</option>
                          <option value="43">43</option>
                          <option value="44">44</option>
                          <option value="45">45</option>
                          <option value="46">46</option>
                          <option value="47">47</option>
                          <option value="48">48</option>
                          <option value="49">49</option>
                          <option value="50">50</option>
                          <option value="51">51</option>
                          <option value="52">52</option>
                          <option value="53">53</option>
                          <option value="54">54</option>
                          <option value="55">55</option>
                          <option value="56">56</option>
                          <option value="57">57</option>
                          <option value="58">58</option>
                          <option value="59">59</option>
                          <option value="60">60</option>
                          <option value="61">61</option>
                          <option value="62">62</option>
                          <option value="63">63</option>
                          <option value="64">64</option>
                          <option value="65">65</option>
                        </select>
                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.to_age && error) ? "To age is Required" : ""}</p> */}
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 form-group">
                        <label className="label" htmlFor="lookingfor"><span className="search" >Community</span></label>
                        <select className="dropselect" value={searchData.religion} name="religion" id="religion" onChange={handleSearch} required>
                          <option value="" selected disabled>Please Select</option>
                          <option value="Hindu">Kodava</option>
                          <option value="Hindu">Other</option>
                        </select>
                        {/* <p className="form-text " style={{ color: "red" }}>{(!searchData.religion && error) ? "Religion is Required" : ""}</p> */}
                      </div>
                      <div className="btn-box col-md-12  taxt-center mt-4 ">
                        <button value="Lets's Begin" className="btn btn-primary">
                          <span className="btn-title">Lets's Begin </span></button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Stories storiesList={successStoriesList} />
        </div>
        <div>
          <AIChat />
        </div>
      </section>
      
    </>
  );
};

export default Banner;
