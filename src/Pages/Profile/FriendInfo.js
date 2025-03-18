import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../../Utils/LocalStorage';
import { useDispatch } from 'react-redux';
import { getCustomSearchProfile } from '../../Redux/Actions/ProfileActions';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Utils/ApiUrl';

const FriendInfo = ({ likedUserList }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goToProfile = (value) => {
        let id = getLocalStorage("user_id")
        const quary = `?user_id=${id}&custom_id=${value.custom_id}`
        dispatch(getCustomSearchProfile(quary));
        setTimeout(() => {
            navigate("/user-profile")
        }, 800)
    }

    return (
        <>
            <div className='m-4'>
                {likedUserList?.subscription_name != 'Diamond' && <div>
                    Please upgrade your premium to show the likes user list
                </div>
                }
            </div>
            <ul>
                {likedUserList?.subscription_name == 'Diamond' && likedUserList?.liked_users?.length > 0 && likedUserList.liked_users.map((item, index) => {
                    return (
                        <>
                            <li key={index}>
                                <div className="third-image-content d-flex pb-3 pointer" onClick={() => goToProfile(item)}>
                                    <div className="third-image">
                                        <img src={item?.image_url ? baseUrl + item?.image_url :
                                            "/assets/images/background/bg.jpg"} alt="user_image" />
                                    </div>
                                    <div className="third-content">
                                        <h5>{item.first_name} {item.last_name}</h5>
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                })
                }
            </ul>
        </>
    )
}

export default FriendInfo