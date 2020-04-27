import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();
 
  const fn = async () => {
          await loginWithRedirect({
            appState: {targetUrl: window.location.pathname}
          });
        };

  return <Route path={path} render={props =>
    isAuthenticated === true ? (<Component {...props} />) : ( fn() )
}/>
}

export default PrivateRoute;