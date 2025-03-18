import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './CheckoutForm'; // Assuming your PaymentForm component is in this file

const stripePromise = loadStripe('pk_test_51NfjzOSA1sOBZbZTKvOc1PHFkMYgufgopdqvT1UKkwrlZp7O8rdJQnk7UMPzom20CjPrwuQxqexQKa3oMPqQPoC500C3FrDN6Q');

const PMT = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PMT;
