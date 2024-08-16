import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  //State which holds all the todo items
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    {
      /*
        HTTP GET
      */
    }
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          "https://66ae31b1b18f3614e3b70353.mockapi.io/todoData"
        );
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  //HTTP POST
  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(
        "https://66ae31b1b18f3614e3b70353.mockapi.io/todoData",
        newTodo
      );
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //HTTP POST / PUT
  const updateTodo = async (id, updatedTodo) => {
    try {
      await axios.put(
        `https://66ae31b1b18f3614e3b70353.mockapi.io/todoData/${id}`,
        updatedTodo
      );
      {
        /*If there are properties with the same keys in both todo and updatedTodo,
          the properties in updatedTodo will overwrite those in todo. This is because
          the spread operator { ...updatedTodo } comes after { ...todo }, so properties
          in updatedTodo will take precedence. 
        */
      }
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  //HTTP DELETE
  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://66ae31b1b18f3614e3b70353.mockapi.io/todoData/${id}`
      );
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
