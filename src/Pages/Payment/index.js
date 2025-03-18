import { useParams } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './Payment.css';
import Layout from "../../Layout";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const stripePromise = loadStripe('pk_test_51NfjzOSA1sOBZbZTKvOc1PHFkMYgufgopdqvT1UKkwrlZp7O8rdJQnk7UMPzom20CjPrwuQxqexQKa3oMPqQPoC500C3FrDN6Q');
    const { id } = useParams();

    const options = {
        mode: 'payment',
        amount: Number(id),
        currency: 'usd',
        appearance: {
        },
    };

    return (
        <Layout>
            <section className="cards-wrapper">
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm props={id} />
                </Elements>
            </section>
        </Layout>
    )
}
export default Payment