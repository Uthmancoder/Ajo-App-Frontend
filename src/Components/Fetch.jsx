import React, { useState } from 'react';
import axios from 'axios';

const Fetch = () => {
  const [paymentLink, setPaymentLink] = useState('');

  const initiatePayment = async () => {
    try {
      const response = await axios.post(
        'https://api.flutterwave.com/v3/charges?type=card',
        {
          tx_ref: 'your_transaction_reference',
          amount: 1000,
          currency: 'NGN',
          redirect_url: 'https://yourapp.com/redirect-url',
          payment_type: 'card',
          // Add other required parameters
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_SECRET_KEY',
          },
        }
      );

      setPaymentLink(response.data.data.link);
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div>
      <button onClick={initiatePayment}>Initiate Payment</button>
      {paymentLink && <a href={paymentLink}>Click here to complete payment</a>}
    </div>
  );
};

export default Fetch;
