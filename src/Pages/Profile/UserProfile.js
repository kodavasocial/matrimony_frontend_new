import React, { useEffect, useState } from 'react'
import Layout from '../../Layout'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { baseUrl } from '../../Utils/ApiUrl'
import { useNavigate } from 'react-router-dom'
import { getUserPictures, getUserPreferences } from '../../Redux/Actions/ProfileActions'

const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profile = useSelector(state => state.Profile)
    const { searchByIdRes, profilePicturesData, userPreferencesList } = profile;
    useEffect(() => {
        if (!searchByIdRes){
            navigate('/');
        }
        if (searchByIdRes?.response?.data?.detail) {
            navigate('/')
        }
        else {
            if (searchByIdRes){
                dispatch(getUserPictures(searchByIdRes[0]?.user_id))
                dispatch(getUserPreferences(searchByIdRes[0]?.user_id))
            }
        }

    }, [searchByIdRes])
    return (
        <Layout>
            {searchByIdRes?.length > 0 &&
                <>
                    <div class="main-content d-flex">
                        <div class="img-content mx-auto">
                            <img id="myImg" width="500" height="300" className="story-img img-fluid image-wrap" src={searchByIdRes[0].profile_picture ? baseUrl + searchByIdRes[0].profile_picture : "/assets/images/background/bg.jpg"} alt="" />
                        </div>
                    </div>

                    <div class="auto-container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="information-card my-4 px-4 py-4 jjj" >
                                    <div class="d-flex  mb-4 border-bottom-line">
                                        <span class="mr-3 mb-2"><i class="fa fa-info-circle" aria-hidden="true"></i>
                                        </span>
                                        <h6 class="mb-2">Profile</h6>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="info-profile-one">
                                                <ul>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.first_name && 'Name' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.profile_for && 'Profile for' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.age > 0 && 'Age' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.religion && 'Religion' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.living_in && 'Living in' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.gender && 'Gender' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.community && 'Community' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.time_of_bith && 'Time of Birth' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.education && 'Education' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.height && 'Height' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.income && 'Income' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.marital_status && 'Marital Status' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.occupation && 'Occupation' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.skin_tone && 'Skin Tone' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.alcoholic && 'Alcoholic' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.smoker && 'Smoker' : ''}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="info-profile-one">
                                                <ul>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.first_name + ' ' + searchByIdRes[0].last_name : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.profile_for : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.age : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.religion : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.living_in : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.gender : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.community : ''}</li>
                                                    <li>{(()=>{
                                                        if (searchByIdRes && searchByIdRes[0]?.time_of_bith){
                                                            const datetime = new Date(searchByIdRes[0].time_of_bith);
                                                            return datetime.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
                                                        }
                                                        else{
                                                            return '';
                                                        }
                                                    })()}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.education : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.height + ' Cm' : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.income : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.marital_status : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.occupation : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.skin_tone : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.alcoholic : ''}</li>
                                                    <li>{searchByIdRes ? searchByIdRes[0]?.smoker : ''}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <h4>Preferences</h4>
                                        <div class="col-lg-6">
                                            <div class="info-profile-one">
                                                <ul>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.min_age && 'Age' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.min_height && userPreferencesList[0]?.max_height && 'Height' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.religion_preference && 'Religion Preference' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.marital_status_preference && 'Marital Status' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.occupation_preference && 'Occupation Preference' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.drinking_habits && 'Drinking Habits' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.country_of_residence && 'Country Of Residence' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.personal_value && 'Personal Value' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.any_disabblity && 'Any Disablity' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.family_value && 'Family Value' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.prefered_state && 'Prefered State' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.smoking_habits && 'Smoking Habits' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.manglik && 'Manglik' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.mother_tongue && 'Mother Tongue' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.caste_preference && 'Caste' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.education_preference && 'Education' : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.body_type && 'Body Type' : ''}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="info-profile-one">
                                                <ul>
                                                    <li>{userPreferencesList && userPreferencesList[0]?.min_age && userPreferencesList[0]?.max_age ? userPreferencesList[0]?.min_age + ' - ' + userPreferencesList[0]?.max_age : ''}</li>
                                                    <li>{userPreferencesList ? (userPreferencesList[0]?.min_height && userPreferencesList[0]?.max_height ? `${userPreferencesList[0]?.min_height} - ${userPreferencesList[0]?.max_height}` : '') : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.religion_preference : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.marital_status_preference : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.occupation_preference : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.drinking_habits : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.country_of_residence : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.personal_value : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.any_disabblity : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.family_value : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.prefered_state : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.smoking_habits : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.manglik : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.mother_tongue : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.caste_preference : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.education_preference : ''}</li>
                                                    <li>{userPreferencesList ? userPreferencesList[0]?.body_type : ''}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {profilePicturesData?.length > 0 &&
                                <>
                                    <h6 class="ml-3">Profile Images</h6>
                                    <div class="col-lg-12 mb-4 ml-1">
                                        <div class="image-gallery">
                                            {profilePicturesData.map((item) => {
                                                return <>
                                                    <img className='m-2' style={{ width: '170px', height: '170px' }} src={item?.image ? baseUrl + item.image : "/assets/images/background/bg.jpg"} alt="" />
                                                </>
                                            })}
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </Layout>
    )
}

export default UserProfile