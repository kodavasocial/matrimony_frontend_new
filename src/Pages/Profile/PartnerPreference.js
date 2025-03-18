import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../../Utils/LocalStorage";
import {
  addUserPreferences,
  getUserPreferences,
} from "../../Redux/Actions/ProfileActions";

const PartnerPreference = ({ userPreferencesList }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [userPrefId, setUserPrefId] = useState(0);

  const [userPreference, setUserPreferences] = useState({
    min_age: "",
    max_age: "",
    min_height: "",
    max_height: "",
    religion_preference: "",
    caste_preference: "",
    marital_status_preference: "",
    education_preference: "",
    occupation_preference: "",
    country_of_residence: "",
    drinking_habits: "",
    diet: "",
    personal_value: "",
    any_disabblity: "",
    family_value: "",
    prefered_state: "",
    complexion: "",
    with_children_accpetance: "",
    smoking_habits: "",
    body_type: "",
    manglik: "",
    mother_tongue: "",
    prefered_country: "",
    prefered_status: "",
    user: getLocalStorage("user_id"),
  });

  const handleUserPreferences = (e) => {
    const { name, value } = e.target;
    setUserPreferences((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSavePreferences = () => {
    const id = getLocalStorage("user_id");
    const isUpdate = userPrefId > 0 ? true : false;
    console.log("test", userPreference, isUpdate);
    setIsEdit(false);
    dispatch(addUserPreferences(id, userPreference, isUpdate));
    setTimeout(() => {
      dispatch(getUserPreferences(id));
    }, 800);
  };

  useEffect(() => {
    if (userPreferencesList?.length > 0) {
      setUserPreferences(userPreferencesList[0]);
      setUserPrefId(userPreferencesList[0]?.id);
    }
  }, [userPreferencesList]);

  return (
    <div class="information-card my-4 px-4 py-4">
      <div class="d-flex align-items-center justify-content-between mb-4 border-bottom-line">
        <div className="d-flex align-items-center mb-3">
          <span class="mr-3 ifo-bg ">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </span>
          <h4 class="mb-1 heading">Partner Preferences </h4>
        </div>
        <div className="mb-3">
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Edit Preference
          </button>
        </div>
      </div>
      {isEdit ?
        <div class="row">
        <div class="col-lg-3">
          <div class="info-profile-one">
            <ul>
              <div className="profile-page-input">
                <label>Min-age</label>
                <input type="text" name="min_age" placeholder='Min Age' value={userPreference?.min_age} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Max-Age</label>
                <input type="text" name="max_age" placeholder='Max Age' value={userPreference?.max_age} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Religion Preference</label>
                <input type="text" name="religion_preference" placeholder='Religion Preference' value={userPreference?.religion_preference} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Marital Status</label>
                <input type="text" name="marital_status_preference" placeholder='Martial Status' value={userPreference?.marital_status_preference} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Occupation Preference</label>
                <input type="text" name="occupation_preference" placeholder='Occupation' value={userPreference?.occupation_preference} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Drinking Habits</label>
                <input type="text" name="drinking_habits" placeholder='Drinking Habits' value={userPreference?.drinking_habits} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Country Of Residence</label>
                <input type="text" name="country_of_residence" placeholder='Country Of Residence' value={userPreference?.country_of_residence} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Personal Value</label>
                <input type="text" name="personal_value" placeholder='Personal Value' value={userPreference?.personal_value} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Any Disablity Value</label>
                <input type="text" name="any_disabblity" placeholder='Any Disablity' value={userPreference?.any_disabblity} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="info-profile-one edit-partner-data">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="info-profile-one ">
            <ul>
              <div className="profile-page-input">
                <label>Mother Tongue</label>
                <input type="text" name="mother_tongue" placeholder='Mother Tongue' value={userPreference?.mother_tongue} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Prefered State</label>
                <input type="text" name="prefered_state" placeholder='Prefered State' value={userPreference?.prefered_state} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Smoking Habits</label>
                <input type="text" name="smoking_habits" placeholder='Smoking Habits' value={userPreference?.smoking_habits} onChange={(e) => handleUserPreferences(e)} ></input>
              </div>
              <div className="profile-page-input">
                <label>Manglik</label>
                <input type="text" name="manglik" placeholder='Manglik' value={userPreference?.manglik} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Min-Height(Cm)</label>
                <input type="text" name="min_height" placeholder='Min Height' value={userPreference?.min_height} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Max-height(Cm)</label>
                <input type="text" name="max_height" placeholder='Max Height' value={userPreference?.max_height} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Caste</label>
                <input type="text" name="caste_preference" placeholder='Caste' value={userPreference?.caste_preference} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Education</label>
                <input type="text" name="education_preference" placeholder='Education' value={userPreference?.education_preference} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
              <div className="profile-page-input">
                <label>Diet</label>
                <input type="text" name="diet" placeholder='Diet' value={userPreference?.diet} onChange={(e) => handleUserPreferences(e)}></input>
              </div>
            </ul>
          </div>
        </div>
      </div>
      :
      <div class="row">
        <div class="col-lg-3">
          <div class="info-profile-one info-profile-data">
            <ul>
              <div className="profile-page-input">
                <label>Min-age</label>
                <input type="text" disabled value={userPreference?.min_age}></input>
              </div>
              <div className="profile-page-input">
                <label>Max-Age</label>
                <input type="text" disabled value={userPreference?.max_age}></input>
              </div>
              <div className="profile-page-input">
                <label>Religion Preference</label>
                <input type="text" disabled value={userPreference?.religion_preference}></input>
              </div>
              <div className="profile-page-input">
                <label>Marital Status</label>
                <input type="text" disabled value={userPreference?.marital_status_preference}></input>
              </div>
              <div className="profile-page-input">
                <label>Occupation Preference</label>
                <input type="text" disabled value={userPreference?.occupation_preference}></input>
              </div>
              <div className="profile-page-input">
                <label>Drinking Habits</label>
                <input type="text" disabled value={userPreference?.drinking_habits}></input>
              </div>
              <div className="profile-page-input">
                <label>Country Of Residence</label>
                <input type="text" disabled value={userPreference?.country_of_residence}></input>
              </div>
              <div className="profile-page-input">
                <label>Personal Value</label>
                <input type="text" disabled value={userPreference?.personal_value}></input>
              </div>
              <div className="profile-page-input">
                <label>Any Disablity</label>
                <input type="text" disabled value={userPreference?.any_disabblity}></input>
              </div>
            </ul>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="info-profile-one edit-partner-data">
          </div>
        </div>
        <div class="col-lg-2">
          <div class="info-profile-one info-profile-data">
            <ul>
              <div className="profile-page-input">
                <label>Mother Tongue</label>
                <input type="text" disabled value={userPreference?.mother_tongue}></input>
              </div>
              <div className="profile-page-input">
                <label>Prefered State</label>
                <input type="text" disabled value={userPreference?.prefered_state}></input>
              </div>
              <div className="profile-page-input">
                <label>Smoking</label>
                <input type="text" disabled value={userPreference?.smoking_habits}></input>
              </div>
              <div className="profile-page-input">
                <label>Manglik</label>
                <input type="text" disabled value={userPreference?.manglik}></input>
              </div>
              <div className="profile-page-input">
                <label>Min-height</label>
                <input type="text" disabled value={userPreference?.min_height}></input>
              </div>
              <div className="profile-page-input">
                <label>Max-height</label>
                <input type="text" disabled value={userPreference?.max_height}></input>
              </div>
              <div className="profile-page-input">
                <label>Caste</label>
                <input type="text" disabled value={userPreference?.caste_preference}></input>
              </div>
              <div className="profile-page-input">
                <label>Education</label>
                <input type="text" disabled value={userPreference?.education_preference}></input>
              </div>
              <div className="profile-page-input">
                <label>Diet</label>
                <input type="text" disabled value={userPreference?.diet}></input>
              </div>
            </ul>
          </div>
        </div>
      </div>}
      {isEdit && (
        <div className="text-center my-4">
          <button
            className="btn btn-primary mr-2"
            onClick={handleSavePreferences}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default PartnerPreference;
