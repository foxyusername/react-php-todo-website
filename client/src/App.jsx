import { lazy, Suspense } from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

const Signup=lazy(()=> import('./signup/Signup.jsx'));
const Login=lazy(()=> import('./login/Login.jsx'));
const Home=lazy(()=> import('./Home/Home.jsx'));


function App(){
return <div>
    <Router>
        <Suspense fallback={<div><h1>Loading...</h1></div>}>   
        <Routes>

         <Route path="/signup" Component={Signup}/>
         <Route path="/login" Component={Login}/>
         <Route path="/home" Component={Home} />
            
        </Routes>
        </Suspense>
    </Router>
</div>
}
export default App;