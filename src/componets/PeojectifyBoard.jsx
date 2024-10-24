import { useState } from "react"; // Importing useState, although it's not used in this component
import SearchBar from "./SerachBar"; // Importing the search bar component
import AddTaskAction from "./AddTaskAction"; // Importing the component to add new tasks
import ListIteams from "./ListIteams"; // Importing the component that lists tasks
import AddTaskModal from "./AddTaskModal"; // Importing the modal for adding tasks
import { initialTaskStatuses } from "./initialTaskStatuses"; // Importing initial task statuses (currently not used)
import { useTasks } from "../contexts/TaskContext"; // Importing task context to manage task-related state

export default function ProjectifyBoard() {
  // Accessing the showModal state and its setter function from the TaskContext
  const { showModal, setShowModal } = useTasks(); 

  return (
    <main className="flex-1 overflow-y-auto overflow-x-hidden"> {/* Main container with overflow handling */}
      <SearchBar /> {/* Render the search bar for filtering tasks */}

      <div className="mx-auto max-w-7xl p-6"> {/* Centered container for content */}
        <AddTaskAction /> {/* Button or action to add a new task */}

        {/* Conditional rendering of the modal based on showModal state */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <AddTaskModal /> {/* Render the modal for adding tasks */}
          </div>
        )}
        
        <ListIteams /> {/* Render the list of tasks */}
      </div>
    </main>
  );
}
