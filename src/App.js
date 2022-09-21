import React, { useState } from "react";
import Banner from "./Banner";
import Header from "./Header";
import Main from "./Main";

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  
  return (
    <div>
      <Header />
      <Banner onNewTask={t => {
        setTasks([...tasks, t]);
      } }/>
      <Main tasks={tasks} onNewTaskDone={(taskId, log) => {
        setTasks([...tasks.map(t => {
          if(t.id !== taskId){
            return t;
          }
          return {...t, logs: [...t.logs, log]};
        })])
      }}/>
    </div>
  )
}

export default App;