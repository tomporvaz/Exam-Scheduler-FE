import React from "react";
import { useAuth0 } from "./react-auth0-spa";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log(`isAuthenticated = ${isAuthenticated}`);

    //playing with auth0 claims
    console.log(useAuth0());
    const { getIdTokenClaims } = useAuth0();
    async function idClaims () {
      let idTokenClaims = await getIdTokenClaims();
      console.log(idTokenClaims);
    }
  
    
  
  return (
    
    <div>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      <button  onClick={() => idClaims()}>IdTokenClaims</button>
    </div>
  );
};

export default NavBar;