import axios from "axios";

// Base URL: fallback to local if no environment variable
const API_BASE_URL = process.env.REACT_APP_API_URL || 
    "https://xctvrrw0s1.execute-api.us-east-1.amazonaws.com/default/backend-python";

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Centralized error handler
const handleError = (error) => {
  console.error("API Error:", error?.response?.data || error.message);
  throw error;
};

// API calls
export const getTodos = async () => {
  try {
    const response = await apiClient.get("/todos");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const addTodo = async (title, description) => {
  try {
    const response = await apiClient.post(
      "/todos",
      new URLSearchParams({ title, description })
    );
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const toggleTodo = async (id) => {
  try {
    const response = await apiClient.put(`/todos/${id}/toggle`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await apiClient.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
