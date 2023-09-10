import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
// import TodoList from './components/TodoList';
import TodoList from './components/TodoList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  </React.StrictMode>
);


