import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default class FilterSelectionItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  };

  selectedFilters = () => {
    console.log('selectedFilters functions!');
    let selectedItems = [];    
    for(let key in this.props.filterObject){
      if(key === 'level'){
        this.props.filterObject[key].forEach(level => {
          let levelColor = this.props.levelColors.find((levelColor) => levelColor.level === level);
          selectedItems.push(
            <div className="filterSelectedItem" style={{backgroundColor: levelColor.color}}>
              {level} 
              <div/>
              <CancelIcon fontSize="small" />
            </div>
          )
          })
        

       
      } else if(key === 'assignedInstructor'){
        this.props.filterObject[key].forEach(assignedInstructor => {
          selectedItems.push(
            <div className="filterSelectedItem" style={{backgroundColor: "#b3c7e6"}}>
              {assignedInstructor}
              <div/>
              <CancelIcon fontSize="small"/>
            </div>
          )
          })
      }
    }
    console.log(selectedItems);
    return selectedItems;
  }


  render(){
    console.log(`FilterSeletionItem props.filterObject...`);
    console.log(this.props.filterObject);
    console.log(this.props.levelColors);


    return(
      <div className="filterSelectionsContainer">
        <div className="filterSelectedItem" style={{color: "white", backgroundColor: "black"}}>
          Fall 1999
          <div/>
          <ArrowDropDownIcon fontSize="small"/>
          </div>

        {this.selectedFilters()}
      {/* <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[0].color}}>1st year</div>
      <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[1].color}}>2nd year</div> */}
      </div>
      )
    }
    
    
    
  }