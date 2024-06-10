
import './App.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppLayout from './app-layout/app-layout';
import { Children } from 'react';
import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import SingleGif from './pages/single-gif';
import Favourite from './pages/Favourite';
import GifProvider from './context/Context.Gif';



const router = createBrowserRouter ([
  {
    element:<AppLayout />,

    children: [
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/:category',
        element:<Category />
      },
      {
        path:'/search/:query',
        element:<Search /> 
      },
      {
        path:'/:type/:slug',
        element:<SingleGif  />
      },
      {
        path:'/favourites',
        element:<Favourite />
      },
    ]
  },
])


function App() {


  return (
    <>
    <GifProvider>
    <RouterProvider router={router} />
    </GifProvider>
    </>
  )
}

export default App;
