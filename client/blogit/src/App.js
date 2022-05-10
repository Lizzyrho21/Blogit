// Work on styling with material-ui and refactoring server + adding comments tomorrow
import './App.css';
import {useAuth0} from "@auth0/auth0-react";
// import axios from "axios";
import Login from './components/Login';
import Home from './components/Home';
// import Users from './components/Users';
import Profile from './components/Profile';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const {user, isAuthenticated,} = useAuth0();
    return (
      
    <BrowserRouter>
    <Routes>
      {isAuthenticated ? 
      <>
      <Route index element={<Home user={user} />} />
      <Route path="/profile" element={<Profile />} />
      </>
        : <Route index element={<Login />} />}

    </Routes>


      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        
    </BrowserRouter>
    )
  }


export default App;
