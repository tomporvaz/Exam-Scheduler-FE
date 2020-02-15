import React from 'react';

//components
import LevelExamFilter from './LevelExamFilter';
import InstructorExamFilter from './InstructorExamFilter';

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
      "level":[],
      "assignedInstructor":[],
      "course": []
    }
  }

  handleClickOpen = () => {
    this.setState({
      "open": true
    })
  };

  handleClose = () => {
    this.setState({
      "open": false
    })
  };

  //update filters that are checked in children components
  updateFilter = (field, filter) => {
    this.setState({...this.state, [field]: filter})
  }

  componentDidUpdate(prevProps, prevState){
    console.log(this.state);
    if(prevState !== this.state){
      this.props.filter(
        {
          "level": this.state.level, 
          "assignedInstructor": this.state.assignedInstructor,
          "course": this.state.course
        }
      );
    }
  }

  resetFilter = () => {
    this.setState(
      {
        "level": [], 
        "assignedInstructor": [],
        "course": []
      }
    )

  }




  closeFilter = () => {
    this.setState({
      "open": false
    })
  };

  render(){
  return(
    <div id="filterContainer">
    <FilterListIcon style={{fontSize: 70}}/>

    <div className="filterSelectionsContainer">
    <div className="filterSelectedItem" style={{color: "white", backgroundColor: "black"}}>Fall 1999</div>
    <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[0].color}} >1st year</div>
    <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[1].color}}>2nd year</div>

    </div>
    <IconButton>
    <AddBoxIcon style={{fontSize: 60}} onClick={this.handleClickOpen}/>
    </IconButton>

    <Dialog open={this.state.open} onClose={this.handleClose} fullWidth={true} maxWidth="sm" aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Filters</DialogTitle>
        <DialogContent>

          <LevelExamFilter 
            update={(field, filter) => this.updateFilter(field, filter)}
            checkedboxes={this.state.level}
            />
          <InstructorExamFilter 
            update={(field, filter) => this.updateFilter(field, filter)}
            checkedboxes={this.state.assignedInstructor}
          />



        </DialogContent>


        <DialogActions>
          <Button onClick={this.resetFilter} color="primary">
            Reset
          </Button>
          <Button onClick={() => this.closeFilter()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
    )
  }
  }
  


  //Below this lin
  
  