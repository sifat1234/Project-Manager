import React, { createContext, useContext, useReducer, useState } from "react";
import { initialTaskStatuses } from "../componets/initialTaskStatuses"; // Importing initial task statuses
import { taskReducer } from "../reducers/taskReducer.js"; // Importing the task reducer

export const TaskContext = createContext(); // Creating the TaskContext

// Custom hook to use the TaskContext
export function useTasks() {
  return useContext(TaskContext); // Accessing the context value
}

// Create the provider component
export const TaskProvider = ({ children }) => {
  // Setting up the state management with useReducer and useState
  const [taskStatuses, dispatch] = useReducer(taskReducer, initialTaskStatuses); // Initializing task statuses with reducer
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [taskToUpdate, setTaskToUpdate] = useState(null); // State for the task being updated
  const [searchTerm, setSearchTerm] = useState(""); // State for the search input

  
 // Derived state: filter tasks based on searchTerm
const filteredTasks = searchTerm
? taskStatuses.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  )
: taskStatuses;



  return (
    <TaskContext.Provider
      value={{
        taskStatuses: filteredTasks, // Providing filtered tasks
        dispatch, // Providing the dispatch function
        showModal, // Providing the modal visibility state
        setShowModal, // Providing the function to toggle modal visibility
        taskToUpdate, // Providing the task to update
        setTaskToUpdate, // Providing the function to set the task to update
        setSearchTerm, // Providing the function to update the search term
        searchTerm, // Providing the current search term
      }}
    >
      {children} {/* Rendering child components */}
    </TaskContext.Provider>
  );
};
