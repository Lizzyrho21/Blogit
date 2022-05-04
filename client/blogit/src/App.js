
import './App.css';
import {useAuth0} from "@auth0/auth0-react";
// import axios from "axios";
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const {user, isAuthenticated,} = useAuth0();
    return (
    <>
    {isAuthenticated ? <>
    <Home user={user}/>
    </>
    : <Login />}
    </>
    )
  }


export default App;
