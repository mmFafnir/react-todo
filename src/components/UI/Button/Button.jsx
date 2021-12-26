

import './button.scss'

function Button({ type, color='#4DD599', children, onClick, w='100%' }) {
  const click = (e) => {
    e.preventDefault();
    onClick()
  }
  return ( 
    <button type={type} onClick={click} className='myButton' style={
        {width: w,  border: `1px solid ${color}`,color: color}
      }>
      <span className='text'>{children}</span>
      <span className='hover' style={{ backgroundColor: color}}></span>
        
    </button>

  );
}

export default Button;
