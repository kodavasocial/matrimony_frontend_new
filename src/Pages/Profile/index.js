import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../Layout";
import {
  getLikedUser,
  getProfile,
  getProfileImage,
  getUserImages,
  getUserPreferences,
  getuser,
  updateProfileImage,
} from "../../Redux/Actions/ProfileActions";
import { getLocalStorage, setLocalStorage } from "../../Utils/LocalStorage";
import Media from "./Media";
import "./Profile.css";
import ProfileInfo from "./ProfileInfo";
import profileDefaultImage from "../../assets/images/background/bg.jpg";
import { BiPencil } from "react-icons/bi";
import { toastify } from "../../Utils/Function";
import { toast } from "react-toastify";
import defaultImage from "../../assets/images/background/bg.jpg";
import FriendInfo from "./FriendInfo";
import PartnerPreference from "./PartnerPreference";
import AboutMe from "./AboutMe";

const Profile = () => {
  const inputRef = useRef(null);
  const data = useSelector((state) => state);
  const {
    Profile: {
      userData,
      profileData,
      profileImage,
      likedUserList,
      userPreferencesList,
    },
  } = data;
  const dispatch = useDispatch();
  const [profileTabs, setProfileTabs] = useState("info");
  const [profileUserData, setProfileUserData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isEditAbout, setIsEditAbout] = useState(false);
  const [imageUpdateCount, setImageUpdateCount] = useState(0);

  const handleProfileTabs = (data) => {
    setProfileTabs(data);
  };
  const handleProfileImage = (e) => {
    let { files } = e.target;
    const imageType = files[0]?.name.split(".")[1];
    if (
      imageType === "JPEG" ||
      imageType === "PNG" ||
      imageType === "png" ||
      imageType === "jpeg" ||
      imageType === "jpg" ||
      imageType === "JPG" ||
      imageType === "gif"
    ) {
      let image = files[0];
      dispatch(updateProfileImage(getLocalStorage("user_id"), image));
      setImageUpdateCount((prev) => prev + 1);
    } else {
      toastify(toast.info, "Please select valid image.");
    }
  };

  const cancelEdit = (item) => {
    setIsEdit(false);
    setTimeout(() => {
      let id = getLocalStorage("user_id");
      dispatch(getuser(+id));
      dispatch(getProfile(+id));
    }, 800);
  };

  useEffect(() => {
    let id = getLocalStorage("user_id");
    dispatch(getuser(+id));
    dispatch(getProfile(+id));
    dispatch(getProfileImage(+id));
    dispatch(getLikedUser(id));
    dispatch(getUserImages(id));
    dispatch(getUserPreferences(id));
  }, [getLocalStorage("user_id")]);
  useEffect(() => {
    if (!!profileData && !!userData) {
      setProfileUserData({ ...profileData, ...userData });
    }
  }, [userData, profileData]);
  useEffect(() => {
    if (profileImage.status_code === 200 && imageUpdateCount > 0) {
      toastify(toast.success, "Profile image update successful.");
    } else if (profileImage.response) {
      // if (profileImage.response.data.detail){
      toastify(toast.error, "Please select images with a clear face.");
      // }
    }
  }, [profileImage]);

  return (
    <>
      <Layout>
        {/* <div style={{ padding: "90px 0 0 0 " }}> */}
        <div>
          <div className="mainBannerSection">
            <div className="auto-container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-content d-flex">
                    <div className="img-content mb-3">
                      <img
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        className="image-wrap"
                        src={profileImage?.image || profileDefaultImage}
                      />
                      {isEdit && (
                        <div class="avatar-edit">
                          <input
                            type="file"
                            id="imageUpload"
                            className="d-none"
                            ref={inputRef}
                            accept="image/*"
                            onChange={handleProfileImage}
                          />
                          <label
                            className="load-img"
                            for="imageUpload"
                            onClick={() => inputRef.current.click()}
                          >
                            {" "}
                            <i class="fa fa-camera " aria-hidden="true"></i>
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="text-wrap ml-2 mt-3">
                      <div className="text-content d-flex">
                        <h6 className="mr-2">
                          {" "}
                          {profileUserData &&
                            profileUserData?.first_name
                              ?.charAt(0)
                              ?.toUpperCase() +
                              profileUserData?.first_name?.slice(1) +
                              " " +
                              profileUserData?.last_name}
                        </h6>
                        <span
                          className="mt-2"
                          style={{ fontSize: 18, color: "#07c6ff" }}
                        >
                          Verified{" "}
                          <i
                            className="fa fa-check-circle"
                            style={{ fontSize: 20, color: "#07c6ff" }}
                          ></i>
                        </span>
                      </div>
                      <div className="third-content">
                        <h6 className="text-white">
                          {profileData?.occupation}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-lg-6">
                                    <div className='text-end mt-4'>
                                     
                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
          <section className="mid-sectiuon">
            <div className="auto-container d-flex align-items-center justify-content-between">
              <div className="info-mid ">
                <ul className="">
                  <li onClick={() => handleProfileTabs("info")}>
                    <a href="javascript:void(0)">
                      {" "}
                      <i
                        className="fa fa-info-circle"
                        aria-hidden="true"
                      ></i>{" "}
                      Info
                    </a>
                  </li>
                  <li onClick={() => handleProfileTabs("Media")}>
                    <a href="javascript:void(0)">
                      {" "}
                      <i
                        className="fa fa-camera"
                        aria-hidden="true"
                      ></i> Media{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/* <div>
                                <button className='btn btn-primary' onClick={() => setIsEdit(true)}>
                                    Edit Profile
                                </button>
                            </div> */}
            </div>
          </section>
          {profileTabs == "Media" && <Media />}
          {profileTabs != "Media" && (
            <section className="second-section">
              <div className="auto-container">
                <div className="row">
                  <div className="col-lg-8">
                    <div>
                      {profileTabs == "info" && (
                        <ProfileInfo
                          profileUserData={profileUserData}
                          isEdit={isEdit}
                          setIsEdit={setIsEdit}
                          cancelEdit={cancelEdit}
                        />
                      )}
                    </div>
                    <div>
                      {profileTabs == "info" && (
                        <PartnerPreference
                          userPreferencesList={userPreferencesList}
                        />
                      )}
                    </div>
                    {/* <div className="second-card my-4 px-4 py-4">
                                        <div className="d-flex mx-4 mt-2 mb-2 pt-3">
                                            <span className="user-profile" > <i className="fa fa-user" aria-hidden="true"></i>
                                            </span>
                                            <h6 className="ml-3 mt-2">About me</h6>
                                            <div>
                                                <button className='btn btn-primary' onClick={() => setIsEditAbout(true)}>
                                                    Edit About
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-bottom-line mx-4 my-4"></div>
                                        <div className="profile-image">
                                            <img src="/assets/images/1.jpg" />
                                            <p className='desh'>{profileUserData.about_me}</p>
                                        </div>
                                    </div> */}
                  </div>

                  <div className="col-lg-4">
                    <div>
                      {profileTabs == "info" && (
                        <AboutMe profileUserData={profileUserData} />
                      )}
                    </div>
                    <div className="information-card  px-4 py-4  ">
                                        <div className="d-flex mx-4  mb-2 ">
                                            <span className="ifo-bg" > <i className="fa fa-user" aria-hidden="true"></i>
                                            </span>
                                            <h6 className="ml-3 mt-2 heading">Interest Expressed</h6>
                                        </div>
                                        <div className="border-bottom-line mx-4 my-3"></div>
                                        <FriendInfo likedUserList={likedUserList} />
                                        <div className="border-bottom-line mx-4 my-4"></div>
                                    </div>
                  </div>
                </div>
                {/* <div className='row'>
                                <div className="col-lg-8">
                                    {profileTabs == "info" && <PartnerPreference userPreferencesList={userPreferencesList} />}
                                </div>
                            </div> */}
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Profile;
