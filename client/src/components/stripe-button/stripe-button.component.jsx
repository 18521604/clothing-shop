import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/4.4 crown.svg.svg';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JHiSgB3iwU7ej2AJKkxbxRlDAomjUzNvr5jfRb2OW33166ZkTe0PwQjlf4C5Yy7lZRkIvZiAh37BHf8nz3ZpMtS00GV1TPU5L';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert('Payment successful');
        }).catch(error => {
            console.log("Payment error: ", JSON.parse(error));
            alert("There was an issue with your payment. Please sure you use the provided credit cart.");
        })
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image={logo}
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;