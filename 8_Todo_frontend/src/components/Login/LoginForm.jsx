import React, { useEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const LoginForm = () => {

  const navigate = useNavigate()

  const {auth} = useAuth()
 
 useEffect(()=>{
 
   if(auth){
     navigate('/')
   }
 
 },[auth])
  

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
  
    try {
      const { data } = await axios.post('/api/v1/auth/login', user);
      toast.success('Login successful');
      console.log(data.message); 
      navigate('/'); 
    } catch (error) {       
        toast.error(error.response.data.message);
    }
      
  };
  
  
  



  return (
    <div className={styles.login_form_container}>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <h2 className={styles.login_form_title}>Login</h2>
        
        <div className={styles.form_group}>
          <label htmlFor="username" className={styles.form_label}>
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder='username'
            id="username"
            className={styles.form_input}
            required
          />
        </div>
        
        <div className={styles.form_group}>
          <label htmlFor="password" className={styles.form_label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='password'
            className={styles.form_input}
            required
          />
        </div>
        
        <button type="submit" className={styles.submit_button}>
          Login
        </button>

        <div className={styles.singup_div}>
          <Link to='/register' >Register</Link>
        </div>
      </form>

      
    </div>
  );
};

export default LoginForm;

