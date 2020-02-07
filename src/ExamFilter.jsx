import React from 'react';

//material-ui imports
import FilterListIcon from '@material-ui/icons/FilterList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';

function ExamFilter(props){
  
  return(
    <div id="filterContainer">
    <FilterListIcon style={{fontSize: 70}}/>

    <div className="filterSelectionsContainer">
      <div className="filterSelectedItem" style={{color: "white", backgroundColor: "black"}}>Fall 1999</div>
    <div className="filterSelectedItem" style={{backgroundColor: props.levelColors[0].color}} >1st year</div>
    <div className="filterSelectedItem" style={{backgroundColor: props.levelColors[1].color}}>2nd year</div>

    </div>
    <IconButton>
    <AddBoxIcon style={{fontSize: 60}} />
    </IconButton>
    
    </div>
    )
    
  }
  
  export default ExamFilter;
  
  