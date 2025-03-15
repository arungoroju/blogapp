// src/components/BlogList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  // Fetch all posts
  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Delete a post
  const handleDelete = (id) => {
    axios.post(`http://localhost:3000/delete/${id}`)
      .then(response => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '20px' }}>
            <h2>
              <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
                {post.title}
              </Link>
            </h2>
            <p>{post.content}</p>
            <button onClick={() => handleDelete(post.id)} style={{ marginRight: '10px' }}>Delete</button>
            <button>
              <Link to={`/edit/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                Edit
              </Link>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
