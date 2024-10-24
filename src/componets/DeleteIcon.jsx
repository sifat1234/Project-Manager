import { toast } from "react-toastify"; // Import Toastify for showing success notifications after deleting a task
import { useTasks } from "../contexts/TaskContext"; // Import custom context to manage tasks

// Component to handle the deletion of tasks with confirmation and notification
export default function DeleteIcon({ idPass }) {
    const { dispatch } = useTasks(); // Get dispatch function from context to handle task state

    // Function to handle delete action
    const handleDelete = () => {
        // Prompt user for confirmation before deleting
        if (window.confirm("Are you sure you want to delete this task?")) {
            // Dispatch DELETE_TASK action with taskId to remove the task
            dispatch({
                type: "DELETE_TASK",
                taskId: idPass,
            });
            // Show success notification after task is deleted
            toast.success("Task deleted successfully!");
        }
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 cursor-pointer text-zinc-300"
            onClick={handleDelete} // Trigger delete function on icon click
            aria-label="Delete task" // Accessibility: provide label for screen readers
        >
            {/* Trash bin icon paths */}
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
    );
}
