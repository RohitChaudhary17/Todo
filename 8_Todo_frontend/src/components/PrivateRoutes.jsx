import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function PrivateRoutes() {

  const {auth} = useAuth()

  if(auth == undefined) return 'loading...'


  return auth ? <Outlet /> : <Navigate to='/login' />


}

export default PrivateRoutes
