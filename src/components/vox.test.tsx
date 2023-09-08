import { describe, test, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup} from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Vox from './vox';
import '@testing-library/jest-dom';

describe('Vox Component', () => {
 
  test('should be able to add a TODO item', () => {
    render(
      <RecoilRoot>
        <Vox />
      </RecoilRoot>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New task' } });

    const addButton = screen.getByText('追加');
    fireEvent.click(addButton);

    const inputElement = screen.getByDisplayValue('New task');
    expect(inputElement).not.toBeNull();
    afterEach(cleanup);
  });

  // TODOアイテムの削除のテスト
  test('should be able to delete a TODO item', () => {
    render(
      <RecoilRoot>
        <Vox />
      </RecoilRoot>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Task to be deleted' } });

    const addButton = screen.getByText('追加');
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('削除');
    fireEvent.click(deleteButton);

    const inputElement = screen.queryByDisplayValue('Task to be deleted');
    expect(inputElement).toBeNull();
    afterEach(cleanup);
  });

  // TODOアイテムの完了のテスト
  test('should be able to mark a TODO item as complete', () => {
    render(
      <RecoilRoot>
        <Vox />
      </RecoilRoot>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Task to be checked' } });

    const addButton = screen.getByText('追加');
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox', { name: '' }) as HTMLInputElement;
    fireEvent.click(checkbox);
    expect(checkbox.checked).to.be.true;
    afterEach(cleanup);
  });

  // フィルタリング機能のテスト
  test('should be able to filter TODO items', () => {
    render(
      <RecoilRoot>
        <Vox />
      </RecoilRoot>
    );

    const input = screen.getByRole('textbox');

    // 2つのタスクを追加: 1つ完了、1つ未完了
    fireEvent.change(input, { target: { value: 'Completed task' } });
    fireEvent.click(screen.getByText('追加'));
    fireEvent.click(screen.getByRole('checkbox', { name: '' }));

    fireEvent.change(input, { target: { value: 'Uncompleted task' } });
    fireEvent.click(screen.getByText('追加'));

    // 完了したタスクをフィルタリング
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'checked' } });
    expect(screen.getByDisplayValue('Completed task')).not.toBeNull();
    expect(screen.queryByText('Uncompleted task')).toBeNull();
  });
});
