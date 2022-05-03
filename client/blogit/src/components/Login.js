import React from 'react'
import { useAuth0 } from "@auth0/auth0-react"// import our Auth0 component

export const Login = () => {

    const { loginWithRedirect } = useAuth0() // Looks for login method within auth0 component
  return (
  <button onClick={() => loginWithRedirect()}>Log in!</button>
  )
}
export default Login;