import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router';
import { myStore } from '../context/AppContext';

const PublicRoute = () => {
    const { isLoggedIn } = useContext(myStore);

    if(isLoggedIn) {
        return <Navigate to="/" />
    }

  return <Outlet/>
}

export default PublicRoute