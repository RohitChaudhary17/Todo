import React from 'react'
import styles from './ShowTodo.module.css'
import moment from 'moment'
import axios from 'axios'
import toast from 'react-hot-toast'

function ShowTodo({ todo ,onCardClick , deleteTodoHandler }) {

  const deleteTodo = async () => {

 try {
   await axios.delete(`/api/v1/todo/${todo._id}`)
   toast.success('Todo deleted successful')

   deleteTodoHandler(todo._id)
 } catch (error) {
   toast.error(error?.message)
 }
   
  }

  return (


    <div className={styles.todo_card_main}  >

      {/* <div className={styles.todo_checkbox}>
        <input type="checkbox" disabled checked={todo.TodosCompleted} />
      </div> */}


      <div className={styles.todo_lower} style={{ border: `2px solid ${todo.color}`}} onClick={onCardClick} >

        <div className={styles.todo_img}>
          <img src={todo.todoImg} />
        </div>

        <div className={styles.todo_text}>

          <div className={styles.todo_head}>
            <h2>{todo.todoHead}</h2>
          </div>

          <div className={styles.subTodo_count}>
            <h4>SubTodo Count : <span>{todo.subTodos.length}</span></h4>
          </div>

          <div className={styles.subTodo_createdAt}>
            <p>createdAt : {moment(todo.createdAt).format('Do MMM YYYY')}</p><br/>
          </div>

        </div>

      </div>

      <div className={styles.deleteTodoBtn}>
    <button onClick={deleteTodo} >Delete</button>
   </div>

    </div>


  )
}

export default ShowTodo
