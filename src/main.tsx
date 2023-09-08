import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RecoilRoot } from 'recoil';
// import TodoList from './components/TodoList';
import Vox from './components/vox';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Vox />
    </RecoilRoot>
  </React.StrictMode>
);


