import React from 'react'; 
import { useState, useRef } from 'react';

import Button from './UI/Button/Button';

import '../scss/modal.scss'


let colors = ['C9D1D3', '42B883', '64C4ED', 'FFBBCC', 'B6E6BD', 'C355F5', '09011A', 'FF6464']

function Modal({setModalOpen, addFolder, lengthFolders}) {
  const [currentColor, setCurrentColor] = useState('#C9D1D3');
  const [error, setError] = useState(false)

  const inputText = useRef(null);
  const validFolder = () => {
    if(inputText.current.value != ''){
      addFolder({name: inputText.current.value, color: currentColor, parentId: Date.now() + lengthFolders,})
      setModalOpen()
    } else {
      setError(true)
    }
  

  }


  return ( 
    <div className='modal'>
      <button onClick={setModalOpen} className='modal__close'>+</button>
      <input ref={inputText} className={error ? 'error' : ''}  type='text' placeholder='Название папки'/>
      <div className='modal__colars'>
        {colors.map((color, index )=> (
          <div key={index} className='color'>
            <input onClick={() => setCurrentColor(`#${color}`)} type='radio' value={`#${color}`} name="color" id={`color${index}`} defaultChecked={index === 0 ? true : false} />
            <label style={{backgroundColor: `#${color}`}} htmlFor={`color${index}`}></label>
          </div>
        ))}
      </div>
      <Button onClick={validFolder}>Добавить</Button>
    </div>

  );
}

export default Modal;
