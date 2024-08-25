import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./home.css";

import Tasks from './Tasks.jsx';

function Home(){

const [addTask,setAddTask] = useState(false);
const [taskName,setTaskName] = useState('');
const [deadline,setDeadline] = useState('');
const [clicked,setClicked] = useState(false);
const [insertedId,setInsertedId] = useState(0);

let history = useNavigate();


function handleSubmit(e){
e.preventDefault();
const dateString = deadline;
const formattedDate = dateString.replace("T", " ");

  if(new Date(dateString) < new Date()){
    alert("date input can't be set in the past");
 }else{
   setClicked(!clicked);
   let formData = new FormData();
   formData.append('taskName',taskName.trim());
   formData.append('deadline',formattedDate);
   
   axios.post(import.meta.env.VITE_API_URL + '/todo_managment/insertTask.php',formData,{withCredentials:true})
   .then(res => {setInsertedId(res.data)})
   .catch(err => console.log(err))
 
 }
}


function handleLogout(){
axios.get(import.meta.env.VITE_API_URL + '/logout.php',{withCredentials:true})
.then(res => {

if(res.data.status === 1){
  history('/login');
}else{
  alert('something went wrong, please try again!');
}

})
.catch(err => console.log(err))

}


return <div className='homeMainDiv'>

<section className='scalerDiv'>
<div className='header'>
<button id='logout' onClick={handleLogout}>Logout</button>
<h1>Tasks</h1>
<button onClick={()=>{addTask ? setAddTask(false) : setAddTask(true)}}>Add Task</button>
</div>

{addTask && <div className='taskAdderDiv'>
  <form onSubmit={handleSubmit}>
  
  <section>
  <input type="text" placeholder='Type Task Here...' value={taskName} onChange={(e)=>{setTaskName(e.target.value)}} required/>
  <input type="datetime-local" placeholder='Type Deadline Here...' value={deadline} onChange={(e)=>{setDeadline(e.target.value)}} required/>
</section>
<button>Add</button>

</form>
</div>
}

<Tasks inputValues = {{setTaskName: setTaskName,setDeadline: setDeadline}}
       clicked = {clicked} deadline={deadline} taskName = {taskName.trim()}
       insertedId = {insertedId} />
</section>
 </div>
}

export default Home;