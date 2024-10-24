import { useTasks } from "../contexts/TaskContext"; // Importing the useTasks hook to access task context
import AddSvgButton from '../svg/AddSvgButton'; // Importing the SVG button component for adding tasks

export default function AddTaskAction() {
  const { setShowModal } = useTasks(); // Destructuring setShowModal from the task context

  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold">Projectify</h2> {/* Header for the project title */}
      <div className="flex space-x-2">
        <button
          className="flex items-center rounded-md bg-gray-700 px-4 py-2 text-white"
          onClick={() => setShowModal(true)} // Trigger modal to show on button click
        >
          <AddSvgButton /> {/* Button icon for adding a task */}
          Add {/* Button label */}
        </button>
      </div>
    </div>
  );
}
