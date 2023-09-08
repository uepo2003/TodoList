import { atom } from 'recoil';
import { Todo, Filter } from './types';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const todoFilterState = atom<Filter>({
  key: 'todoFilterState',
  default: 'all',
});
