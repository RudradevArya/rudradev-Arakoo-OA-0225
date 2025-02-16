import { useState } from 'react';

export default function AddTaskModal({ isOpen, onClose, addTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title });
    setTitle('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />
        <button type="submit">Add Task</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
