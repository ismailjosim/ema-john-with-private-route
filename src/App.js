import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './Layouts/Main';
import Shop from './components/Shop/Shop';
import Inventory from './components/Inventory/Inventory';
import About from './components/About/About';
import Orders from './components/Orders/Orders';
import { productAndCartLoader } from './components/Loaders/productsAndCartLoader';



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
          path: '/about/:heroId',
          loader: async ({ params }) => {
            return fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${ params.heroId }`);
          },
          element: <About></About>
        },
        {
          path: '/orders',
          loader: productAndCartLoader,
          element: <Orders></Orders>
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

