import { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Login(){

let history = useNavigate();

const [username,setUsername] = useState('');
const [password,setPassword] = useState('');
const [response,setResponse] = useState();

function handleSumbit(e){
e.preventDefault();
   
let formData = new FormData();
formData.append('username',username);
formData.append('password',password);

 axios.post(""+import.meta.env.VITE_API_URL+"/login.php",formData)
 .then(res => handleResponse(res))
 .catch(err => console.error(err));

}

function handleResponse(res){
   setResponse(res.data)
   console.log(res);
  
  if(res.data.status === 1){
   history('/home');
  }

}

 return <div>
    <form onSubmit={handleSumbit}>

    <input type="text" placeholder="username..." onChange={(e)=>{setUsername(e.target.value)}} required/>
    <input type="password" placeholder="password..." onChange={(e)=>{setPassword(e.target.value)}} required />
    <button>submit</button>
    <h1>{response?.message}</h1>
    </form>

  <a onClick={()=>{history('/signup')}}>SIGNUP</a>
 </div>
}


export default Login;