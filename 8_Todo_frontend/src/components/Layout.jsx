import React from 'react';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <main className={styles.layout_container}>
      {children}
    </main>
  );
}

export default Layout;

