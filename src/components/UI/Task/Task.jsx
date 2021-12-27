import React from 'react';

import './task.scss'

function Task(
  {
    children,
    id,
    deleteTask,
    checkTask,
    checked,
    color,
    changeTaskName
  }
  
) {
  const onInput = (value) => {
    console.log(value);
  }
  
  return ( 
    <div className={checked ?  "task checked" : "task"}>
        <button onClick={() => checkTask(id)} className='task__checkbox' style={
          checked ? {backgroundColor: color, border: `2px solid ${color}`} :
           {border: `2px solid ${color}`}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
        <input 
     
          
          className='task__name'  
          defaultValue={children}
          onChange={(e) => setTimeout(() => {changeTaskName(id, e.target.value)}, 500) }
        />
        <button onClick={() => deleteTask(id)} className='task__close'>+</button>
    </div>

  );
}

export default Task;
