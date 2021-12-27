import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
} from 'react-router-dom'
import App from './App';

import './index.css';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
     <Routes >
       <Route path='/' element={<App />}/>
     </Routes>
  </Router>,
  document.getElementById('root')
);
