
import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskItem from '../components/TaskItem';  


describe('TaskItem', () => {
  it('renders task title', () => {
    const mockTask = { id: '1', title: 'Test Task', done: false };
    const mockProvided = {
      draggableProps: {},
      dragHandleProps: {},
      innerRef: jest.fn(),
    };

    render(
      <TaskItem
        task={mockTask}
        provided={mockProvided}
        updateTask={() => {}}
        deleteTask={() => {}}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });
});