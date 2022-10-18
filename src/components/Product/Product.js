import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = ({ product, handleAddToCart }) => {
    // const { product, handleAddToCart } = props;
    const {
        img,
        name,
        price,
        ratings,
        seller,
    } = product;
    // const handleAdd = (item) => { console.log(item) }


    return (
        <div className='product-box'>
            <img src={img ? img : 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500'} alt="Product" />
            <h2 className='product-name'>{name}</h2>
            <div>
                <h3 className="product-price">Price: ${price}</h3>
                <p className="product-seller">Manufacturer: {seller}</p>
                <p className="product-ratings">Ratings: {ratings} Star</p>
            </div>
            <button onClick={() => handleAddToCart(product)} className='product-btn'>Add To Cart
                <FontAwesomeIcon className='cart-icon' icon={faCartShopping} />
            </button>
        </div>
    );
};

export default Product;

