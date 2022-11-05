import React from 'react';
import { useState, useEffect } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


const Shop = () => {
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10)
    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0);

    const pages = Math.ceil(count / size);



    useEffect(() => {
        const url = `http://localhost:5000/products?page=${ page }&size=${ size }`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [page, size])


    // Clear cart button
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // load data from outside(example: local storage, database)
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = []

        const ids = Object.keys(storedCart);
        // to fetch cart data from server
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id]
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })
    }, [products])

    // Event Handler
    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exist = cart.find(product => product._id === selectedProduct._id);
        if (!exist) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        } else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exist.quantity = exist.quantity + 1;
            newCart = [...rest, exist];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className="shop-container">
            <div className="product-section">
                {
                    products?.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    >
                    </Product>)
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
            <div className="pagination">
                <h3>Current Page: {page} and size: {size}</h3>
                <div className='pagination-items'>
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            onClick={() => setPage(number)}
                            className={page === number ? 'activeBtn' : undefined}
                        >
                            {number}
                        </button>)
                    }
                    <select onChange={event => setSize(event.target.value)}>
                        <option value="5">05</option>
                        <option value="10" selected>10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Shop;

