import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';


import SemesterSelecter from './SemesterSelecter';

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
              <IconButton size="small" color="inherit" onClick={() => this.props.cancelFilter('level', level)}>
              <CancelIcon fontSize="small" />
              </IconButton>
            </div>
          )
          })
        

       
      } else /* if(key === 'assignedInstructor') */{
        this.props.filterObject[key].forEach(filterItem => {
          selectedItems.push(
            <div className="filterSelectedItem" style={{backgroundColor: "#b3c7e6"}}>
              {filterItem}
              <div/>
              <IconButton 
              size="small" 
              color="inherit" 
              onClick={() => this.props.cancelFilter(key, filterItem)}
              >
              <CancelIcon fontSize="small" />
              </IconButton>
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
        <SemesterSelecter updateAppsSemester={this.props.updateAppsSemester} />

        {this.selectedFilters()}
      {/* <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[0].color}}>1st year</div>
      <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[1].color}}>2nd year</div> */}
      </div>
      )
    }
    
    
    
  }