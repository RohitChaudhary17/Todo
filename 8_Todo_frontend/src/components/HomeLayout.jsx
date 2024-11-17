import React, { useState } from 'react'
import styles from './HomeLayout.module.css'
import Nav from './Nav/Nav';
import SideBar from './Sidebar/SideBar';
import Footer from './Footer/Footer';

function HomeLayout({children}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.home_main}>

      <div className={styles.home_nav}>
      <Nav setIsSidebarOpen={setIsSidebarOpen} />
      </div>
 
      <div className={styles.main_content_area}>

        <SideBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div
          className={`${styles.content_area} ${isSidebarOpen ? styles.sideOpen : styles.sideClose}`}>
          {children}
        </div>

      </div>

      <div className={styles.home_footer}>
      <Footer />
      </div>
      
    </div>
  );
}

export default HomeLayout
