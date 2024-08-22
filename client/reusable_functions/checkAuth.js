import axios from "axios";

const checkAuth = (setIsAuth)=>{

    axios.get(import.meta.env.VITE_API_URL + '/authenticate.php',{withCredentials:true})
    .then(res => handleResponse(res))
    .catch(err => console.log(err));
    
    function handleResponse(res){
      if(res.data.status === 1){
        setIsAuth(true);
    }else{
        setIsAuth(false);

      }
    }
    
}

export {checkAuth};