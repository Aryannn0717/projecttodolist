// Dashboard.jsx
import React, { useContext, useState, useEffect } from "react";
import TaskContext from "../context/TaskContext";
import AddTaskForm from "../components/AddTaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";

function Dashboard() {
  const { tasks, addTask, editTask, deleteTask } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState("priorityHigh");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [newTask, setNewTask] = useState({
    title: "",
    category: "Work",
    priority: "1",
    dueDate: "",
    reminder: "",
  });

  const [remainingTasks, setRemainingTasks] = useState(0);

  useEffect(() => {
    setRemainingTasks(tasks.filter((task) => !task.completed).length);
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.title || !newTask.dueDate) return;
    addTask(newTask);
    setNewTask({
      title: "",
      category: "Work",
      priority: "1",
      dueDate: "",
      reminder: "",
    });
  };

  const handleEditTask = (taskId, updatedTask) => {
    editTask(taskId, updatedTask);
  };

  const filteredTasks = tasks
    .filter((task) => categoryFilter === "All" || task.category === categoryFilter)
    .sort((a, b) => b.priority - a.priority);

  return (
    <div className="p-4 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-4"> {/* Main Grid Layout */}
      <div className="md:col-span-4"> {/* AddTaskForm (Full Width on Mobile, Full Width on Desktop) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
          />
        </div>
      </div>

      <div className="md:col-span-1"> {/* TaskFilters (Small Box on Right) */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4">Task Category</h3>
          <TaskFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
      </div>

      <div className="md:col-span-3"> {/* TaskList (Bottom Section) */}
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Task List</h3>
            <p className="text-sm text-gray-400">Remaining Tasks: {remainingTasks}</p>
          </div>
          <TaskList
            tasks={filteredTasks}
            editTask={handleEditTask}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;