import React from 'react';
import { useState, useEffect } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { Link, useLoaderData } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
    // declare state
    const products = useLoaderData();
    // const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    // Load data from json file
    // useEffect(() => {
    //     fetch('products.json')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    // Clear cart button
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // load data from outside(example: local storage, database)
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = []
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }

        }
        setCart(savedCart);
    }, [products])

    // Event Handler
    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exist = cart.find(product => product.id === selectedProduct.id);
        if (!exist) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        } else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist];
        }
        setCart(newCart);
        addToDb(selectedProduct.id);
    }

    return (
        <div className="shop-container">
            <div className="product-section">
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} clearCart={clearCart}>
                    <button className="btn-cart btn-review-order">
                        <Link to="/orders">
                            Review Order<FontAwesomeIcon className='cart-icon' icon={faArrowRight} />
                        </Link>
                    </button>

                </Cart>
            </div>
        </div>
    );
};

export default Shop;
