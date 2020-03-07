import React from 'react';

//components
import LevelExamFilter from './LevelExamFilter';
import InstructorExamFilter from './InstructorExamFilter';
import FilterSelectionItem from './FilterSelectionItem';
import FilterList from './FilterList';

//material-ui imports
import FilterListIcon from '@material-ui/icons/FilterList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';


//material-ui imports for dialog box
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

export default class ExamFilter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "open": false,
      "level":{
        "1st Year": false,
        "2nd Year": false
      },
      "assignedInstructor":{
        "Smartypants, Jone": false,
        "Up, Harry": false,
        "Cranium, John": false
      },
      "courseTitle": {
        "BRAIN SCI FNDTS I": false,
        "NEUROLOGY 4 BABIES": false,
        "MONKEY BRAINS": false
      },
      "previousFilterState": {
        "level":{
          "1st Year": false,
          "2nd Year": false
        },
        "assignedInstructor":[],
        "course": []
      },
      filterObject:{
        level: [],
        assignedInstructor: [],
        course: []
      }
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
      "level": this.state.previousFilterState.level,
      "assignedInstructor": this.state.previousFilterState.assignedInstructor,
      "course": this.state.previousFilterState.course
    })
  };
  
  //update filters that are checked in children components
  updateFilter = (filterGroup, field, value) => {
    console.log(`From examFilter updateFilter function ${filterGroup}, ${field}, ${value}`);
    this.setState({...this.state, [filterGroup]: {...this.state[filterGroup], [field]: value}});
    
  }
  
  componentDidUpdate(prevProps, prevState){
     console.log(this.state);
    /*if(prevState !== this.state){
      this.props.filter(
        {
          "level": this.state.level, 
          "assignedInstructor": this.state.assignedInstructor,
          "course": this.state.course
        }
        );
      } */
    }
    
    //TODO: fix this function so it doesn't wipe out state, but just
    //resets all state to false
    resetFilter = () => {
      this.setState({
        "level":{
          "1st Year": false,
          "2nd Year": false
        },
        "assignedInstructor":{
          "Smartypants, Jone": false,
          "Up, Harry": false,
          "Cranium, John": false
        },
        "courseTitle": {
          "BRAIN SCI FNDTS I": false,
          "NEUROLOGY 4 BABIES": false,
          "MONKEY BRAINS": false
        }}
        )
        
      }
      
      applyFilter = () => {
        //filter object collects the names of the filter selections by which to filter the exams
        let filterObject = {
          level: [],
          assignedInstructor: [],
          courseTitle: []
        }
        
        for (let filterGroups in filterObject){
          //filter state based on filter that are set to true
          let filterArr = [];
          for (let key in this.state[filterGroups]){
            if(this.state[filterGroups][key]) { filterArr.push(key) };
          }
          filterObject[filterGroups] = filterArr;
        }
        
        //call filter function in App.js to apply filter to this semesters exam set
        this.props.filter(
          {
            "level": filterObject.level, 
            "assignedInstructor": filterObject.assignedInstructor,
            "courseTitle": filterObject.courseTitle
          }
          );

          this.setState({
            open: false,
            previousFilterState:{
              level: this.state.level,
              assignedInstructor: this.state.assignedInstructor,
              courseTitle: this.state.courseTitle
            },
            filterObject: filterObject
          });
        }

        //this is baiscally a copy of the applyFilter function with the addition of some params
        //that can be used to remove one filterName from the filter object and pass the new
        //filter object up to the filter function in app.js.
        //This function was added for the cancle buttons on filterSelectionItems
        cancelFilter = (filterGroup, filterName) => {
          //filter object collects the names of the filter selections by which to filter the exams
          let filterObject = {
            level: [],
            assignedInstructor: [],
            courseTitle: []
          }
          
          for (let filterGroups in filterObject){
            //filter state based on filter that are set to true
            let filterArr = [];
            for (let key in this.state[filterGroups]){
              if(this.state[filterGroups][key]) { filterArr.push(key) };
            }
            filterObject[filterGroups] = filterArr;
          }

          //removes filterName from filterGroup's filterObject array
          filterObject[filterGroup] = filterObject[filterGroup].filter((name) => {
            console.log(`Name of filter to remove ${filterName} and filter to evaluate ${name} `);
            console.log(name !== filterName);
            return (name !== filterName)
          });

          
          
          //call filter function in App.js to apply filterObject to this semesters exam set
          this.props.filter(
            {
              "level": filterObject.level, 
              "assignedInstructor": filterObject.assignedInstructor,
              "courseTitle": filterObject.courseTitle
            }
            );

            //added updateFilter to cancleFilter in order to update filter state
            //the applyFilter function that the cancleFilter function is based on only manipulates
            //the filterObject, but the filter state also needs to be updated for other children 
            //components to display the correct data (e.g. LevelFilterExamList)
            this.updateFilter(filterGroup, filterName, false);
            
            this.setState({
              open: false,
              previousFilterState:{
                level: this.state.level,
                assignedInstructor: this.state.assignedInstructor,
                courseTitle: this.state.courseTitle
              },
              filterObject: filterObject
            });
          }
        
        
        
        
        closeFilter = () => {
          this.setState({
            "open": false
          })
        };
        
        render(){
          return(
            <div id="filterContainer">
            <h3 id="filterTitle">Filters</h3>
            
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
            <FilterListIcon style={{fontSize: 70}} onClick={this.handleClickOpen}/>
            </IconButton>
            
            <Dialog open={this.state.open} onClose={this.handleCancel} fullWidth={true} maxWidth="sm" aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Filters</DialogTitle>
            <DialogContent>
            
            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.level}
            filterGroup="level"
            filterLabel="Level"
            />

            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.assignedInstructor}
            filterGroup="assignedInstructor"
            filterLabel="Instructor"
            />

            <FilterList 
            update={(filterGroup, field, value) => this.updateFilter(filterGroup, field, value)}
            checkboxes={this.state.courseTitle}
            filterGroup="courseTitle"
            filterLabel="Course"
            />  



            {/* <InstructorExamFilter 
              update={(filterGroup, field, filter) => this.updateFilter(filterGroup, field, filter)}
              checkboxes={this.state.assignedInstructor}
            /> */}
            
            
            
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
        
        