import React from 'react';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';

export default class SemesterSelecter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  };

  

  render(){
    return(
        <div className="filterSelectedItem" style={{color: "white", backgroundColor: "black"}}>
          Fall 1999
          <div/>
          <IconButton size="small" color="inherit">
          <ArrowDropDownIcon fontSize="small"/>
          </IconButton>
          </div>
      )
    }
  }