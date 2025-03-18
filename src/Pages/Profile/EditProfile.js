import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { getLocalStorage } from '../../Utils/LocalStorage';
import { useDispatch } from 'react-redux';
import { getProfile, getuser, updateProfileData, updateProfilesData } from '../../Redux/Actions/ProfileActions';
const EditProfile = ({ isEdit, profileUserData, cancelEdit }) => {
    const dispatch = useDispatch()
    const [editProfileData, setEditProfileData] = useState({
        name: "",
        username: "",
        email: "",
        profile_for: "",
        date_of_birth: "",
        religion: "",
        hobbies: "",
        community: "",
        living_in: "",
        mobile_number: "",
        gender: "",
        family_name: "",
        user: +getLocalStorage("user_id"),
    })
    const [startDate, setStartDate] = useState("");
    // const [hobbiesList, setHobbiesList] = useState([])
    // const [hobbies, setHobbies] = useState('')

    const handleEditProfile = (e) => {
        const { name, value } = e.target;
        setEditProfileData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    // const handleHobbies = () => {
    //     if (!!hobbies.length) {
    //         setHobbiesList((prev) => [...prev, hobbies])
    //         setHobbies("")
    //     }
    // }

    useEffect(() => {
        if (profileUserData) {
            // const obj = { ...hobbiesList }

            setEditProfileData({ ...profileUserData, name: profileUserData?.first_name?.charAt(0)?.toUpperCase() + profileUserData?.first_name?.slice(1) + " " + profileUserData?.last_name, date_of_birth: moment(startDate).utc().format('YYYY-MM-DD') })
            setStartDate(moment(profileUserData.date_of_birth).utc()._d)
        }
    }, [profileUserData])

    useEffect(() => {
        setEditProfileData({ ...editProfileData, date_of_birth: moment(startDate).utc().format('YYYY-MM-DD') })
    }, [startDate])

    const handleSaveEditProfileData = () => {
        dispatch(updateProfileData(getLocalStorage("user_id"), editProfileData))
        dispatch(updateProfilesData(getLocalStorage("user_id"), editProfileData))
        cancelEdit();
    }

    return (
        <div>
            {isEdit ?
                <div class="row">
                    <div class="col-lg-4">
                        <div class="info-profile-one">
                            <ul>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            name
                                        </label>
                                        <input type="text" name="name" placeholder="Name" value={editProfileData?.name} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                           <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                        username
                                        </label>
                                        <input type="text" name="username" placeholder="Username" value={editProfileData?.username} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            email
                                        </label>
                                        <input type="text" name="email" placeholder='Email' value={editProfileData?.email} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div> 
                                <div className='profile-edit-two'>
                                <li>
                                        <label>
                                        education
                                        </label>
                                        <select name="education" onChange={(e) => handleEditProfile(e)}>
                                            <option value="associat" selected={editProfileData.education === 'associat' ? 'selected' : ''}>Associate's Degree in Education</option>
                                            <option value="bachelor" selected={editProfileData.education === 'bachelor' ? 'selected' : ''}>Bachelor's Degree in Education (B.Ed., B.A. in Education)</option>
                                            <option value="master" selected={editProfileData.education === 'master' ? 'selected' : ''}>Master's Degree in Education (M.Ed., M.A. in Education)</option>
                                            <option value="doctor" selected={editProfileData.education === 'doctor' ? 'selected' : ''}>Doctorate in Education (Ed.D., Ph.D. in Education)</option>
                                            <option value="teacher" selected={editProfileData.education === 'teacher' ? 'selected' : ''}>Teaching Credential/Certification</option>
                                            <option value="special_certificate" selected={editProfileData.education === 'special_certificate' ? 'selected' : ''}>Specialized Certificates or Endorsements</option>
                                    </select>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                      religion
                                        </label>
                                        <input type="text" name="religion" placeholder='Religion' value={editProfileData.religion} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            hobbies
                                        </label>
                                        <input type="text" name="hobbies" placeholder="Hobbies" value={editProfileData.hobbies} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                            </ul>
                        </div>

                    </div>
                    <div class="col-lg-4">
                        <div class="info-profile-one ">
                            <ul>
                            <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            Community/Caste
                                        </label>
                                        <input type="text" name="community" placeholder='Community' value={editProfileData.community} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            living in
                                        </label>
                                        <input type="text" name="living_in" placeholder='Living In' value={editProfileData.living_in} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            Mobile Number
                                        </label>
                                        <input type="text" name="mobile_number" placeholder='Mobile Number' value={editProfileData.mobile_number} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            Gender
                                        </label>
                                        <select name="gender" onChange={(e) => handleEditProfile(e)}>
                                        <option value="Male" selected={editProfileData.gender === 'Male' ? 'selected' : ''}>Male</option>
                                        <option value="Female" selected={editProfileData.gender === 'Female' ? 'selected' : ''}>Female</option>
                                    </select>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            Family name
                                        </label>
                                        <input type="text" name="family_name" placeholder='Family Name' value={editProfileData.family_name} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                <li>
                                        <label>
                                        Time of Birth
                                        </label>
                                        <input type="datetime-local" value={(()=>{
                                            let now = new Date(editProfileData.time_of_birth);
                                            let year = now.getFullYear();
                                            let month = ('0' + (now.getMonth() + 1)).slice(-2);
                                            let day = ('0' + now.getDate()).slice(-2);
                                            let hours = ('0' + now.getHours()).slice(-2);
                                            let minutes = ('0' + now.getMinutes()).slice(-2);
                                            return `${year}-${month}-${day}T${hours}:${minutes}`;
                                        })()} name="time_of_birth" onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="info-profile-one ">
                            <ul>
                            <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                      caste
                                        </label>
                                        <input type="text" name="caste" value={editProfileData.caste} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                      income
                                        </label>
                                        <input type="text" name="income" value={editProfileData.income} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                        height(cm)
                                        </label>
                                        <input type="text" name="height" value={editProfileData.height} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            marital status
                                        </label>
                                        <select name="marital_status" onChange={(e) => handleEditProfile(e)}>
                                    <option value='Single' selected={editProfileData.marital_status === 'Single' ? 'selected' : ''}>Single</option>
                                    <option value='Widowed' selected={editProfileData.marital_status === 'Widowed' ? 'selected' : ''}>Widowed</option>
                                    <option value='Divorced' selected={editProfileData.marital_status === 'Divorced'  ? 'selected' : ''}>Divorced</option>
                                    <option value='Separated' selected={editProfileData.marital_status === 'Separated'  ? 'selected' : ''}>Separated</option>
                                    <option value='Registered partnership' selected={editProfileData.marital_status === 'Registered partnership'  ? 'selected' : ''}>Registered partnership</option>
                                </select>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                            weight(kg)
                                        </label>
                                        <input type="text" name="weight" value={editProfileData.weight} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                                <div className='profile-edit-two'>
                                    <li>
                                        <label>
                                        occupation
                                        </label>
                                        <input type="text" name="occupation" value={editProfileData.occupation} onChange={(e) => handleEditProfile(e)}></input>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div className='btn-box text-center my-4'>
                        <button className='btn btn-primary mx-2' onClick={handleSaveEditProfileData}>Save</button>
                        <button className='btn btn-secondary mx-2' onClick={() => cancelEdit()}>Cancel</button>
                    </div>
                </div> : ""}
        </div>
    )
}

export default EditProfile