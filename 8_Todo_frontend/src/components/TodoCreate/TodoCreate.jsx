import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import styles from './TodoCreate.module.css';
import { useNavigate } from 'react-router-dom';

function TodoCreate() {
  const [todoHead, setTodoHead] = useState('');
  const [color, setColor] = useState('');
  const [todoImg, setTodoImg] = useState(null);  // Store the image file here
  const [imgPreview, setImgPreview] = useState(null);  // Store image preview (base64)
  const [loading, setLoading] = useState(false);  // For loading state
  const navigate  = useNavigate()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading indicator

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('todoHead', todoHead);
    formData.append('color', color);
    if (todoImg) {
      formData.append('todoImg', todoImg); // Append the selected image file
    }

    try {
      // Make the API request to your backend using Axios
      const response = await axios.post('/api/v1/todo/create-main-todo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // This is important for file uploads
        },
      });

      // Handle successful response
      console.log('Todo created successfully:', response.data);
      setLoading(false); // Hide loading indicator

      // Optionally reset the form or show a success message
      setTodoHead('');
      setColor('');
      setTodoImg(null);
      setImgPreview(null);

      navigate('/todo')

    } catch (error) {
      setLoading(false); // Hide loading indicator on error
      console.error('Error during todo creation:', error.response?.data || error.message);
      // Optionally show an error message to the user
    }
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTodoImg(file);  // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);  // Set the image preview (base64 string)
      };
      reader.readAsDataURL(file);  // Read the image file as base64 for preview
    }
  };

  return (
    <div className={styles.todo_create}>
      <h2 className={styles.todo_create__title}>Create a New Todo</h2>

      <form onSubmit={handleSubmit} className={styles.todo_create__form}>
        <div className={styles.todo_create__field}>
          <label htmlFor="todoHead" className={styles.todo_create__label}>Todo Title</label>
          <input
            type="text"
            id="todoHead"
            value={todoHead}
            onChange={(e) => setTodoHead(e.target.value)}
            placeholder="Enter todo title"
            className={styles.todo_create__input}
            required
          />
        </div>

        <div className={styles.todo_create__field}>
          <label htmlFor="color" className={styles.todo_create__label}>Todo Color</label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.todo_create__input_color}
          />
        </div>

        <div className={styles.todo_create__field}>
          <label htmlFor="todoImg" className={styles.todo_create__label}>Choose an Image</label>
          <input
            type="file"
            id="todoImg"
            onChange={handleImageChange}
            accept="image/*"
            className={styles.todo_create__input_file}
          />
        </div>

        {imgPreview && (
          <div className={styles.todo_create__image_preview}>
            <img src={imgPreview} alt="Todo preview" className={styles.todo_create__image} />
          </div>
        )}

        <button type="submit" className={styles.todo_create__submit_button} disabled={loading}>
          {loading ? 'Creating...' : 'Create Todo'}
        </button>
      </form>
    </div>
  );
}

export default TodoCreate;
