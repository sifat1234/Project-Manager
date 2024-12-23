import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import SortSvgButton from "../svg/SortSvgButton"; // Import for the sort icon
import DeleteIcon from "./DeleteIcon"; // Import for the delete button component
import EditTaskButton from "./EditTaskButton"; // Import for the edit task button component
import NoTaskFound from "./NoTaskFound"; // Import for the "No Task Found" message component

export default function ToDoTaskList() {
  // Extract taskStatuses and dispatch from context using useTasks hook
  const { taskStatuses, dispatch } = useTasks();

  // Local state to handle the sort order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");

  // Filter tasks categorized under "To-Do" from taskStatuses
  const toDoTasks = taskStatuses.filter((task) => task.category === "To-Do");
  console.log(toDoTasks);

  // Sort the tasks based on the dueDate and the current sortOrder state
  const sortedToDoTasks = [...toDoTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate); // Convert string to Date object for comparison
    const dateB = new Date(b.dueDate);
    // Compare dates based on whether the sortOrder is ascending or descending
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Toggle the sorting order (asc to desc or vice versa)
  // Dispatch an action to update the sorted order in the global state
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc"; // Determine the new order
    dispatch({ type: "SORT_TASKS", category: "To-Do", order: newOrder }); // Dispatch to the context
    setSortOrder(newOrder); // Update the local state with the new order
  };

  return (
    <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
      {/* Wrapper for the "To-Do" task list */}
      <div className="rounded-lg bg-indigo-600 p-4">
        {/* Header containing the "To-Do" title and the number of tasks */}
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            To-Do ({sortedToDoTasks.length}) {/* Display number of tasks */}
          </h3>
          <button onClick={toggleSortOrder}>
            {/* Button to toggle sorting order */}
            <SortSvgButton />
          </button>
        </div>

        <div>
          {/* Conditional rendering: if no tasks, show "No Task Found" message */}
          {sortedToDoTasks.length === 0 ? (
            <NoTaskFound textColor="text-[#1882f2]" />
          ) : (
            // Otherwise, map over the sorted tasks and render each one
            sortedToDoTasks.map((task) => (
              <div key={task.id} className="mb-4 rounded-lg bg-gray-800 p-4">
                <div className="flex justify-between">
                  {/* Display task name */}
                  <h4 className="mb-2 flex-1 font-semibold text-indigo-500">
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
