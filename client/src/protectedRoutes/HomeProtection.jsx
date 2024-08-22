import { useEffect,useState } from "react";
import { Outlet,Navigate } from "react-router-dom";

import { checkAuth } from "../../reusable_functions/checkAuth";

function HomeProtection(){
 
const [isAuth,setIsAuth] = useState(null);

useEffect(()=>{
    checkAuth(setIsAuth)
},[])

if(isAuth === null) return <div><h1>Loading...</h1></div>
if(isAuth === true) return <Outlet />
if(isAuth === false) return <Navigate to='/login' />
}

export default HomeProtection;