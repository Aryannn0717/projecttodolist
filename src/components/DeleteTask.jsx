// DeleteTask.jsx
import React from "react";

function DeleteTask({ taskId, onDelete }) {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(taskId);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded ml-2"
    >
      Delete
    </button>
  );
}

export default DeleteTask;