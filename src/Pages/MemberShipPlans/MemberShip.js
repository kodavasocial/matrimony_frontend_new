import React, { useEffect, useState } from 'react';
import Layout from '../../Layout';
import "./MemberShipPlans.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getsubscription } from '../../Redux/Actions/ProfileActions';
import Modal from 'react-modal';
import axios from 'axios';
import { Api } from '../../Utils/ApiUrl';


const MemberShip = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profileState = useSelector((state) => state.Profile);
    const { subsriptionRes } = profileState;
    const [membershipList, setMembershipList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMembership, setSelectedMembership] = useState(null);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [error, setError] = useState('');
    const [discountPer, setDiscoungPer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        try {
            const addons = selectedAddons.map((add)=>(add.id));
            let addons_ids = "";
            for (let add of addons){
                addons_ids += `${add},`;
            }
            addons_ids = `[${addons_ids.slice(0, addons_ids.length - 1)}]`;
            setIsLoading(true);
            const response = await axios.post(Api.paymentURLAPI, {
                subscription_id: selectedMembership.id,
                price: discountedPrice || totalPrice,
                addons: addons_ids,
                coupon: couponCode ? couponCode : "",
            });
            // return

            if (!response?.data?.redirect_url){
                alert('Something went wrong');
            }
            else{
                window.location.href = response?.data?.redirect_url;
            }

        } catch (error) {
            alert('Something went wrong');
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleUpgradeClick = (item) => {
        setSelectedMembership(item);
        setSelectedAddons([]);
        setTotalPrice(parseFloat(item.price));
        setDiscountedPrice(null);
        setCouponCode('');
        setError('');
        setIsModalOpen(true);
    };

    const handleAddonChange = (addon, isChecked) => {
        if (isChecked) {
            setSelectedAddons((prev) => [...prev, addon]);
            setTotalPrice((prev) => prev + parseFloat(addon.price));
        } else {
            setSelectedAddons((prev) => prev.filter((a) => a.id !== addon.id));
            setTotalPrice((prev) => prev - parseFloat(addon.price));
        }
        setDiscountedPrice(null);
    };

    const handleApplyCoupon = async () => {
        if (!couponCode) {
            setError('Please enter a coupon code.');
            return;
        }

        try {
            const response = await axios.post(Api.couponApplyAPI, {
                subscription_id: selectedMembership.id,
                coupon_code: couponCode,
                addons: selectedAddons.map((addon) => addon.id),
            });

            const { final_total_price, discount } = response.data;
            setDiscoungPer(discount);
            setDiscountedPrice(final_total_price);
            setError('');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Failed to apply coupon.');
            } else {
                setError('Network error. Please try again.');
            }
            setDiscountedPrice(null);
        }
    };

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMembership(null);
        setSelectedAddons([]);
        setTotalPrice(0);
        setCouponCode('');
        setDiscountedPrice(null);
        setError('');
    };

    useEffect(() => {
        dispatch(getsubscription());
    }, []);

    useEffect(() => {
        setMembershipList(subsriptionRes);
    }, [subsriptionRes]);

    return (
        <Layout>
            <section className="cards-wrapper">
                <div className="container">
                    <div className="row">
                        {membershipList && membershipList.map((item, index) => (
                            <div key={index} className="col-md-6 col-lg-3 col-xl-3 col-sm-12">
                                <div className="card-one-silver">
                                    <h4>{item.name}</h4>
                                    <h5>Rs.{item.price} / month</h5>
                                    <div className="border-line"></div>
                                    <div className="inner-list">
                                        <p>Messages: {item.messages}</p>
                                        <p>Calls: {item.calls}</p>
                                    </div>
                                    <div className="last-button">
                                        <button 
                                            type="button" 
                                            onClick={() => handleUpgradeClick(item)} 
                                            disabled={item.is_purchased}
                                        >
                                            {item.is_purchased ? "Already Purchased" : "Upgrade"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="custom-loader"></div>
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                {selectedMembership && (
                    <div className="modal-content" style={{ padding: "20px" }}>
                        <h2 style={{margin: 0}}>{selectedMembership.name}</h2>
                        <h4>Base Price: Rs.{selectedMembership.price} / month</h4>
                        <h5>Add-ons:</h5>
                        <ul>
                            {selectedMembership.addons.map((addon) => (
                                <li key={addon.id}>
                                    <label style={{display: 'flex', gap: '10px'}}>
                                        <input
                                            type="checkbox"
                                            onChange={(e) => handleAddonChange(addon, e.target.checked)}
                                        />
                                        {` Messages: ${addon.messages}, Calls: ${addon.calls}, Price: Rs.${addon.price}`}
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <h4 style={{margin: '4px 0'}}>Total Price: Rs.{totalPrice.toFixed(2)}</h4>

                        <div style={{margin: '10px 0'}}>
                            <input
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                style={{ marginRight: "10px" }}
                            />
                            <button onClick={handleApplyCoupon} className="apply-button">
                                Apply Coupon
                            </button>
                        </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                        {discountedPrice !== null && (
                            <h4 style={{margin: '10px 0', fontSize: '22px'}}>Discounted Price: Rs.{discountedPrice.toFixed(2)} ({discountPer + '% off'})</h4>
                        )}

                        <div className="modal-actions">
                            {!selectedMembership.is_purchased ? (
                                <button
                                    className="pay-button"
                                    style={{ backgroundColor: "#890025", margin: "0" }}
                                    onClick={() => handlePayment()}
                                >
                                    Proceed to Payment
                                </button>
                            ) : (
                                <button className="close-button" disabled>
                                    Already Purchased
                                </button>
                            )}
                            <button className="close-button" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default MemberShip;
