import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState, TodoItem } from '../state/todoState';

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [filter, setFilter] = useState('all'); 
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null); 

  const filteredTodos = todoList.filter((todo) => {
    switch (filter) {
      case 'completed': return todo.isCompleted;
      case 'uncompleted': return !todo.isCompleted;
      case 'all': return true;
      default: 
        setError("Invalid filter selected.");
        return false;
    }
  });

  const addTodo = () => {
    if (!title.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    const newTodo: TodoItem = {
      id: Date.now(),
      title,
      createdAt: new Date(),
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setTitle('');

  };

  const toggleTodo = (id: number) => {
    if (!todoList.some(todo => todo.id === id)) {
      setError("Invalid todo ID.");
      return;
    }
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    if (!todoList.some(todo => todo.id === id)) {
      setError("Invalid todo ID.");
      return;
    }
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        Filter:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.isCompleted ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <span> (Created at: {todo.createdAt.toLocaleDateString()}) </span>
            <span> (Completed: {todo.isCompleted ? "Yes" : "No"}) </span>

            <button onClick={() => toggleTodo(todo.id)}>
              {todo.isCompleted ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
