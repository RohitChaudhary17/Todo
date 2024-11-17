import React from 'react';
import styles from './Nav.module.css'; // Import your CSS module

function NavProfile({ username, avatarUrl }) {


  
  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatar}>
        {/* Avatar Image */}
        <img src={avatarUrl || 'https://via.placeholder.com/100'} alt="Profile Avatar" />
      </div>
      <div className={styles.username}>
        {/* Username */}
        <span>{username || 'Guest'}</span>
      </div>
    </div>
  );
}

export default NavProfile;
