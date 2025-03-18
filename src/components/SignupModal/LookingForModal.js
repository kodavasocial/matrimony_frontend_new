import React from 'react'
import "./Modal1.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { lookingFor } from '../../Utils/lists';
import { Link } from 'react-router-dom';
const LookingForModal = ({ setModalShow, modalShow, handleLookingFor, selectedId, handleGender }) => {
    return (
        <>
            <Modal
                show={modalShow}
                // onHide={() => setModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='ml-3 mb-3'><Link to="/login">Go back to Login</Link></div>
                    <div className="modal-body">
                        <div className="text my-4">
                            <h6>This Profile is used for</h6>
                        </div>
                        <div className="profile-modal my-4">
                            <ul>
                                {lookingFor.map((item) => {
                                    return (
                                        <li key={item.id} onClick={() => handleLookingFor(item)} style={{ cursor: "pointer", background: selectedId === item.id && "rgb(128, 9, 37)", color: selectedId === item.id && "#FFF" }}><span><i className="fa fa-check-circle" aria-hidden="true" ></i>
                                        </span> {item.looking}</li>
                                    )
                                })}
                            </ul>
                        </div>
                        {selectedId === 1 &&
                            <>
                                <h6 className="my-4">Gender</h6>
                                <div className="profile-modal">
                                    <ul>
                                        <li onClick={() => handleGender("Male")} style={{ cursor: "pointer" }}> <span><i className="fa fa-check-circle" aria-hidden="true"></i>
                                        </span> Male</li>
                                        <li onClick={() => handleGender("Female")} style={{ cursor: "pointer" }}> <span><i className="fa fa-check-circle" aria-hidden="true"></i>
                                        </span> Female</li>
                                    </ul>
                                </div>
                            </>}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LookingForModal