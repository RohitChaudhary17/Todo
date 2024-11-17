import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import LoginForm from '../components/Login/LoginForm'
import RegisterForm from '../components/Register/RegisterForm'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function Auth() {

  const {auth} = useAuth()
 const navigate =  useNavigate()

useEffect(()=>{

  if(auth){
    navigate('/')
  }

},[auth])

  return (
    <Layout>
      {/* <LoginForm /> */}
      <RegisterForm />
    </Layout>
  )
}

export default Auth
