import React, { useEffect, useState } from 'react'
import { calculateAge } from '../../Utils/Function'
import EditProfile from './EditProfile';

const ProfileInfo = ({ profileUserData, isEdit, setIsEdit, cancelEdit }) => {
    return (
        <div class="information-card my-4 px-4 py-4 hhhh info-height">
            <div class="d-flex align-items-center  justify-content-between mb-4 border-bottom-line">
                <div className='d-flex align-items-center mb-3'>
                <span class="mr-3 ifo-bg"><i class="fa fa-info-circle" aria-hidden="true"></i>
                </span>
                <h4 class="heading">Profile</h4>
                </div>
             
                <div className='mb-3'> 
                    <button className='btn btn-primary' onClick={() => setIsEdit(true)}>
                        Edit Profile
                    </button>
                </div>
            </div>
            {!isEdit ?
                <div class="row">
                    <div class="col-lg-4">
                        <div class="info-profile-one">
                            <ul>
                            <div className='profile-data-two'>
                                    <li>
                                        <label>
                                            name
                                        </label>
                                        <input type="text" disabled name="name" value={profileUserData?.first_name && profileUserData?.last_name ? profileUserData?.first_name + ' ' + profileUserData?.last_name : ""}></input>
                                    </li>
                                </div>
                           <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        username
                                        </label>
                                        <input type="text" disabled name="username" value={profileUserData?.username}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                            email
                                        </label>
                                        <input type="text" disabled name="email" value={profileUserData?.email}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Education
                                        </label>
                                        <input type="text" disabled name="education" value={(()=>{
                                            let education = profileUserData?.education;
                                            if (education){
                                                return education.charAt(0).toUpperCase() + education.slice(1);
                                            }
                                            else{
                                                return '';
                                            }
                                        })()}></input>
                                    </li>
                                </div> 
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Religion
                                        </label>
                                        <input type="text" disabled name="religion" value={profileUserData.religion}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Hobbies
                                        </label>
                                        <input type="text" disabled name="hobbies" value={profileUserData?.hobbies}></input>
                                    </li>
                                </div>
                            </ul>
                        </div>

                    </div>

                    <div class="col-lg-4">
                        <div class="info-profile-one">
                            <ul>
                            <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Community/Caste
                                        </label>
                                        <input type="text" disabled name="community" value={profileUserData?.community}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                            living in
                                        </label>
                                        <input type="text" disabled name="living_in" value={profileUserData?.living_in}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                            Mobile Number
                                        </label>
                                        <input type="text" disabled name="mobile_number" value={profileUserData?.mobile_number}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                            Gender
                                        </label>
                                        <input type="text" disabled name="gender" value={profileUserData?.gender}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                            Family name
                                        </label>
                                        <input type="text" disabled name="family_name" value={profileUserData?.family_name}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Time of Birth
                                        </label>
                                        <input type="text" disabled name="time_of_birth" value={(()=>{
                                            let date = new Date(profileUserData?.time_of_birth);
                                            let options = {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            second: 'numeric'
                                            };
                                            // let timezoneOffsetHours = Math.abs(date.getTimezoneOffset() / 60);
                                            // let timezoneOffsetMinutes = Math.abs(date.getTimezoneOffset() % 60);
                                            // let timezoneOffsetString =
                                            // (date.getTimezoneOffset() < 0 ? '+' : '-') +
                                            // ('0' + timezoneOffsetHours).slice(-2) +
                                            // ':' +
                                            // ('0' + timezoneOffsetMinutes).slice(-2);
                                            let formattedDate = date.toLocaleDateString('en-US', options)
                                            return formattedDate;
                                        })()}></input>
                                    </li>
                                </div>
                            </ul>
                        </div>

                    </div>
                    <div class="col-lg-4">
                        <div class="info-profile-one">
                            <ul>
                            <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Caste
                                        </label>
                                        <input type="text" disabled name="caste" value={profileUserData?.caste}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Income
                                        </label>
                                        <input type="text" disabled name="income" value={profileUserData?.income}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Height(Cm)
                                        </label>
                                        <input type="text" disabled name="height" value={profileUserData?.height}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        Marital Status
                                        </label>
                                        <input type="text" disabled name="marital_status" value={profileUserData?.marital_status}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        weight(kg)
                                        </label>
                                        <input type="text" disabled name="weight" value={profileUserData?.weight}></input>
                                    </li>
                                </div>
                                <div className='profile-data-two'>
                                    <li>
                                        <label>
                                        occupation
                                        </label>
                                        <input type="text" disabled name="occupation" value={profileUserData?.occupation}></input>
                                    </li>
                                </div>
                            </ul>
                        </div>

                    </div>
                </div> : ""}
            <EditProfile isEdit={isEdit} profileUserData={profileUserData} cancelEdit={cancelEdit} />
        </div>
    )
}

export default ProfileInfo