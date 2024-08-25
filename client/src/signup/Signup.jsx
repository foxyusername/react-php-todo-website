import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "../login/login.css";

function Signup() {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [response,setResponse] = useState('');
  const [email,setEmail] = useState('');

let history = useNavigate();

  function onSubmit(e) {
    e.preventDefault(); // Prevent default form submission

    let formData = new FormData();
    formData.append('username', username);
    formData.append('password',password);
    formData.append('email',email);

    axios.post(""+import.meta.env.VITE_API_URL+"/signup.php", formData,{withCredentials:true})
      .then((res)=>handleResponse(res))
      .catch((err) => console.error(err));

  }

  function handleResponse(res){
    setResponse(res.data.message)
   console.log(res);
    if(res.data.status === 1){
     history('/home');
     console.log('redirected');
    }
  }

  return (
    <div className="loginMainDiv">
    <div className="form_header_div">
      <h1>SIGNUP</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username..."
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="email..."
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="password..."
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>

        <h1>{response}</h1>
      </form>
      
    <a onClick={()=>{history('/login')}}>LOGIN</a>
</div>
    </div>
  );
}

export default Signup;
