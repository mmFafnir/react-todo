import React from 'react';
import { useState } from 'react';

import List from './List';

import '../scss/sidebar.scss'
import icon from '../icon/Vector.svg'
import Modal from './Modal';



function Sidebar({folders, addFolder, selectedList, selectList, deleteFolder, openSidebar, setOpenSidebar}) {

  const [modalOpen, setModalOpen] = useState(false)

  const clickSidebar = () => {
    setOpenSidebar(!openSidebar)
    setModalOpen(false)
  }
  
  return ( 
    <div className={ openSidebar ? 'todo__sidebar todo-sidebar open' : 'todo__sidebar todo-sidebar'}>
        <button onClick={clickSidebar} className='todo-open'>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sliders-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-sliders-h fa-w-16 fa-7x">
                  <path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z" className=""></path>
                </svg>
        </button>
        <div className='todo-sidebar__header'>
          <div className={(selectedList == 'all') ? 'list active' : 'list'}>
            <button onClick={() => selectList('all')} className={'folder list folder__all'} id='all'>
              <div className='folder__icon_img'>
                <img src={icon}/>
              </div>
              <p className='folder__text'>Все задачи</p>
            </button>
          </div>
        </div>
        
        <ul className='todo-sidebar__folders'>
            
            {
                folders.length > 0 ?
               ( folders.map((item, index) => (
                        <List 
                        onClick={()=> selectList(item.parentId)} 
                        active={(selectedList == item.parentId) ? true : false} 
                        key={item.parentId} 
                        id={item.parentId} 
                        name={item.name} 
                        color={item.color} 
                        deleteFolder={() => deleteFolder(item.parentId)}
                        
                        />
                )) )
                : ''
            
            }
            
        </ul>

        <div className='todo-sidebar__footer'>
            <button onClick={() => setModalOpen(true)} className='add-folder'>
                <p className='add-folder__icon'>+</p>
                <p className='add-folder__text'>Добавить папку</p>
            </button>
        </div>
        {(modalOpen) ?
        <Modal lengthFolders={folders.length+1} addFolder={(obj) => addFolder(obj)} setModalOpen={() => setModalOpen(false)}/> : null}
    </div>

  );
}

export default Sidebar;
