import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  // Fetch user data from the API
  const getProfile = async () => {
    try {
      const { data } = await axios.get('/api/v1/users/get-user');
      setUser(data.data); // Store the complete user object

      
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getProfile();
  }, []);

  // Show a loading message or skeleton while fetching data
  if (!user) {
    return <div>Loading...</div>;
  }

  // console.log('user',user);

  return (
   

      <div className={styles.profile_card}>

      <div className={styles.profile_image}>
        {/* Profile image */}
        <img src={user.profileImg || 'https://via.placeholder.com/300'} alt="Profile" />
      </div>


      <div className={styles.profile_details}>
        <div className={styles.profile_details_inner}>
        {/* Profile Name */}
        <h2 className={styles.profile_name}>{user.name}</h2>
        {/* Profile Username */}
        <p className={styles.profile_username}>@{user.username}</p>
        {/* Profile Email */}
        <p className={styles.profile_email}>{user.email}</p>
        {/* Total Todos (assuming userTodo is an array of todos) */}
        <p className={styles.profile_todos}>Total Todos: {user.userTodo.length}</p>
      </div>
      </div>

      </div>
  );
}

export default Profile;
