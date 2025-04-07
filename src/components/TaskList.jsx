// TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, editTask, deleteTask }) {
  return (
    <div className="flex flex-wrap gap-4"> {/* Flexbox for horizontal layout */}
      {tasks.length === 0 ? (
        <p className="text-center text-white">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
}

export default TaskList;