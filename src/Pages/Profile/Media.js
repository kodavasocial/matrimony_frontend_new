import { React, useState } from 'react'
import { useSelector } from 'react-redux'
import { baseUrl } from '../../Utils/ApiUrl'
import AddImages from './AddImages'
import { getLocalStorage } from "./../../Utils/LocalStorage";
import { useDispatch } from 'react-redux';
import { deletePictures, getUserImages } from '../../Redux/Actions/ProfileActions';


const Media = () => {
    const data = useSelector(state => state)
    const { Profile: { userImagesList } } = data
    const [isEdit, setIsEdit] = useState(false)
    const [isCancel, setIsCancel] = useState(false)
    const dispatch = useDispatch()
    const deletePicture = (e) => {
        e.target.textContent = 'Deleting...';
        e.target.setAttribute('disabled', true);
        let user_id = getLocalStorage("user_id");
        let pic_id = e.target.getAttribute('data-id');
        dispatch(deletePictures(user_id, pic_id));
        setTimeout(() => {
            dispatch(getUserImages(user_id));
        }, 1500)
        setTimeout(() => {
            e.target.textContent = 'Delete';
            e.target.removeAttribute('disabled');
        }, 2300)
    }
    return (
        <section className="second-section">

            <div className="auto-container">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <AddImages />
                        </div>
                        {userImagesList?.length > 0 ?
                            <div className="media-content-images">
                                <h3 className="mt-3">All Images</h3>
                                {isCancel ? <button className='btn btn-danger' onClick={() => {
                                    setIsEdit(false)
                                    setIsCancel(false)
                                }}>Cancel</button>
                                    :
                                    <button className='btn btn-danger' onClick={() => {
                                        setIsEdit(true)
                                        setIsCancel(true)
                                    }}>Edit</button>
                                }
                                <ul>
                                    {userImagesList?.length > 0 && userImagesList?.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                {isEdit ?
                                                    <>
                                                        <img className="media-content-img mt-4" src={item?.image ? baseUrl + item?.image :
                                                            "/assets/images/background/bg.jpg"} alt="user_image" />
                                                        <button className='btn btn-danger' data-id={item.id ? item.id : ''} onClick={deletePicture}>Delete</button>
                                                    </>
                                                    :
                                                    <img className="media-content-img mt-4" src={item?.image ? baseUrl + item?.image :
                                                        "/assets/images/background/bg.jpg"} alt="user_image" />}
                                            </li>
                                        )
                                    })
                                    }
                                </ul>
                            </div> :
                            <div className="media-content-images">
                                <h3 className="mt-3">No Images</h3>
                            </div>
                        }
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Media