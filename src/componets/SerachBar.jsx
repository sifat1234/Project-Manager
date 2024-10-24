import { useState } from 'react'; 
import { useTasks } from "../contexts/TaskContext"; // Importing useTasks to access task-related context

export default function SearchBar() {
  
  // Accessing setSearchTerm and searchTerm from the TaskContext
  const { setSearchTerm, searchTerm } = useTasks();

  // Function to handle input change in the search bar
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value; // Get the new search term from the input field
    setSearchTerm(newSearchTerm); // Update the search term in the context
  };

  return (
    <header className="flex items-center justify-between bg-gray-800 p-4">
      {/* Button for toggling a mobile menu (currently hidden on larger screens) */}
      <button className="lg:hidden">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path> {/* SVG icon for a mobile menu (hamburger icon) */}
        </svg>
      </button>
      
      {/* Search input field */}
      <div className="mx-4 flex-1">
        <input
          type="text"
          placeholder="Search here" // Placeholder text in the input
          className="w-full max-w-xl rounded-full bg-gray-700 px-4 py-2 text-white focus:outline-none" // Styling for the input field
          value={searchTerm} // Binds the input value to searchTerm from context
          onChange={handleInputChange} // Calls handleInputChange when user types in the search field
        />
      </div>
      
      {/* Notification icons */}
      <div className="flex items-center">
        
        {/* First button (possibly for notifications or alerts) */}
        <button className="relative mr-4">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path> {/* SVG icon for bell notifications */}
          </svg>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span> {/* Red notification dot */}
        </button>

        {/* Second button (possibly for messages or emails) */}
        <button className="relative mr-4">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path> {/* SVG icon for envelope or mail */}
          </svg>
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span> {/* Red notification dot */}
        </button>
      </div>
    </header>
  );
}
