import React from 'react';
import styles from './Nav.module.css';
import { IoReorderThreeOutline } from 'react-icons/io5';
import NavProfile from './NavProfile';

function Nav({  setIsSidebarOpen }) {
  return (
    <div className={styles.nav_main}>
      <div className={styles.nav_left}>
        <h2>Taskly</h2>
        {/* Wrap the icon in a button for better accessibility */}
        <button
          className={styles.toggleButton}
          onClick={() => setIsSidebarOpen( (prevState) => !prevState)}
          aria-label="Toggle sidebar"
        >
          <IoReorderThreeOutline />
        </button>
      </div>


      <div className={styles.nav_right}>
        <NavProfile />
      </div>
    </div>
  );
}

export default Nav;
