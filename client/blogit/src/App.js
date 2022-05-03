
import './App.css';
import {useAuth0} from "@auth0/auth0-react";
// import axios from "axios";
import Login from './components/Login';
import Logout from './components/Logout';
import Profile from './components/Profile';

function App() {
 const {user, isAuthenticated, isloading} = useAuth0();
  return (
   <>
  {isAuthenticated ? <>
  <Logout /> <Profile/> 
  </>
  : <Login />}
   </>
  )
}

export default App;
