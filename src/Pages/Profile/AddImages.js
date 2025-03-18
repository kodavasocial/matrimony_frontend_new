import React, { useState } from 'react'
import { getLocalStorage } from '../../Utils/LocalStorage';
import { useDispatch } from 'react-redux';
import { getUserImages, uploadImages } from '../../Redux/Actions/ProfileActions';

const AddImages = () => {
    const dispatch = useDispatch();
    const [imageList, setImageList] = useState([]);

    const handleSelectedImages = (event) => {
        const tempArr = [];

        [...event.target.files].forEach(file => {
            tempArr.push({
                data: file,
                url: URL.createObjectURL(file)
            });

            setImageList(tempArr);
        })
    }

    const handleUpload = () => {
        let id = getLocalStorage("user_id")
        const formData = new FormData();
        formData.append('user', id);
        for (const image of imageList) {
            formData.append("uploaded_images", image.data);
        }
        setImageList([])
        dispatch(uploadImages(formData))
        setTimeout(() => {
            dispatch(getUserImages(id))
        }, 2000)
    }

    return (
        <section className="second-section mt-2">
            <div className="auto-container">
                <div className="row">
                    <div className="col-lg-12">
                        <div>
                            <lable className="btn btn-primary liks mr-2">
                                <input className='clikcxs' title="" type="file" id="img" name="img" accept="image/*"
                                    multiple onChange={(event) => handleSelectedImages(event)} value='' />
                                <i class="fa fa-upload mr-2" aria-hidden="true"></i>
                                Upload Image
                            </lable>

                            <button className='btn btn-primary' onClick={handleUpload}>Save</button>
                            <button className='btn btn-primary ml-2' onClick={() => setImageList([])}>Clear</button>
                        </div>
                        <div className='d-flex mt-3'>
                            {imageList?.length > 0 && imageList.map((item, index) => {
                                return <>
                                    <div className='set-logo-images ml-3'>
                                        <img className='set-images mt-2' src={item.url} style={{ width: '100px' }} />
                                        {/* <i class="fa fa-times time-set" aria-hidden="true"></i> */}

                                    </div>
                                </>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddImages