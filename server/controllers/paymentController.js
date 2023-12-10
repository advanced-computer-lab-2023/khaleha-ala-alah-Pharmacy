// paymentController.js

const stripe = require('stripe')('sk_test_51LYdhJF0BL68bZ9bfVjm76TFd8cTNgTPZUrMm7DkqxgepAVPqHy93uazjC8D6pEUEABwy9Jw7vnvKlN3xBLUzPHm00t42jtI1V');
exports.payForPackage = async (req, res) => {
  const { token, amount } = req.body;
  console.log(amount);
  console.log(req.body.token.email);

  try {
    // Step 1: Create a PaymentMethod using the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: token.id,
      },
    });
    // Step 2: Create a PaymentIntent using the PaymentMethod ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true,
      description: 'Buy medicines',
         return_url: 'https://www.google.com', 
    });

    // Do something with the paymentIntent object if needed
     if (paymentIntent.status === 'succeeded') {
      // Payment successful, proceed to place the order
      // You can call your order placement logic here
      console.log('Payment successful');

      // Example: Place order using your order placement logic
      // placeOrder(req.body.token.email, amount);

      res.status(200).json({ success: true, email: req.body.token.email });
    } else {
      // Payment failed or has not been confirmed
      console.log('Payment failed or not confirmed');
      res.status(400).json({ success: false, error: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
};



