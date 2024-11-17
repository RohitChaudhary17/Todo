import React, { useEffect, useState } from 'react'
import styles from './ShowTodo.module.css'
import axios from 'axios'
import ShowTodo from './ShowTodo'
import { useNavigate } from 'react-router-dom'

function TodoList() {

  const navigate = useNavigate()
  const [todos, setTodos] = useState([])
  const [isOn , setIsOn] = useState(false)



  const getAllTodos = async () => {
    try {
      const response = await axios.get('/api/v1/todo/get-all-todos')
     setTodos(response.data.todos)
    //  console.log(response.data.todos)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllTodos()
  }, [])

  if(!todos){
    return <div>Loading...</div>
  }

  const handleCardClick = (id) => {
    navigate(`/sub-todo/${id}`); 
 }


 const deleteTodoHandler = (_id) => {
  setTodos((prevTodos) =>
    prevTodos.filter((Todo) => Todo._id !== _id)
  )
 }

 const handleSort = async () => {
  setIsOn(prevState => !prevState);

  if(isOn){
    const data = await axios.get('/api/v1/todo/get-all-todos');
    console.log("isOn true:" , isOn)
    console.log(...todos , data.data.todos) 
    setIsOn(data.data.todos)
  }
  else{
    console.log("isOn false:" , isOn)
    const data =  await axios('api/v1/todo/get-all-todos-sorted')
    console.log(...todos , data.data.todos)
    setIsOn(data.data.todos)
  }



};
 

  return (
    <div className={styles.showtodo_main}>

    {/* <div className={styles.isOnBtn} >
      
      <button onClick={handleSort}>
        {isOn ? 'Unsorted' : 'Sorted'}
      </button>

    </div> */}

   {todos.map((todo ,index) => (
    
    <ShowTodo key={index} todo={todo}  onCardClick={()=> handleCardClick(todo._id)} deleteTodoHandler={deleteTodoHandler} />
    
   ))}
 
    </div>
  )
}

export default TodoList
