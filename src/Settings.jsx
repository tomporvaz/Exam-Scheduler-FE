import React from 'react';
import moment from 'moment';
import { Link, Redirect, useParams } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';


class Settings extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
 
  
  render(){
    return <p>Hello</p>
  }
}




export default withAuth0(Settings);