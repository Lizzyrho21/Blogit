import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; // import our Auth0 component
import Button from "@mui/material/Button";

export const Login = () => {
  const { loginWithRedirect } = useAuth0(); // Looks for login method within auth0 component
  return (
    <Button variant="contained" onClick={() => loginWithRedirect()}>
      Log in!
    </Button>
  );
};
export default Login;
