import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layouts/Main';
import Shop from './components/Shop/Shop';
import Inventory from './components/Inventory/Inventory';
import Orders from './components/Orders/Orders';
import { productAndCartLoader } from './components/Loaders/productsAndCartLoader';
import UserLogin from './components/User-info/UserLogin';
import UserSignup from './components/User-info/UserSignup';
import Checkout from './components/Checkout/Checkout';
import PrivateRoutes from './Routes/PrivateRoutes';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path: '/shop',
          loader: () => fetch('products.json'),
          element: <Shop></Shop>
        },
        {
          path: '/inventory',
          element: <Inventory></Inventory>
        },
        {
          path: '/orders',
          loader: productAndCartLoader,
          element: <Orders></Orders>
        },
        {
          path: '/login',
          element: <UserLogin />
        },
        {
          path: '/signup',
          element: <UserSignup />
        },
        {
          path: '/checkout',
          element: <PrivateRoutes>
            <Checkout />
          </PrivateRoutes>
        }
      ]
    }
  ])

  return (
    <div className="App" >
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

