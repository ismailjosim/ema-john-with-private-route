import { getStoredCart } from '../../utilities/fakedb';

export const productAndCartLoader = async () => {

    // Step-01: Load Data From JSON File (Get Products)
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    // Step-02: get cart : get data from local store / cart data
    const savedCart = getStoredCart();

    // step - 06: create a Empty array
    const initialCart = []

    // Step-03: Loop over cart data
    for (const id in savedCart) {

        // Step-04: Find the matching Products Using ID
        const addedProduct = products.find(product => product.id === id);
        // console.log(addedProduct);

        // Step -05: check if addedProduct has product or not.(if exist then add product and product quantity.)
        if (addedProduct) {

            // step - 06: create a Empty array and push addedProduct to that ARRAY.
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;

            // push inside ARRAY
            initialCart.push(addedProduct);
        }


    }

    return { products: products, initialCart: initialCart };
}
