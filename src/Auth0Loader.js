import React from "react";
import { useAuth0 } from "./react-auth0-spa";

function Auth0Loader({ children }) {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return ( 
    <div>
      { children }
    </div>
    
  );
}

export default Auth0Loader;