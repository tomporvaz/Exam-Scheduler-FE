import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

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