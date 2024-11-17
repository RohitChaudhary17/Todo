import './App.css';
import LoginForm from './components/Login/LoginForm';
import PrivateRoutes from './components/PrivateRoutes';
import RegisterForm from './components/Register/RegisterForm';
import Auth from './pages/Auth';
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import EditProfile from './pages/EditProfile';
import Todo from './pages/Todo';
import CreateTodo from './pages/CreateTodo';
import SubTodo from './pages/SubTodo';


const App = () => {


    return (
        <>


            <Toaster
                position='top-right'
                toastOptions={{
                    style: { fontSize: '1.8rem' }
                }}></Toaster>  

            <Routes>
                <Route path='/login' element={<LoginForm />} />
                <Route path='/register' element={<RegisterForm />} />




                {/* secure routes */}
                <Route element={<PrivateRoutes />} >
                    <Route path='/' element={<Home />} />
                    <Route path='/editprofile' element={<EditProfile />} />
                    <Route path='/todo' element={<Todo />} />
                    <Route path='/create-todo' element={<CreateTodo />} />
                    <Route path='/sub-todo/:id' element={<SubTodo />} />
                </Route>


            </Routes>
        </>
    );
};

export default App;
