export const taskReducer = (state, action) => {
  switch (action.type) {


    // Action for adding a new task or updating an existing one
    case "ADD_TASK":
      if (action.isAdd) {
        // Add new task to the state
        return [...state, action.newTask]; // Spread existing tasks and add the new task
      } else {
        // Update existing task by ID
        return state.map((task) =>
          task.id === action.newTask.id ? action.newTask : task // Replace task if IDs match
        );
      }

    // Action for sorting tasks based on due dates
    case "SORT_TASKS":
      return state.map((status) => {
        // Check if the current status category matches the action category
        if (status.category === action.category) {
          // Sort tasks by their dueDate property
          const sortedTasks = [...(status.tasks || [])].sort((a, b) => {
            const dateA = new Date(a.dueDate); // Convert dueDate to Date object for comparison
            const dateB = new Date(b.dueDate);
            // Return tasks in ascending or descending order based on action.order
            return action.order === "asc" ? dateA - dateB : dateB - dateA;
          });
          return { ...status, tasks: sortedTasks }; // Return updated status with sorted tasks
        }
        return status; // Return status unchanged if no match
      });

    // Action for deleting a task
    case "DELETE_TASK":
      return state.filter(task => task.id !== action.taskId);

    // Default case to return the current state if no actions match
    default:
      return state;
  }
};
