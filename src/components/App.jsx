import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (todoText.trim() !== "") {
      const currentDate = new Date().toLocaleString();
      const newTodo = { text: todoText, completed: false, date: currentDate };
      setTodos([...todos, newTodo]);
      setTodoText("");
    }
  };

  const toggleTodoCompleted = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const editedText = prompt("Edit todo:", todos[index].text);
    if (editedText !== null) {
      const updatedTodos = [...todos];
      updatedTodos[index].text = editedText;
      setTodos(updatedTodos);
    }
  };

  const searchTodo = () => {
    if (searchText.trim() !== "") {
      const searchResults = todos.filter((todo) =>
        todo.text.toLowerCase().includes(searchText.toLowerCase())
      );
      return searchResults;
    } else {
      return todos;
    }
  };

  return (
    <div className="todo-app">
      <header className="header">
        <h1>ToDo List - App</h1>
      </header>
      <form className="input-section" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add Task..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button type="submit" className="add">
          <i className="fas fa-plus"></i>
        </button>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="button" onClick={searchTodo}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="todos">
        <ul className="todo-list">
          {searchTodo().map((todo, index) => (
            <li key={index} className="li">
              <input
                type="checkbox"
                className="form-check-input"
                checked={todo.completed}
                onChange={() => toggleTodoCompleted(index)}
              />
              <span className="todo-text">
                {todo.text}
              </span>
              <span className="todo-date">{todo.date}</span>
              <span className="span-button" onClick={() => deleteTodo(index)}>
                <i className="fas fa-trash"></i>
              </span>
              <span
                className="span-button"
                onClick={() => handleEditTodo(index)}
              >
                <i className="fas fa-pen"></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
