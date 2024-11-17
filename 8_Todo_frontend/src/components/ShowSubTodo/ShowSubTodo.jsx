import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SubTodo.module.css';
import moment from 'moment';
import toast from 'react-hot-toast'

const ShowSubTodo = ({ subTodo ,deleteSubTodoHandler }) => {
  const [isUpdateClicked, setUpdateClicked] = useState(false);


  const [subTodoHead, setSubTodoHead] = useState(subTodo.subTodoHead || '');
  const [dueDate, setDueDate] = useState(subTodo.dueDate || '');
  const [description, setDescription] = useState(subTodo.description || '');
  const [isCompleted, setIsCompleted] = useState(subTodo.completed);

 

  const handleUpdateClick = () => {
    setUpdateClicked((prev) => !prev);


    setDueDate(subTodo.dueDate)
    setDescription(subTodo.description)
    setIsCompleted(subTodo.completed)
  };

 



  const saveSubTodo = async (e) => {
    e.preventDefault();

    const updatedSubTodo = {
      ...subTodo,
      dueDate,
      description,
      isCompleted,  
    };

    try {
      const response = await axios.patch(`/api/v1/subtodo/${subTodo.subTodoId}`, updatedSubTodo);
      toast.success('sub-todo updated successfully')
      console.log(subTodo.subTodoId);
      console.log('SubTodo updated successfully:', response.data);
      setUpdateClicked(false);
    } catch (error) {
      console.error('Error updating SubTodo:', error);
    }
  };


  const deleteSubTodo = async () =>{

    try {
       await axios.delete(`/api/v1/subtodo/${subTodo.subTodoId}`)
       toast.success('subtodo deleted sucessfully')

       deleteSubTodoHandler(subTodo.subTodoId);
    } catch (error) {
      toast.error(error?.message)
    }
  }


  



  return (
    <div className={styles.sub_todo}>
      
      {isUpdateClicked ? (
        
        <>
        <form onSubmit={saveSubTodo}>
          <div className={styles.sub_todo__header}>
            <input
              type="checkbox"
              className={styles.sub_todo__checkbox}
              checked={isCompleted} 
              onChange={() => setIsCompleted(prev => (!prev)) } 
            />
            <h3 className={styles.sub_todo__title}>Title: {subTodoHead}</h3>
          </div>

          <textarea
            name="description"
            className={styles.sub_todo__description}
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={styles.sub_todo__due_date}>
            {/* Use moment to format the dueDate to yyyy-MM-dd */}
            <input
              type="date"
              name="dueDate"
              value={dueDate ? moment(dueDate).format('YYYY-MM-DD') : ''}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className={styles.update_button}>
            <button type="submit">Save update</button>
            <button onClick={handleUpdateClick}>Cancel</button>
           
          </div>
        </form>

        <button onClick={deleteSubTodo}>delete</button>
        </>


      ) : (
        <>
       
          <div className={styles.sub_todo__header}>
            <input
              type="checkbox"
              className={styles.sub_todo__checkbox}
              checked={isCompleted} 
              disabled 
            />
            <h3 className={styles.sub_todo__title}>Title: {subTodoHead}</h3>
          </div>

          <p className={styles.sub_todo__description}>{description}</p>
          <div className={styles.sub_todo__due_date}>
            {/* Use moment to format the dueDate */}
            <span>Due Date: {moment(dueDate).format('Do MMM YYYY')}</span>
          </div>

          <button onClick={handleUpdateClick}>Manage</button>
        </>
      )}
    </div>
  );
};

export default ShowSubTodo;
