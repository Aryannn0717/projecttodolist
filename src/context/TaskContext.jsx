import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig.js"; // Adjust the path as needed

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const fetchedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks.");
      }
    };
    fetchTasks();
  }, []);

  // Function to add a new task to Firebase and update local state
  const addTask = async (task) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), task);
      const newTask = { id: docRef.id, ...task };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];
        return updatedTasks;
      });
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.");
    }
  };

  // Function to delete a task from Firebase and update local state
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  // Function to mark a task as completed in Firebase and update local state
  const markCompleted = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) return;

      await updateDoc(doc(db, "tasks", taskId), {
        completed: !taskToUpdate.completed,
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      toast.success("Task completion status updated!");
    } catch (error) {
      console.error("Error updating task completion:", error);
      toast.error("Failed to update task completion.");
    }
  };

  const editTask = async (taskId, updatedTask) => {
    try {
      await updateDoc(doc(db, "tasks", taskId), updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      toast.success("Task edited successfully!");
    } catch (error) {
      console.error("Error editing task:", error);
      toast.error("Failed to edit task.");
    }
  };

  // 🔔 Check tasks every minute for reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      tasks.forEach((task) => {
        const taskDue = new Date(task.dueDate);
        const timeDifference = taskDue - now;

        // Show a reminder 10 minutes before the task is due
        if (timeDifference > 0 && timeDifference < 10 * 60 * 1000) {
          toast.warn(`Reminder: "${task.title}" is due soon!`, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, markCompleted, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;