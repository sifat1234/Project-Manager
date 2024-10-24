import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'; // Ensure this is imported

import Sidebar from "./Sidebar"; // Importing the Sidebar component
import ProjectifyBoard from "./componets/PeojectifyBoard"; // Importing the main task board component

import { TaskProvider } from "./contexts/TaskContext"; // Importing the TaskProvider to manage task state
import "./styles/output.css"; // Importing the main CSS styles

export default function App() {
  return (
    <TaskProvider> {/* Wrapping the application in the TaskProvider for state management */}
      <div className="flex h-screen"> {/* Flex container for a responsive layout */}
        <Sidebar /> {/* Rendering the Sidebar component */}
        <ProjectifyBoard /> {/* Rendering the main task board component */}
      </div>
         <ToastContainer position="bottom-right" /> {/* Add the ToastContainer here */}
    </TaskProvider>
  );
}
