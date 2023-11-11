// paymentController.js

const stripe = require('stripe')('sk_test_51LYdhJF0BL68bZ9bfVjm76TFd8cTNgTPZUrMm7DkqxgepAVPqHy93uazjC8D6pEUEABwy9Jw7vnvKlN3xBLUzPHm00t42jtI1V');
const payForPackage = async (req, res) => {
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
      description: 'Package Subscription',
         return_url: 'https://www.google.com', 
    });

    // Do something with the paymentIntent object if needed
    console.log(paymentIntent);

    res.status(200).json({ success: true, email: req.body.token.email});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
};


module.exports = payForPackage;
