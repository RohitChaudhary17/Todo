import React from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import Link for navigation
import styles from './SideBar.module.css';
import axios from 'axios'
import toast from 'react-hot-toast'


function SideBar({ isSidebarOpen }) {

 const navigate =  useNavigate()

  const handleLogoutClick = async () => {
  
   try {
     await axios.get('/api/v1/auth/logout')
    toast.success(`Logout successfully`)
     navigate('/login');
   } catch (error) {
    
   }
  };



  return (
    <div className={`${styles.sidebar_main} ${isSidebarOpen ? styles.open : styles.closed}`}>
     
      <div className={styles.sidebar_item_div}>
      <Link to="/" className={styles.sidebar_item}>Home</Link>
      <Link to="/editprofile" className={styles.sidebar_item}>Edit Profile</Link>
      <Link to="/todo" className={styles.sidebar_item}>My Todos</Link>
      <Link to="/create-todo" className={styles.sidebar_item}>Create Todo</Link>
      </div>

      <div className={styles.logout}>
        <button type='button' onClick={handleLogoutClick} >Logout</button>
      </div>

    </div>
  );
}

export default SideBar;
