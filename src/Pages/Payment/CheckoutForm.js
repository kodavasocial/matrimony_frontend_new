import React, { useState } from 'react';
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { stripePayment } from '../../Redux/Actions/ProfileActions';

const CheckoutForm = ({ props }) => {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const [isPaymentLoading, setPaymentLoading] = useState(false);
    //const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPaymentLoading(true);
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        // use stripe.createToken to get a unique token for the card
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        console.log("token", paymentMethod);
        setPaymentLoading(false);
        if (!error) {
            const formData = new FormData();
            formData.append('token', paymentMethod.id)
            formData.append('amount', props);
            formData.append('currency', 'USD')

            dispatch(stripePayment(formData));
        } else {
            console.log(error);
        }
    };

    return (
        <div style={{ padding: "3rem" }}>
            <div style={{ maxWidth: "500px", margin: "0 auto" }}>
                <form style={{ display: "block", width: "100%" }} onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <CardElement
                            className="card"
                            options={{
                                style: {
                                    base: {
                                        backgroundColor: "white"
                                    }
                                },
                            }}
                        />
                        <button
                            className="pay-button"
                            disabled={isPaymentLoading}
                        >
                            {isPaymentLoading ? "Loading..." : `Pay $${props}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm