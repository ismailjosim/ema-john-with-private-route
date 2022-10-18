import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './CartItems.css'


const CartItems = ({ product, handleRemoveItem }) => {
    const { id, img, name, price, quantity } = product;
    return (
        <div className='single-product'>
            <div className='product-image'>
                <img src={img} alt="" />
            </div>
            <div className='product-details'>
                <h3 className='product-title'>{name.length > 25 ? name.slice(0, 20) + "..." : name}</h3>
                <p className='product-price'>
                    Price: <strong>${price}</strong>
                </p>
                <p className="quantity">
                    Quantity: <strong>{quantity}</strong>
                </p>
            </div>
            <div>
                <button onClick={() => handleRemoveItem(id)} className='product-icon'><FontAwesomeIcon className='cart-icon' icon={faTrashCan} /></button>
            </div>


        </div>
    );
};

export default CartItems;
