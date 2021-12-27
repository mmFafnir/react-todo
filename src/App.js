import axios from 'axios';

import Folder from './components/Folder';
import Sidebar from './components/Sidebar';

import './App.scss';
import './scss/null.scss'
import React from 'react';
import { useState, useEffect } from 'react/cjs/react.development';

// Storage.prototype.get = function(key) {
//   return  JSON.parse(this.getItem(key));
  
// }
// Storage.prototype.set = function(key, obj) {
//   return this.setItem(key, JSON.stringify(obj))
// }

function App() {
  const [activeFolder, setActiveFolder] = useState([])
  const [activeTasks, setActiveTasks] = useState([])
  const [folders, setFolders] = useState([]);
  const [foldersTasks, setFoldersTasks] = useState([]);
  const [selectedList, selectList] = useState('all')
  
  const [openSidebar, setOpenSidebar] = useState(false)



  const addFolder = (obj) => {
    if(!folders.find(folder => folder.name === obj.name)){
      setFolders((prev) => [...prev, obj])
    }
  }
  


  const addTasks = (obj) => {
    let duplicates = false
    foldersTasks.forEach(task => {
      if(task.listId == obj.listId && task.value == obj.value){
        duplicates = true 
      }
    })
    if(!duplicates){
      setFoldersTasks(prev => [...prev, obj]);

    }
  }

  const deleteTask = (id) => {
    setFoldersTasks(foldersTasks.filter(task => task.taskId !== id))
  }
  const checkTask = (id) => {
    setFoldersTasks(foldersTasks.map(task => {
      if(task.taskId == id){
        task.checked = !task.checked
      }
      return task
    }))
  }

  const deleteFolder = (id) => {
    if(selectedList == id){
      selectList('all')
    }
    setFoldersTasks(foldersTasks.filter(task => task.listId !== id))
    setFolders(folders.filter(folder => folder.parentId !== id))

  }

  const changeFolder = () => {
    setActiveFolder(folders.filter(item => item.parentId == selectedList)[0])
    setActiveTasks(foldersTasks.filter(task => task.listId == selectedList))
  }

  const changeFolderName = (id, value) => {
    setFolders(folders.map(folder => {
      if(folder.parentId == id){
        folder.name = value;
      }
      return folder
    }))
  }
  const changeTaskName = (id, value) => {
    if(value !== '') {
      setFoldersTasks(foldersTasks.map(task => {
        if(task.taskId == id){
          task.value = value;
        }
        return task
      }))
    } else {
      deleteTask(id)
    }
  }
  

  
  useEffect(() => {
    if(selectedList !== 'all'){
      changeFolder() 
    }
  }, [selectedList, foldersTasks])

  useEffect(() => {
    // localStorage.set('folders', folders)
  }, [folders])

  useEffect(() => {
    // localStorage.set('tasks', foldersTasks)
  }, [foldersTasks])



  return ( 
          <div className={openSidebar ? "todo open"  : 'todo'}>
                <Sidebar 
                  openSidebar={openSidebar}
                  setOpenSidebar={setOpenSidebar}
                  selectedList={selectedList} 
                  selectList={selectList} 
                  folders={folders} 
                  addFolder={addFolder}
                  deleteFolder={deleteFolder}
                />

                  <div className='todo__body'>
                    {
                      folders.length > 0 ?
                        selectedList !== 'all' ?
                        (
                          <Folder 
                            changeFolderName ={changeFolderName}
                            addTasks = {addTasks}
                            deleteTask ={deleteTask}
                            folder={activeFolder}
                            tasks ={activeTasks}
                            checkTask={checkTask}
                            closeAdd={false}
                            changeTaskName={changeTaskName}
                          />
                       ) : (
                          <div className='todo__all'>
                            {
                              folders.map(folder => (
                                <div style={{margin: '0px 0px 50px  0px'}} key={folder.parentId}>
                                  <Folder 
                                    changeFolderName ={changeFolderName}
                                    addTasks = {addTasks}
                                    deleteTask ={deleteTask}
                                    folder={folder}
                                    tasks ={foldersTasks.filter(task => task.listId == folder.parentId)}
                                    checkTask={checkTask}
                                    closeAdd={true}
                                    changeTaskName={changeTaskName}
                                  />
                                </div>
                              ))
                            }
                          </div>
                        )
                      : <div className='empty'>Задачи отсутствуют</div>
                    }
                  </div>
          </div>
  );
}

export default App;
