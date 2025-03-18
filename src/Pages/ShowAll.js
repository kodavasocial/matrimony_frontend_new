import React from 'react';
import "./Profile/Profile.css"

const ShowAll = () => {
    return (
        <>
            <div class="mainBannerSection">
                <div class="auto-container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="main-content d-flex">
                                <div class="img-content">
                                    <img class="image-wrap " src="./images/main-slider/profile-img.jpg" />
                                </div>
                                <div class="text-wrap ml-2">
                                    <div class="text-content d-flex">
                                        <h6 class="mr-2"> Kartik Tyagi</h6>
                                        <span class="mr-2 mt-2"><i class="fa fa-check-circle"></i></span>
                                        <span class="status mr-2 mt-2"> offline
                                        </span>
                                    </div>
                                    <div class="text-star d-flex">
                                        <ul >
                                            <li>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                            </li>
                                            <li>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                            </li>
                                            <li>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                            </li>
                                            <li>
                                                <i class="fa fa-star" aria-hidden="true"></i>
                                            </li>
                                        </ul>
                                        <span class="dott"></span>
                                        <h6 class="text-white">5 out of 5</h6>
                                        <span class="dott"></span>
                                        <h6 class="text-white">9 out of 9</h6>
                                    </div>
                                    <div class="third-content">
                                        <h6 class="text-white">Tester</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="side-content ">

                                <div class="dimo-wrap d-flex">
                                    <div class="dimo">
                                        <div class="dimo-one">
                                            10
                                        </div>
                                        <div class="dimo-two">
                                            views
                                        </div>
                                    </div>
                                    <div class="dimo">
                                        <div class="dimo-one">
                                            10
                                        </div>
                                        <div class="dimo-two">
                                            comments
                                        </div>
                                    </div>
                                    <div class="dimo">
                                        <div class="dimo-one">
                                            10
                                        </div>
                                        <div class="dimo-two">
                                            likes
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <section class="mid-sectiuon">
                <div class="auto-container">
                    <div class="info-mid ">
                        <ul class="">
                            <li><a href="#"> <i class="fa fa-info-circle" aria-hidden="true"></i>
                                info</a></li>
                            <li><a href="#"> <i class="fa fa-globe" aria-hidden="true"></i>
                                overview 1</a></li>
                            <li><a href="media"> <i class="fa fa-camera" aria-hidden="true"></i>

                                Media </a></li>
                            <li><a href="#"> <i class="fa fa-address-card" aria-hidden="true"></i>
                                activity</a></li>
                            <li><a href="#"> <i class="fa fa-clipboard" aria-hidden="true"></i>
                                posts</a></li>
                        </ul>
                    </div>

                </div>
            </section>
            <section class="second-section">
                <div class="auto-container">
                    <div class="row">
                        <div class="col-lg-8">

                            <ul>
                                <li>
                                    <div class="row show-all-cards m-0 p-3 mt-4">
                                        <div class="col-lg-8">

                                        </div>
                                        <div class="col-lg-4 d-flex p-2">

                                            <h6 class="mr-3 text-center">order:by</h6>
                                            <h6 class="form-group">
                                                <select class="custom-select-box p-2" name="option" tabindex="7" required id="field">
                                                    <option value="">last active</option>
                                                    <option value="1">Newest Registered</option>
                                                    <option value="2">Alphabetical</option>
                                                </select>
                                            </h6>


                                        </div>

                                    </div>
                                </li>
                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }}><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }}><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>

                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }} ><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }} ><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }} ><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }} ><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="show-all-cards d-flex p-4 mt-4">
                                        <div class="show-card-img">
                                            <img src="./images/main-slider/profile-img.jpg" />
                                        </div>
                                        <div class="show-card-content">
                                            <h5>loreum ipsum  <span style={{ color: "#800925" }} ><i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                            <h6>loreum ipsum dolor</h6>
                                        </div>
                                    </div>
                                </li>

                            </ul>

                        </div>
                        <div class="col-lg-4">
                            <div class="one-card  my-4 d-flex justify-content-between">
                                <div class="first-content d-flex">
                                    <img class="ml-2 mt-2" src="./images/main-slider/m-1.jpeg" />
                                    <h6 class="text-white ml-2 mb-2 mt-2">sign in to account</h6>
                                </div>
                                <div class="second-content">
                                    <img class="img-change " src="./images/favicon.png" />
                                </div>
                            </div>
                            <div class="second-card">
                                <div class="d-flex mx-4 mt-2 mb-2 pt-3">
                                    <span class="user-profile" > <i class="fa fa-user" aria-hidden="true"></i>
                                    </span>
                                    <h6 class="ml-3">About me</h6>
                                </div>
                                <div class="border-bottom-line mx-4 my-4"></div>
                                <div class="profile-image">
                                    <img src="./images/main-slider/profile-img.jpg" />
                                    <h4>hello</h4>
                                    <p class="m-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit</p>

                                    <div class="border-line">

                                    </div>
                                    <p class="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero reiciendis aperiam quod facilis consectetur, .</p>
                                </div>
                            </div>
                            <div class="third-card mb-3">
                                <div class="d-flex mx-4 mt-2 mb-2 pt-3">
                                    <span class="user-profile" > <i class="fa fa-user" aria-hidden="true"></i>
                                    </span>
                                    <h6 class="ml-3">Friends</h6>

                                </div>
                                <div class="border-bottom-line mx-4 my-3"></div>
                                <ul>
                                    <li>
                                        <div class="third-image-content d-flex pb-3">
                                            <div class="third-image">
                                                <img src="./images/main-slider/profile-img.jpg" />
                                            </div>
                                            <div class="third-content">
                                                <h5>Lorem ipsum dolor  </h5>
                                                <h6>loreum ipsum</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="third-image-content d-flex pb-3">
                                            <div class="third-image">
                                                <img src="./images/main-slider/profile-img.jpg" />
                                            </div>
                                            <div class="third-content">
                                                <h5>Lorem ipsum dolor  <span>    <i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                                <h6>loreum ipsum</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="third-image-content d-flex pb-3">
                                            <div class="third-image">
                                                <img src="./images/main-slider/profile-img.jpg" />
                                            </div>
                                            <div class="third-content">
                                                <h5>Lorem ipsum dolor  <span>    <i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                                <h6>loreum ipsum</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="third-image-content d-flex pb-3">
                                            <div class="third-image">
                                                <img src="./images/main-slider/profile-img.jpg" />
                                            </div>
                                            <div class="third-content">
                                                <h5>Lorem ipsum dolor  <span>    <i class="fa fa-check-circle" aria-hidden="true"></i></span></h5>
                                                <h6>loreum ipsum</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="third-image-content d-flex pb-3">
                                            <div class="third-image">
                                                <img src="./images/main-slider/profile-img.jpg" />
                                            </div>
                                            <div class="third-content">
                                                <h5>Lorem ipsum dolor  </h5>
                                                <h6>loreum ipsum</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <div class="border-bottom-line mx-4 my-4"></div>
                                <a href="show-all
          "> <h6 class="text-center mx-3 pb-2">show all friends(11)</h6></a>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>
    )
}

export default ShowAll