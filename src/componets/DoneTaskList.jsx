import { useState } from "react";
import { useTasks } from "../contexts/TaskContext"; // Importing the task context for accessing global task data
import SortSvgButton from "../svg/SortSvgButton"; // SVG button component for sorting
import DeleteIcon from "./DeleteIcon"; // Component to handle task deletion
import EditTaskButton from "./EditTaskButton"; // Component for editing tasks
import NoTaskFound from "./NoTaskFound"; // Component to display when no tasks are found

export default function DoneTaskList() {
  // Extracting task statuses and dispatch function from the task context
  const { taskStatuses, dispatch } = useTasks();

  // State for controlling the sort order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");

  // Find tasks categorized under "Done" from taskStatuses
  const doneTasks = taskStatuses.filter((task) => task.category === "Done");

  // Sort the tasks based on the dueDate and the current sortOrder state
  const sortedDoneTasks = [...doneTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate); // Convert string to Date object for comparison
    const dateB = new Date(b.dueDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Toggle the sorting order (asc to desc or vice versa)
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Determine the new order
    dispatch({ type: "SORT_TASKS", category: "Done", order: newOrder }); // Dispatch to the context
    setSortOrder(newOrder); // Update the local state with the new order
  };

  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      {/* Wrapper for the "Done" task list */}
      <div className="rounded-lg bg-teal-500 p-4">
        {/* Header containing the "Done" title and the number of tasks */}
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Done ({sortedDoneTasks.length}) {/* Display number of tasks */}
          </h3>
          <button onClick={toggleSortOrder}>
            {/* Button to toggle sorting order */}
            <SortSvgButton />
          </button>
        </div>

        <div>
          {/* Conditional rendering: if no tasks, show "No Task Found" message */}
          {sortedDoneTasks.length === 0 ? (
            <NoTaskFound textColor="text-[#14b8a6]" />
          ) : (
            // Otherwise, map over the sorted tasks and render each one
            sortedDoneTasks.map((task) => (
              <div key={task.id} className="mb-4 rounded-lg bg-gray-800 p-4">
                <div className="flex justify-between">
                  {/* Display task name */}
                  <h4 className="mb-2 flex-1 font-semibold text-teal-500">
                    {task.taskName}
                  </h4>
                  {/* Render delete and edit buttons for the task */}
                  <div className="flex gap-2">
                    <DeleteIcon idPass={task.id} />
                    <EditTaskButton task={task} />
                  </div>
                </div>
                {/* Display task description */}
                <p className="mb-2 text-sm text-zinc-200">{task.description}</p>
                {/* Display due date */}
                <p className="mt-6 text-xs text-zinc-400">{task.dueDate}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
