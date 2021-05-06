import React from 'react';

import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';


import SemesterSelecter from './SemesterSelecter';

export default class FilterSelectionItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {}
  };

  colors = ["#a4dbb1", "#b3c7e6", "#a6dcde", "#bbafe3", "#e0abe0", "#fcffbd", "#ffe2b0", "#ffd8cc", "#b8b8b8", "#fc86fc"];

  selectedFilters = () => {
    console.log('selectedFilters functions!');
    let selectedItems = [];
    let filterObjectKeys = Object.keys(this.props.filterObject);

    /* for(let key in this.props.filterObject){ */
    for(let i = 0; i < filterObjectKeys.length; i++){
      let currentColor = this.colors[i];
      let key = filterObjectKeys[i];

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
            <div className="filterSelectedItem" style={{backgroundColor: currentColor}}>
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
        <SemesterSelecter 
          updateAppsSemester={this.props.updateAppsSemester}
          semester={this.props.semester} 
        />

        {this.selectedFilters()}
      {/* <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[0].color}}>1st year</div>
      <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[1].color}}>2nd year</div> */}
      </div>
      )
    }
    
    
    
  }