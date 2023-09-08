import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import TodoList from './TodoList';
import { RecoilRoot } from 'recoil';
import '@testing-library/jest-dom';

describe('<TodoList />', () => {
  const setup = () => {
    render(
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    );
    const inputElement = screen.getByPlaceholderText('Add new todo');
    const addButton = screen.getByText('Add');
    return { inputElement, addButton };
  };
 
  test('should add a TODO item', () => {
    const { inputElement, addButton } = setup();

    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test Todo')).not.toBeNull();
    afterEach(cleanup);
  });

  test('should delete a TODO item', () => {
    const { inputElement, addButton } = setup();

    fireEvent.change(inputElement, { target: { value: 'Test' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test')).toBeNull();
    afterEach(cleanup);
  });

  test('should mark a TODO item as complete', () => {
    const { inputElement, addButton } = setup();

    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    const completeButton = screen.getByText('Complete');
    fireEvent.click(completeButton);

    expect(screen.getByText('Test Todo')).not.toBeNull();
    afterEach(cleanup);
  });

  test('should filter completed tasks', () => {
    const { inputElement, addButton } = setup();

    fireEvent.change(inputElement, { target: { value: 'Test Todo 1' } });
    fireEvent.click(addButton);

    fireEvent.change(inputElement, { target: { value: 'Test Todo 2' } });
    fireEvent.click(addButton);

    const completeButton = screen.getByText('Complete');
    fireEvent.click(completeButton);

    const selectElement = screen.getByText('Filter:').nextSibling as HTMLElement;
    fireEvent.change(selectElement, { target: { value: 'completed' } });

    expect(screen.getByText('Test Todo 1')).not.toBeNull();
    expect(screen.queryByText('Test Todo 2')).toBeNull();
  });
});
