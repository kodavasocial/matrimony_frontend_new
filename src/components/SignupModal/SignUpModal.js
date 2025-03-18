import React from 'react'
import "./Modal1.css"
import Modal from 'react-bootstrap/Modal';
import { countries } from '../../Utils/lists';
import { Link } from 'react-router-dom';

const SignUpModal = ({ religionData, modalShow, handleRegister, communitiesData, familyNameData }) => {
    return (
        <Modal
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header />
            <Modal.Body>
                <div className='ml-3 mb-3'><Link to="/login">Go back to Login</Link></div>
                <div className="contact-form">
                    <div className="col-lg-12 col-md-12 col-sm-6 form-group ">
                        <select className="custom-select-box" name="religion" tabindex="7" required id="" onChange={(e) => handleRegister(e)}>
                            <option value="" disabled selected hidden>Religion</option>
                            {!!religionData?.length && religionData.map((item) => {
                                return (
                                    <option value={item.name} key={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-6 form-group ">
                        <select className="custom-select-box" name="community" tabindex="8" required id="commnity" onChange={(e) => handleRegister(e)}>
                            <option value="" disabled selected hidden>Community</option>
                            {!!communitiesData?.length && communitiesData.map((item) => {
                                return (
                                    <option value={item.name}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-6 form-group ">
                        <select className="custom-select-box" name="family_name" tabindex="9" required id="family_name" onChange={(e) => handleRegister(e)}>
                            <option value="" disabled selected hidden>Family Name</option>
                            {!!familyNameData?.length && familyNameData.map((item) => {
                                return (
                                    <option value={item.name}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-6 form-group ">
                        <select className="custom-select-box" name="living_in" tabindex="10" required id="month" onChange={(e) => handleRegister(e)}>
                            <option value="" disabled selected hidden>Living in</option>
                            {countries.map((item) => {
                                return <option value={item.name} key={item.code}>{item.name}</option>
                            })}
                        </select>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default SignUpModal