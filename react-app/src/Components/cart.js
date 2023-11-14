import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './cart-context';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
      const navigate = useNavigate();
  const { cart, updateCart } = useContext(CartContext);

  const handleIncrement = (itemId) => {
    updateCart(itemId, 'add');
  };

  const handleDecrement = (itemId) => {
    updateCart(itemId, 'subtract');
  };

  // Calculate the total price
  const totalPrice = Object.values(cart).reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  const handleCheckoutClick = () => {
    // Optionally, you can do some logic before navigating
    // For example, you might want to validate something before allowing the navigation

    // Navigate to the "/checkout" route
    navigate('/checkout', { state: { amount: totalPrice} });
  };
  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {Object.values(cart).map((item) => (
          // Display items with quantity > 0
          item.quantity > 0 && (
            <li key={item.id}>
              <span>{item.name}</span>
              <button onClick={() => handleDecrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item.id)}>+</button>
            </li>
          )
        ))}
      </ul>
      <div>
        <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
      </div>
   

 <button onClick={handleCheckoutClick}>Checkout</button>



    </div>
  );
};

export default CartPage;
