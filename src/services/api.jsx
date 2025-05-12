import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/learningBlog/v1", timeout: 30000, httpAgent: false});

export const listPosts = async (data = {}) => {
    try {
      const response = await apiClient.post('/posts/getPosts', data); 
      return response.data;
    } catch (error) {
      return { 
        error: true, 
        message: error.response?.data?.message || error.message 
      }
    }
  }

    export const getPostById = async (id) => {
    try {
      const response = await apiClient.get(`/posts/getPostById/${id}`)
      return response.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
      }
    }
  }

  export const addComment = async (pid, { autor, contenido }) => {
    try {
      const response = await apiClient.post(
        `/comments/addComments/${pid}`,
        { autor, contenido }
      );
      return response.data;
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.message || error.message,
      };
    }
  };