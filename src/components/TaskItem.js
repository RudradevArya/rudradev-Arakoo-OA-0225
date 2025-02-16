import { useState } from 'react';

export default function TaskItem({ task, provided, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleUpdate = () => {
    updateTask(task.id, { title: editedTitle });
    setIsEditing(false);
  };

  const toggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };

  return (
    <li
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className={`task-item ${task.done ? 'done' : ''}`}
    style={{
      border: '1px solid #ccc',
      padding: '12px',
      marginBottom: '5px',
      backgroundColor: '#f9f9f9'
    }}
  >
      {isEditing ? (
      <>
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <button onClick={handleUpdate}>Save</button>
      </>
    ) : (
      <>
        <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</span>
          <div>
            <button onClick={toggleDone}>{task.done ? 'Undo' : 'Done'}</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
      </>
    )}
  </li>
  );
}