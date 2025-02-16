import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, orderBy, serverTimestamp} from 'firebase/firestore';
import TaskItem from './TaskItem';
import AddTaskModal from './AddTaskModal';
import Header from './Header';

export default function TaskBoard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    
    console.log("User ID:", user.uid); 

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
      const tasksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() 
      }));
      console.log("Tasks data:", tasksData); 
      setTasks(tasksData);
      setError(null);
    },
    (err) => {
      console.error("Error fetching tasks:", err);
      setError(err.message);
    }
  
  );
  
    return () => unsubscribe();
  }, [user]);

  const addTask = async (taskData) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };

  const updateTask = async (id, taskData) => {
    await updateDoc(doc(db, 'tasks', id), taskData);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
    updateTask(reorderedItem.id, { order: result.destination.index });
  };

  return (
    <div>
      <Header user={user} />
      <button onClick={() => setIsModalOpen(true)}>Add Task</button>
      {error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : tasks.length === 0 ? (
        <div>No tasks found</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <TaskItem
                        task={task}
                        provided={provided}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addTask={addTask}
      />
    </div>
  );
}
