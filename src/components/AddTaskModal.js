import { useState } from 'react';

export default function AddTaskModal({ isOpen, onClose, addTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({ title });
      setTitle('');
      onClose();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
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
