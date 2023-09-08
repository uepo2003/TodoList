import React from 'react';
import { useRecoilState } from 'recoil';
import { Todo, Filter } from './types';
import { todoListState, todoFilterState } from './state';

const Vox = () => {
  const [text, setText] = React.useState('');
  const [error, setError] = React.useState<string | null>(null); 
  const [todos, setTodos] = useRecoilState(todoListState);
  const [filter, setFilter] = useRecoilState(todoFilterState);


  const handleSubmit = () => {
    if (!text) {
    setError("Title cannot be empty.")
    return;}


    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
      checked: false,
      deleted: false,
      createdAt: new Date()
    };

    setTodos([newTodo, ...todos]);
    setText('');
    setError('');
  };

  const handleEdit = (id: number, value: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, value } : todo)));
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, checked } : todo)));
  };

  const handleDelete = (id: number, deleted: boolean) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, deleted } : todo)));
  };

  const handleSort = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.deleted;
      case 'checked':
        return todo.checked && !todo.deleted;
      case 'unchecked':
        return !todo.checked && !todo.deleted;
    }
  });

  return (
    <div>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    <div>
      <select defaultValue="all" onChange={(e) => handleSort(e.target.value as Filter)}>
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">未完了のタスク</option>
      </select>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <input
          type="text"
          value={text}
          disabled={filter === 'checked' || filter === 'deleted'}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="submit"
          value="追加"
          disabled={filter === 'checked' || filter === 'deleted'}
        />
      </form>
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.deleted}
              checked={todo.checked}
              onChange={() => handleCheck(todo.id, !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.deleted}
              value={todo.value}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <span> (作成日: {todo.createdAt.toLocaleDateString()}) </span>
            <button onClick={() => handleDelete(todo.id, !todo.deleted)}>
             削除
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Vox;
