import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Home(){

let history = useNavigate();

function handleClick(){
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

return <div>
<button onClick={handleClick}>logout</button>
 </div>
}

export default Home;