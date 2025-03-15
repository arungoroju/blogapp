// src/components/BlogPost.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  // Fetch individual post data
  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${postId}`)
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
