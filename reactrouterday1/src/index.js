import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from './App2Nested';

const info = [
  {id: "rendering", title:"Rendering with React",info:"Add some text here"},
  {id: "components", title:"components",info:"Add some text here"},
  {id: "props-v-state", title:"Props v. State",info:"Add some text here"},
  {id: "react-routing", title:"Routing with React Router",info:"Cool Text"},
  {id: "react", title:"Learn React",info:"Cool text about react"}
]

ReactDOM.render(
  <React.StrictMode>
    <App info={info} />
  </React.StrictMode>,
  document.getElementById('root')
);



