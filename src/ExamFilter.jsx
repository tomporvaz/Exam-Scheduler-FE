import React from 'react';

//components

import FilterSelectionItem from './FilterSelectionItem';
import FilterList from './FilterList';

//material-ui imports
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';


//material-ui imports for dialog box
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class ExamFilter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "open": false,
      "filters": {},
      "previousFilterState": {},
      "filterObject":{},
      "filterJson": {}
    }
  }
  
  handleClickOpen = () => {
    this.setState({
      "open": true
    })
  };
  
  handleCancel = () => {
    this.setState({
      "open": false,
      "filters": this.state.previousFilterState.filters
    })
  };
  
  //update filters that are checked in children components
  updateFilter = (filterGroup, field, value) => {
    console.log(`From examFilter updateFilter function ${filterGroup}, ${field}, ${value}`);
    this.setState(
      {
        ...this.state,
        filters: {
          ...this.state.filters, 
          [filterGroup]: {
            ...this.state.filters[filterGroup], 
            [field]: value
          }
        }
      }
    );
  }
  
    resetFilter = () => {
      this.setState({
        filters: this.createFiltersState(this.state.filterJson)
      }
        )
    }

      //component did mount grabs fitlers from props, and builds state.filters
/*       componentDidMount(){
        this.getSemestersFilters(this.props.semester)
      } */

      componentDidUpdate(prevProps){
        if(prevProps.semester !== this.props.semester){
          this.getSemestersFilters(this.props.semester)
        }
      };
      
      getSemestersFilters = (semesterCode) =>{
        const req = new XMLHttpRequest();
        req.open("GET",`https://exam-scheduler.glitch.me/api/filters?semester=${semesterCode}`,true);
        req.send();
        req.onload = () => {
          const json = JSON.parse(req.responseText);
          console.log(json);
          this.setState({
            filters: this.createFiltersState(json),
            filterObject: {},
            previousFilterState: {
              filters: this.createFiltersState(json)
            },
            filterJson: json
          })
        };
      }
  

      createFiltersState = (filterJson) => {
        let filterState = {};
        for(let filterGroup in filterJson){
          let tempFilterGroupObj = {};
          for(let filterField of filterJson[filterGroup]){
            tempFilterGroupObj[filterField] = false;
          }
          filterState[filterGroup] = tempFilterGroupObj;
        }
        console.log(filterState);
        return(filterState);
      }
      
      applyFilter = () => {
        //filtersKeys dynamically builds an array of filterGroups from this.state.filters
        let filtersKeys = Object.keys(this.state.filters);

        //filter object collects the names of the filter selections by which to filter the exams
        let filterObject = {}
        
        for (let filterGroups of filtersKeys){
          //filter state based on filter that are set to true
          let filterArr = [];
          for (let key in this.state.filters[filterGroups]){
            if(this.state.filters[filterGroups][key]) { filterArr.push(key) };
          }
          filterObject[filterGroups] = filterArr;
        }
        
        //call filter function in App.js to apply filter to this semesters exam set
        this.props.filter(filterObject);

          this.setState({
            open: false,
            previousFilterState:{
              filters: this.state.filters
            },
            filterObject: filterObject
          });
        }


        //this is baiscally a copy of the applyFilter function with the addition of some params
        //that can be used to remove one filterName from the filter object and pass the new
        //filter object up to the filter function in app.js.
        //This function was added for the cancle buttons on filterSelectionItems
        cancelFilter = (filterGroup, filterName) => {
          //filtersKeys dynamically builds an array of filterGroups from this.state.filters
          let filtersKeys = Object.keys(this.state.filters);
          
          //filter object collects the names of the filter selections by which to filter the exams
          let filterObject = {}
          
          for (let filterGroups of filtersKeys){
            //filter state based on filter that are set to true
            let filterArr = [];
            for (let key in this.state.filters[filterGroups]){
              if(this.state.filters[filterGroups][key]) { filterArr.push(key) };
            }
            filterObject[filterGroups] = filterArr;
          }

          //removes filterName from filterGroup's filterObject array
          filterObject[filterGroup] = filterObject[filterGroup].filter(name => name !== filterName);
          
          //call filter function in App.js to apply filterObject to this semesters exam set
          this.props.filter(filterObject);

            //added updateFilter to cancleFilter in order to update filter state
            //the applyFilter function that the cancleFilter function is based on only manipulates
            //the filterObject, but the filter state also needs to be updated for other children 
            //components to display the correct data (e.g. LevelFilterExamList)
            this.updateFilter(filterGroup, filterName, false);
            
            this.setState({
              open: false,
              previousFilterState:{
                filters: this.state.filters
              },
              filterObject: filterObject
            });
          }

        //dynamically build filterLists based on state.filters


        
        render(){
          console.log(`ExamFilter state:`);
          console.log(this.state);
          return(
            <div id="filterContainer">
            
            <FilterSelectionItem 
              filterObject={this.state.filterObject} 
              levelColors={this.props.levelColors}
              updateAppsSemester={this.props.updateAppsSemester}
              cancelFilter={(filterGroup, field) => {
                this.cancelFilter(filterGroup, field)
                }
              }
            />
            
            <IconButton id="filterButton">
            <FilterListIcon style={{fontSize: 30}} onClick={this.handleClickOpen}/>
            </IconButton>
            
            <Dialog open={this.state.open} onClose={this.handleCancel} fullWidth={false} maxWidth="xl" aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Filters</DialogTitle>
            <DialogContent>
            
            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.filters.level}
            filterGroup="level"
            filterLabel="Level"
            />

            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.filters.assignedInstructor}
            filterGroup="assignedInstructor"
            filterLabel="Instructor"
            />

            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.filters.courseTitle}
            filterGroup="courseTitle"
            filterLabel="Course"
            />  

            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.filters.examSoftware}
            filterGroup="examSoftware"
            filterLabel="Software"
            />  
            
            </DialogContent>
            
            <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
            Cancel
            </Button>
            <Button onClick={this.resetFilter} color="primary">
            Reset
            </Button>
            <Button onClick={() => this.applyFilter()} color="primary">
            Apply
            </Button>
            </DialogActions>
            </Dialog>
            
            </div>
            )
          }
        }
        
        