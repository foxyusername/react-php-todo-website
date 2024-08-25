import axios from 'axios';

const removeTask = (taskId)=>{

let formData = new FormData();

formData.append('taskId',taskId);

axios.post(import.meta.env.VITE_API_URL + '/todo_managment/removeTask.php',formData)
.then(res => {
    console.log('removed task with id: '+taskId+'')
})
.catch(err => alert(err))

}


export {removeTask};