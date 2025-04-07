// TaskItem.jsx
import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import DeleteTask from "./DeleteTask";

function TaskItem({ task, editTask, deleteTask }) {
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [editReminder, setEditReminder] = useState(task.reminder);

  const handleEditClick = () => {
    setEditingTask(task.id);
  };

  const handleSaveEdit = () => {
    editTask(task.id, {
      title: editText,
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate,
      reminder: editReminder,
    });
    setEditingTask(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-2"> {/* Task item box */}
      {editingTask === task.id ? (
        <EditTaskForm
          editText={editText}
          setEditText={setEditText}
          editCategory={editCategory}
          setEditCategory={setEditCategory}
          editPriority={editPriority}
          setEditPriority={setEditPriority}
          editDueDate={editDueDate}
          setEditDueDate={setEditDueDate}
          editReminder={editReminder}
          setEditReminder={setEditReminder}
          handleSaveEdit={handleSaveEdit}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <div className="space-y-2"> {/* Vertical space between task details */}
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">Category: {task.category}</p>
          <p className="text-sm text-gray-600">Priority: {task.priority}</p>
          <p className="text-sm text-gray-600">Due Date: {task.dueDate}</p>
          <p className="text-sm text-gray-600">Reminder: {task.reminder || "None"}</p>
          <div className="flex space-x-2 mt-2"> {/* Horizontal space between buttons */}
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <DeleteTask taskId={task.id} onDelete={deleteTask} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;