import React, { useState, useEffect } from "react";
import "./todo.css"

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage();
    updateItemsLeftCount();
    updateClearCompletedVisibility();
  }, [todos]);

  const saveTodosToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const themeToggler = () => {
    document.body.classList.toggle("dark-theme-variables");
    const isDarkMode = document.body.classList.contains("dark-theme-variables");
    window.localStorage.setItem("dark-mode", isDarkMode);
  };

  const addTodoItem = () => {
    if (newTodoText.trim() !== "") {
      const newTodo = { text: newTodoText, completed: false };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  const toggleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const removeTodoItem = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const updateItemsLeftCount = () => {};

  const updateClearCompletedVisibility = () => {};

  const clearCompletedItems = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  return (
    <div
      className={`todo-app ${
        document.body.classList.contains("dark-theme-variables")
          ? "dark-theme-variables"
          : ""
      }`}
    >
      <div className="main-container">
        <header>
          <div className="head">
            <span className="header-name"></span>
            <button onClick={themeToggler} className="daynight-btn"></button>
          </div>
        </header>
        <div className="inp-card">
          <input
            type="text"
            placeholder="Create a new todo…"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && addTodoItem()}
            id="inp"
          />
          <div className="todo-items">
            {todos.map((todo, index) => (
              <div
                className={`item ${todo.completed ? "completed" : ""}`}
                key={index}
              >
                <input
                  type="button"
                  onClick={() => toggleTodoCompletion(index)}
                />
                <span id="heading">{todo.text}</span>
                <button
                  id="remove-btn"
                  onClick={() => removeTodoItem(index)}
                ></button>
              </div>
            ))}
          </div>
          <div className="item-footer">
            <h5>{todos.filter((todo) => !todo.completed).length} items left</h5>
            <div className="features-desctop">
              <a href="#">All</a>
              <a href="#">Active</a>
              <a href="#">Completed</a>
            </div>
            <a id="clear" href="#" onClick={clearCompletedItems}>
              Clear Completed
            </a>
          </div>
        </div>
        <div className="features">
          <a href="#">All</a>
          <a href="#">Active</a>
          <a href="#">Completed</a>
        </div>
        <footer>
          <div className="footer">
            <span>Drag and drop to reorder list</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TodoApp;
