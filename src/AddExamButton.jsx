import React from 'react';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
const { IconButton } = require("@material-ui/core");

export default function AddExamButton () {
  let { user } = useAuth0();
  /*
  https://examscheduler.netlify.app/roles is set in auth0 rules to set app_metadata
  TODO: setup an easier way to mangae roles.
  */
  let userRoles = (user ? (user['https://examscheduler.netlify.app/roles'] ? user['https://examscheduler.netlify.app/roles'] : ['user']) : ['user']);  
  console.log(userRoles);
  
  return (
    <div>
     {userRoles.includes('admin') && <IconButton id="addExamButton"component={Link} to="/addExam">
    <AddBoxIcon style={{fontSize: 30}}  />
    </IconButton>}
    
    </div>
   
    )
  }
