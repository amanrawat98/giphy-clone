import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

const AppLayout = () => {
  return (
    <div className='bg-slate-900 text-white min-h-screen'>
      <div className='container px-11 py-4 mx-auto '> 
      <Header />
      <SearchBar />
      </div>
      <main> 
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout;