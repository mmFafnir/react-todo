import React from 'react'


import '../scss/list.scss'




function List({name, color, onClick, active, deleteFolder}) {
  return ( 
   <li className={active ? 'list active' : 'list'}>
    <button onClick={onClick} className={ 'folder'}>
        <div className='folder__icon' style={{backgroundColor: color}}></div>
        <p className='folder__text'>  
            {name}
        </p>
    </button>
    <button onClick={deleteFolder} className='list__delete'>+</button>
   </li> 

  );
}

export default List;
