import { useEffect, useState } from "react";
import axios from "axios";
import "./tasks.css";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

import { removeTask } from "../../reusable_functions/removeTask";

function Tasks({inputValues,clicked,deadline,taskName,insertedId}) {

const [array,setArray] = useState([]);

useEffect(()=>{

if(array){
array.map((result,index)=>{
  if(result.id){
    checkTaskTime(result.deadline,result.id);
  }
})
}

},[array]);

useEffect(()=>{
  if(taskName.length>0 && deadline.length>0){
  insertNewTask(taskName,deadline,insertedId);
}else{
  console.log('deadline and taskName is not set');
}
},[insertedId]);

useEffect(() => {
  fetchTasks();
}, []);


function fetchTasks() {
  axios.get(import.meta.env.VITE_API_URL + '/todo_managment/fetchTasks.php', { withCredentials: true })
    .then(res => {
      console.log(res);
      if (!res.data.message) {
        setArray(res.data);
      }
    })
    .catch(err => console.log(err));
}

function doneBtnTask(taskId){
 
let oldArray = [...array];
let updatedArray = oldArray.filter(obj => obj.id !== taskId);
setArray(updatedArray);

removeTask(taskId);

}

function insertNewTask(taskName,deadline,taskId){
  console.log('inserted task with id: '+taskId+'');
   let oldArray = [...array];
   let newFormatDeadline = deadline.replace("T", " ");
   oldArray.push({id:taskId,task:taskName,deadline:newFormatDeadline});
   inputValues.setTaskName('');
   inputValues.setDeadline('');
   setArray(oldArray);
}

  function checkTaskTime(expDate,taskId){
    
   if(new Date() > new Date(expDate)){
      removeTask(taskId);

      let oldArray = [...array];
      const updatedArray = oldArray.filter(obj => obj.id !== taskId);

     setArray(updatedArray);
   }

  }

  function calculateTime(expDate) {

    const startDate = new Date();
    const endDate = new Date(expDate.replace(" ", "T")); // Convert to ISO 8601 format

    // Calculate the difference
    const diffDays = differenceInDays(endDate, startDate);
    const diffHours = differenceInHours(endDate, startDate) % 24;
    const diffMinutes = differenceInMinutes(endDate, startDate) % 60;

    // Return formatted string
    return `${diffDays} days ${diffHours} hours ${diffMinutes + 1} minutes`;
  }


  return (
    <div className="todoList">
      {array && array.map((result, index) => (
        <section key={index}>
          <div>
            <h3>{result.task}</h3>
            <p>Deadline: {result.deadline}</p>
            <p>Time Left: {calculateTime(result.deadline,result.id)}</p>
          </div>
            <button onClick={()=>{doneBtnTask(result.id)}}>Done</button>
        </section>
      ))}
    </div>
  );
}

export default Tasks;
