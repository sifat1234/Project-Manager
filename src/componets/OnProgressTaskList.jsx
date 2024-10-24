import { useTasks } from "../contexts/TaskContext"; // Import the context hook to access taskStatuses and dispatch
import { useState } from "react";
import DeleteIcon from './DeleteIcon'; // Import the delete icon component
import EditTaskButton from "./EditTaskButton"; // Import the edit button component
import NoTaskFound from "./NoTaskFound"; // Import the component to display when no tasks are found
import SortSvgButton from "../svg/SortSvgButton"; // Import the sort button (SVG icon)

export default function OnProgressTaskList() {
  // Extract taskStatuses and dispatch from the TaskContext using the custom hook
  const { taskStatuses, dispatch } = useTasks();
  
  // State for toggling between ascending (asc) and descending (desc) sort order
  const [sortOrder, setSortOrder] = useState("asc");


  // Find tasks categorized under "On Progress" from taskStatuses
  const onProgressTasks = taskStatuses.filter((task) => task.category === "On Progress")
  // Sort the tasks based on their dueDate and the current sortOrder
  const sortedOnProgressTasks = [...onProgressTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate); // Convert dueDate to Date object
    const dateB = new Date(b.dueDate);
    // Compare dates based on the selected sortOrder
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Toggle the sort order (asc <-> desc)
  // Dispatch a sorting action to the global state with the updated order
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Determine new sort order
    dispatch({ type: "SORT_TASKS", category: "On Progress", order: newOrder }); // Dispatch the sort action for "On Progress"
    setSortOrder(newOrder); // Update local sortOrder state
  };

  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      {/* Wrapper for the "On Progress" task list */}
      <div className="rounded-lg bg-yellow-500 p-4">
        {/* Header containing the "On Progress" title and number of tasks */}
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            On Progress ({sortedOnProgressTasks.length}) {/* Display task count */}
          </h3>
          <button onClick={toggleSortOrder}>
            {/* Button to toggle the sort order */}
            <SortSvgButton />
          </button>
        </div>

        <div>
          {/* Conditional rendering: if no tasks, show the "No Task Found" message */}
          {sortedOnProgressTasks.length === 0 ? (
            <NoTaskFound textColor="text-[#eab308]" /> // No tasks found display
          ) : (
            // Otherwise, map over the sorted tasks and render each one
            sortedOnProgressTasks.map((task) => (
              <div key={task.id} className="mb-4 rounded-lg bg-gray-800 p-4">
                <div className="flex justify-between">
                  {/* Display task name */}
                  <h4 className="mb-2 flex-1 font-semibold text-yellow-500">
                    {task.taskName}
                  </h4>

                  {/* Display delete and edit buttons for the task */}
                  <div className="flex gap-2">
                    <DeleteIcon  idPass={task.id} />
                    <EditTaskButton  task={task} />
                  </div>
                </div>

                {/* Display task description */}
                <p className="mb-2 text-sm text-zinc-200">{task.description}</p>

                {/* Display task due date */}
                <p className="mt-6 text-xs text-zinc-400">{task.dueDate}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
