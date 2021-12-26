

import { useEffect } from 'react';
import { useRef, useState } from 'react/cjs/react.development';
import '../scss/folder.scss'
import Button from './UI/Button/Button';
import Task from './UI/Task/Task';

function Folder({
    folder, 
    addTasks, 
    deleteTask,
    tasks,
    checkTask,
    changeFolderName,
    closeAdd,
    changeTaskName
}) {
    const [inputError, serInputError] = useState(false);
    const [inputNameError, serInputNameError] = useState(false);
    const [openFomr, setOpenForm] = useState(false);
    const [changeInput, setChengeInput] =useState(false);
    

    const input = useRef(null)
    const inputName = useRef(null)
    useEffect(() => {
        setChengeInput(false)
    }, [folder])
 
    const validedForm = () => {
        if(input.current.value != '') {
            addTasks({
                listId: folder.parentId,
                taskId:`task${Date.now() + '$' + folder.parentId}`,
                value: input.current.value,
                checked: false,
            })
            input.current.value = ''
        } else {
            serInputError(true)
        }
    }
    
    const closeForm = (e) => {
        e.preventDefault(); 
        input.current.value = '';
        setOpenForm(false);
    }
    const validFormName = () => {
        if(inputName.current.value.length){
            changeFolderName(folder.parentId, inputName.current.value)
            setChengeInput(false)
        } else {
            serInputNameError(true)
        }
    }
  return ( 
    <>  
        {
            changeInput ? (
                <div  className='folder-name'>
                    <input 
                    ref={inputName} 
                    className={inputNameError ? 'folder-name__change error' : 'folder-name__change'} style={{color: folder.color}}  
                    type='text' 
                    defaultValue={folder.name} 
                    />

                    <div className='folder-name__btns'>
                        <Button
                         onClick={() =>  validFormName()}
                         color={folder.color} w={100} type='submit'>
                         Принять</Button>
                        
                        <button onClick={() => setChengeInput(false)} className='tasks-add__cancel'>Отмена</button>
                    </div>
                </div>

            ) : (
                <h2 style={{color: folder.color}} className='folder-name'>
                    <p>{folder.name}</p>
                    
                    <svg onClick={() => setChengeInput(true)}  xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M0 12.0504V14.5834C0 14.8167 0.183308 15 0.41661 15H2.9496C3.05792 15 3.16624 14.9583 3.24123 14.875L12.34 5.78458L9.21542 2.66001L0.124983 11.7504C0.0416611 11.8338 0 11.9338 0 12.0504ZM14.7563 3.36825C14.8336 3.29116 14.8949 3.1996 14.9367 3.0988C14.9785 2.99801 15 2.88995 15 2.78083C15 2.6717 14.9785 2.56365 14.9367 2.46285C14.8949 2.36205 14.8336 2.27049 14.7563 2.19341L12.8066 0.24367C12.7295 0.166428 12.6379 0.105146 12.5372 0.0633343C12.4364 0.021522 12.3283 0 12.2192 0C12.1101 0 12.002 0.021522 11.9012 0.0633343C11.8004 0.105146 11.7088 0.166428 11.6318 0.24367L10.107 1.76846L13.2315 4.89304L14.7563 3.36825Z" fill="#DFDFDF"/>
                    </svg>
                </h2>
            )
        }
    
        <div className='tasks'>
            {
                tasks.length > 0 ? 
                (
                    tasks.map(task => (
                        <Task  
                            id={task.taskId} 
                            key={task.taskId}
                            checkTask={checkTask} 
                            deleteTask={deleteTask}
                            checked={task.checked}
                            color={folder.color}
                            changeTaskName={changeTaskName}
                            >
                            
                                {task.value}
                        </Task>
                    ))
                ) : (
                    <div  className='notif'>Добавьте задачу</div>
                ) 
                
            }
        </div>
        {
            closeAdd ? null : (
                <form className='tasks-add'>
                    {
                        openFomr ?
                        (
                            <>
                            <input 
                                style={{border: `solid 1px ${folder.color}`, color: folder.color}}
                                onInput={(e) => e.target.value.length == 1 ? serInputError(false) : null}
                                className={inputError ? 'error' : ''}
                                ref={input} type='text' 

                            />
                            <div  className='tasks-add__btns'>
                                <Button color={folder.color} type={'submit'} onClick={validedForm} w={'145px'}>Добавить задачу</Button>
                                <button onClick={(e) => closeForm(e) } className='tasks-add__cancel'>Отмена</button>
                            </div>
                            </>
                        ) : (
                            <button className='tasks-add__open' onClick={() => setOpenForm(true)}>
                                <span className='plus'>+</span>
                                <span>Новая задача</span>
                            </button>
                        ) 
                    }
                </form>

            )
        }
    </>
  );
}

export default Folder;
