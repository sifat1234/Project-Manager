import ToDoTaskList from "./ToDoTaskList";
import OnProgressTaskList from "./OnProgressTaskList";
import DoneTaskList from "./DoneTaskList";
import ReviseTaskList from "./ReviseTaskList";


export default function ListIteams() {
  return (
    <div className="-mx-2 mb-6 flex flex-wrap">
      {/* <!-- Todo --> */}
      
      <ToDoTaskList/>

      {/* <!-- OnProgress --> */}

     <OnProgressTaskList/>

      {/* <!-- Done --> */}
      <DoneTaskList/>

      {/* <!-- Revised --> */}
     <ReviseTaskList/>
    </div>
  );
}
