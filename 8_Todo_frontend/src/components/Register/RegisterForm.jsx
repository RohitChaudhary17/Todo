import React from 'react';
import styles from './RegisterForm.module.css';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
      username: e.target.name.value,
      email: e.target.email.value,
      password : e.target.password.value
     }
     let res
   try {
    res = await axios.post('/api/v1/auth/register', user)
      toast.success('Registration successful')
      navigate('/login')
      
   } catch (error) {
    toast.error('Registration failed')
   }
  };

  return (
    <div className={styles.register_form_container}>
      <form className={styles.register_form} onSubmit={handleSubmit}>
        <h2 className={styles.form_title}>Register</h2>


        <div className={styles.form_group}>
          <label htmlFor="name" className={styles.form_label}>
            Name
          </label>   
          <input
            type="name"
            name='name'
            placeholder='name'
            id="name"
            className={styles.form_input}           
            required
          />
        </div>


        <div className={styles.form_group}>
          <label htmlFor="username" className={styles.form_label}>
            Username
          </label>
          <input
            type="text"
            name='username'
            placeholder='username'
            id="username"
            className={styles.form_input}            
            required
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="email" className={styles.form_label}>
            Email
          </label>
          <input
            type="email"
            name='email'
            placeholder='email'
            id="email"
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
            name='password'
            placeholder='password'
            id="password"
            className={styles.form_input}
            required
          />
        </div>

        <button type="submit" className={styles.submit_button}>
          Register
        </button>


        <div className={styles.singin_div}>
          <Link to='/login' >Login</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;

