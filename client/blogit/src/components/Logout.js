import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const Logout = () => {
  const { logout } = useAuth0();
  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Logout
    </Button>
  );
};

export default Logout;
