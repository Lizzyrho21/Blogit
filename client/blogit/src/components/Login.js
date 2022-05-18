import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; // import our Auth0 component
import Button from "@mui/material/Button";
import '../login.css';

export const Login = () => {
  const { loginWithRedirect } = useAuth0(); // Looks for login method within auth0 component
  return (
    <div className="login-container">
      <section className="background-img">
      
      </section>
      <h1>Blogit</h1>
      <p>Blog when you want, where you want</p>
      <section className="button-container">
    <Button id="button" variant="contained" onClick={() => loginWithRedirect()}>
    
      Log in
    </Button>
    </section>
    </div>
  );
};
export default Login;
