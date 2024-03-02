import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ButtonPrimary from "./ButtonPrimary";
import { Name } from "./CartItem";
import Spinner from "./Spinner";
// import CheckoutForm from "./CheckoutForm";

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1.5rem;
`;

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const CheckOutForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function stripeTokenHandler(token) {
    const paymentData = { token: token.id };

    // Use fetch to send the token ID and any other payment data to your server.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    // Return and display the result of the charge.
    return response.json();
  }

  const handleSubmit = async (e) => {
    // setLoading(true);
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      setError(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token);
    }

    setLoading(false);
  };

  if (loading) return <Spinner />;
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <Name>Card Payment</Name>
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <ButtonPrimary text={"Pay Now"} disabled={!stripe} />
    </CheckoutFormStyles>
  );
};

const CheckOut = () => {
  return (
    <Elements stripe={stripeLib}>
      <CheckOutForm />
    </Elements>
  );
};

export default CheckOut;
