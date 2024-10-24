import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import { toast } from "react-toastify"; // Correct import statement


export default function AddTaskModal() {
  const {
    setShowModal, // Function to show/hide the modal
    dispatch, // Function to handle state updates using reducers
    taskToUpdate, // The task being updated, if any
    setTaskToUpdate, // Function to reset the task after an update
  } = useTasks();

  // Initialize task state: if taskToUpdate exists, use it, otherwise create a new task structure
  const [task, setTask] = useState(
    taskToUpdate || {
      category: "", // The task's category  
      id: crypto.randomUUID(), // Generate a unique ID for the task
      taskName: "", // The name of the task
      description: "", // The task's description
      dueDate: "", // The task's due date
    }
  );



  // Determine if it's an 'Add' or 'Update' operation
  const [isAdd, setIsAdd] = useState(!taskToUpdate);

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value, // Update the specific field
    }));
  };

  // Handle form submission for adding or updating a task
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate if all required fields are filled
    if (!task.taskName || !task.description || !task.dueDate || !task.category) {
      alert("Please fill out all fields"); // Show alert if validation fails
      return;
    }


    // Convert the input date (YYYY-MM-DD) to a Date object for formatting
    const dateObj = new Date(task.dueDate);
    // Format the date to "Month Day, Year" format
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);

    // Create the new task object
    const newTask = {
      id: taskToUpdate ? task.id : crypto.randomUUID(), // Use existing ID for updates
      taskName: task.taskName,
      description: task.description,
      dueDate: formattedDate, // Keeping the input date as YYYY-MM-DD
      category: task.category, // Ensure category is included here
    };

    // Dispatch the action to either add or update the task
    dispatch({ type: "ADD_TASK", isAdd: isAdd, newTask });
    
     // Show success message based on whether it was an add or update
  if (isAdd) {
    toast.success("Task Added successfully!", {
      autoClose: 3000,
    });
  } else {
    toast.success("Task Updated successfully!", {
      autoClose: 3000,
    });
  }
    
    // Reset the form fields to their initial state after submission
    setTask({
      category: "",
      id: crypto.randomUUID(),
      taskName: "",
      description: "",
      dueDate: "",
    });

    // If the operation is an update, close the modal and reset taskToUpdate
    if (!isAdd) {
      setShowModal(false); // Close modal after updating
      setTaskToUpdate(null); // Reset taskToUpdate after update
      
    }
  };

  return (
    <>
      <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            {isAdd ? "Add Task" : "Edit Task"}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Task Name Input */}
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                required
                value={task.taskName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Task Description Input */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={task.description}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {/* Due Date Input */}
            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Task Category Select */}
            <div className="mb-4">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={task.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Category</option>
                <option value="To-Do">To-Do</option>
                <option value="On Progress">On Progress</option>
                <option value="Done">Done</option>
                <option value="Revised">Revised</option>
              </select>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={() => {
                  setShowModal(false); // Close modal on cancel
                  setTaskToUpdate(null); // Clear taskToUpdate
                  setIsAdd(true); // Reset isAdd state
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {isAdd ? "Create Task" : "Update Task"} {/* Dynamic button text */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
