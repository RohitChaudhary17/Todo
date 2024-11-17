import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';  
import axios from 'axios';
import ShowSubTodo from './ShowSubTodo';
import styles from './SubTodo.module.css';
import toast from 'react-hot-toast'
import { MdArrowBack } from 'react-icons/md';

function SubTodoList() {
 
  const { id } = useParams();  
  const [subTodos, setSubTodos] = useState([]);
  const [isClicked, setIsClicked] = useState(false);


  const [subTodoData , setSubTodoData] = useState({
    subTodoHead:"",
    dueDate:"",
    description:"",
  })

 
  const getSubTodo = async () => {
    try {
      const { data } = await axios.get(`/api/v1/subtodo/${id}`); 
      console.log(data.data); 
      setSubTodos(data.data);
    } catch (error) {
      console.error('Error fetching sub-todos:', error);
    }
  };

  
  useEffect(() => {
    if (id) { 
      getSubTodo(); 
    }
  }, [id]); 


  const collectSubTodoData = (e) => {
    setSubTodoData({...subTodoData, [e.target.name]: e.target.value });
  }

  const createSubTodo = async (e) => {
    e.preventDefault();
    console.log(subTodoData)

   try {
     await axios.post(`/api/v1/subtodo/${id}` , subTodoData)
     toast.success('subtod is created successfully')
     setIsClicked((prev) => !prev)
     setSubTodos((prevSubTodos) => [...prevSubTodos, subTodoData]);


  } catch (error) {
    toast.error(error)
  }
  }


  const deleteSubTodoHandler = (subTodoId) => {
    setSubTodos((prevSubTodos) =>
      prevSubTodos.filter((subTodo) => subTodo.subTodoId !== subTodoId)
    );
  };




  if (!subTodos) {
    return 'loading..';
  }



  return (
    <div className={styles.subTodo_main}>

<div className={styles.back}>
  <Link  to='/todo' className={styles.back_inner} >
    <MdArrowBack /> 
    <span>back</span>
    </Link>
  </div>

      <div className={styles.create_subTodo_main}>
        <button onClick={() => setIsClicked(prev => !prev) }>create subTodo</button>
      </div>

      
      
      
      {
        isClicked ? (
          <div className={styles.form_card}>
            <h2 className={styles.form_card__title}>Task Due Date</h2>
            
            <form className={styles.form_card__form} onSubmit={createSubTodo}>
              
              <div className={styles.form_card__field}>
                <label htmlFor="subTodoHead" className={styles.form_card__label}>Task Title</label>
                <input
                  type="text"
                  id="subTodoHead"
                  name="subTodoHead"
                  value={subTodoData.subTodoHead}
                  className={styles.form_card__input}
                  onChange={collectSubTodoData}
                  required
                />
              </div>

              <div className={styles.form_card__field}>
                <label htmlFor="description" className={styles.form_card__label}>description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={subTodoData.description}
                  className={styles.form_card__input}
                  onChange={collectSubTodoData}
                  required
                />
              </div>

              <div className={styles.form_card__field}>
                <label htmlFor="dueDate" className={styles.form_card__label}>Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={subTodoData.dueDate}
                  className={styles.form_card__input}
                  onChange={collectSubTodoData}
                  required
                />
              </div>
              <button type="submit" className={styles.form_card__submit}>Submit</button>
            </form>

          </div>
        ) : null
      }







      <div className={styles.card_main_inner}>
     
        {subTodos.map((subTodo, ind) => (
          <ShowSubTodo subTodo={subTodo} key={ind} deleteSubTodoHandler={deleteSubTodoHandler} />
        ))}
      </div>
    </div>
  );

}

export default SubTodoList;

