// src/components/EditPost.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '' });

  // Fetch existing post data
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/update/${postId}`, post)
      .then(response => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            name="title" 
            value={post.title} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <label>
          Content:
          <textarea 
            name="content" 
            value={post.content} 
            onChange={handleChange} 
            required 
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
