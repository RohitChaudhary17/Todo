import React, { useEffect, useState } from 'react';
import styles from './EditprofileCom.module.css';
import axios from 'axios';
import toast from 'react-hot-toast'

function EditprofileCom() {
  const [user, setUser] = useState(null);

  // Fetch user profile data
  const getProfile = async () => {
    try {
      const { data } = await axios.get('/api/v1/users/get-user');
      setUser(data.data); // Set the user data from the API response
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    getProfile(); // Fetch user data on component mount
  }, []);

  // Handle name change
  const handleNameChange = (e) => {
    setUser((prevUser) => ({ ...prevUser, name: e.target.value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prevUser) => ({ ...prevUser, profileImg: file, imageURL })); // Store file and its URL for preview
    }
  };

  // Handle form submission
  const updateProfile = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('name', user.name); // Append name to the form data
      if (user.profileImg) {
        formData.append('profileImg', user.profileImg); // Append the image file to form data if available
      }

      const response = await axios.patch('/api/v1/users/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure that the request is treated as multipart for file upload
        },
      });

      // Handle the response (e.g., show success message, update state)
      console.log('Profile updated successfully:', response.data);
     toast.success('Profile updated successfully')
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.edit_profile_container}>
      <h2 className={styles.edit_profile_header}>Edit Profile</h2>

      <form className={styles.edit_profile_form} onSubmit={updateProfile}>
        <div className={styles.edit_profile_field}>
          <label htmlFor="name" className={styles.edit_profile_label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={user.name}
            onChange={handleNameChange}
            className={styles.edit_profile_input}
          />
        </div>

        <div className={styles.edit_profile_field}>
          <label htmlFor="profile-image" className={styles.edit_profile_label}>
            Profile Image:
          </label>
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.edit_profile_input}
          />
        </div>

        {user.imageURL && (
          <div className={styles.image_preview_container}>
            <img src={user.imageURL} alt="Profile Preview" className={styles.image_preview} />
          </div>
        )}

        <div className={styles.edit_profile_button_container}>
          <button type="submit" className={styles.edit_profile_button}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditprofileCom;
