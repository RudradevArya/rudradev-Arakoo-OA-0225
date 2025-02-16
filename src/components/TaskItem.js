import { useState } from 'react';

export default function TaskItem({ task, provided, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleUpdate = () => {
    updateTask(task.id, { title: editedTitle });
    setIsEditing(false);
  };

  return (
    <li
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    style={{
      border: '1px solid #ccc',
      padding: '10px',
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
        <span style={{ fontWeight: 'bold' }}>{task.title}</span>
        <div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      </>
    )}
  </li>
  );
}