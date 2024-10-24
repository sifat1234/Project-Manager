import { useTasks } from "../contexts/TaskContext"; // Importing useTasks context for managing task-related state
import { useState } from "react"; // Importing useState hook (though not used in this component)

export default function EditTaskButton({ task }) {
    // Destructuring context functions from useTasks
    const { setShowModal, setTaskToUpdate, setIsAdd } = useTasks();

    // Function to format the dueDate to 'YYYY-MM-DD' format
    const formatDueDate = (dateString) => {
        const date = new Date(dateString); // Create a Date object from the date string
        const year = date.getFullYear(); // Extract the year
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Extract the month (0-indexed, so add 1) and pad it to 2 digits
        const day = String(date.getDate()).padStart(2, '0'); // Extract the day and pad it to 2 digits
        return `${year}-${month}-${day}`; // Return formatted date
    };

   

    const formattedDueDate = formatDueDate(task.dueDate); // Format the due date of the task

    // Function to handle editing a task
    function handleEditTask() {
        setShowModal(true); // Show the modal for editing
        
        // Set the task to update with category and formatted due date
        setTaskToUpdate({
          ...task,

          dueDate: formattedDueDate,
        });
    }

    return (
        <svg
            className="h-4 w-4 cursor-pointer text-zinc-300" // Styling the SVG icon
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleEditTask} // Attach click handler to edit task
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
        </svg>
    );
}
