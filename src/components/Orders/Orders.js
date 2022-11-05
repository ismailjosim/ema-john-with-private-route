import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import CartItems from '../CartItems/CartItems';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import './Orders.css'


const Orders = () => {
    // 01. Destructure Products and initialCart from "ProductAndCartLoader.js"
    const { initialCart } = useLoaderData();

    // Clear cart button
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // 02. Create State and Set initialCart As initial Value.
    const [cart, setCart] = useState(initialCart);

    // add btn handle function
    const handleRemoveItem = id => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    return (
        <div className='shop-container'>
            <div className='cart-products'>
                {
                    cart.map(product => <CartItems key={product._id} product={product} handleRemoveItem={handleRemoveItem}></CartItems>)
                }
                {
                    cart.length === 0 && <h2>Your Cart In Empty. <Link to="/shop">Go Shopping First!</Link> </h2>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/checkout'>
                        <button className='btn-cart btn-checkout-order'> Proceed to Checkout</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;

