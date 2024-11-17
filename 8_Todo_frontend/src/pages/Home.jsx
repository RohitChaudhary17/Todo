import HomeLayout from '../components/HomeLayout';
import Profile from '../components/Profile/Profile';
import styles from './Home.module.css';

function Home() {
  
  return(
    <HomeLayout>
     <Profile />
    </HomeLayout>
  )
}

export default Home;
