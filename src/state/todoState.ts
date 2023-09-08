import { atom } from 'recoil';

export interface TodoItem {
  id: number;
  title: string;
  createdAt: Date;
  isCompleted: boolean;
}

export const todoListState = atom<TodoItem[]>({
  key: 'todoListState',
  default: [],
});
