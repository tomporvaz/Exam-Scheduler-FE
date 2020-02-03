import React from 'react';

function ExamFilter(props){
  
  return(
    <div id="filterContainer">
    <h3>Filters</h3>
    <div style={{backgroundColor: props.levelColors[0].color}} >1st year</div>
    <div style={{backgroundColor: props.levelColors[1].color}}>2nd year</div>
    </div>
    )
    
  }
  
  export default ExamFilter;
  
