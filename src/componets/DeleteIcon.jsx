import { toast } from "react-toastify";
import { useTasks } from "../contexts/TaskContext";

export default function DeleteIcon({ idPass }) {
    const { dispatch } = useTasks();

    const handleDelete = () => {
        const confirmed = window.confirm("Do you really want to delete this task?");
        if (confirmed) {
            dispatch({
                type: "DELETE_TASK",
                taskId: idPass,
            });
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
            onClick={handleDelete}
            aria-label="Delete task"
            role="button" // Added for better accessibility
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7l16 0" />
            <path d="M10 11l0 6" />
            <path d="M14 11l0 6" />
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
    );
}
