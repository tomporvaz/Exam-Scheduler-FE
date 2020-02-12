import React from 'react';

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
      "instructorFilters":{
        "Smartypants, Jone": false,
        "Up, Harry": false,
        "Cranium, John": false
      }
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

  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleLevelFilter = name => event => {
    this.setState({ ...this.state, level:{ ...this.state.level, [name]: event.target.checked }});
  };

  applyFilter = (field, filters) => {
    /*
    Use reduce function to create array of fliter objects 
    like [{field: level, filter: "1st Year"},{...}]
    */

    //let filterObjects = this.state.

    this.props.filter([
      {
        "field": "assignedInstructor", 
        "filter": ["Up, Harry", "Cranium, John"]
      }
    ]);
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

          <FormControl component="fieldset" /* className={classes.formControl} */>
          <FormLabel component="legend">Level</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={this.state.level["1st Year"]} onChange={this.handleLevelFilter('1st Year')} value="1st Year" />}
              label="1st Year"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.level["2nd Year"]} onChange={this.handleLevelFilter('2nd Year')} value="2nd Year" />}
              label="2nd Year"
            />
          </FormGroup>
          </FormControl>

          <FormControl component="fieldset" /* className={classes.formControl} */>
          <FormLabel component="legend">Instructors</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={this.state.instructorFilters["Smartypants, Jone"]} onChange={this.handleChange('Smartypants, Jone')} value="Smartypants, Jone" />}
              label="Smartypants, Jone"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.instructorFilters["Up, Harry"]} onChange={this.handleChange('Up, Harry')} value="Up, Harry" />}
              label="Up, Harry"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state.instructorFilters["Cranium, John"]} onChange={this.handleChange('Cranium, John')} value="Cranium, John" />}
              label="Cranium, John"
            />
          </FormGroup>
          </FormControl>

        </DialogContent>


        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
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
  


  //Below this lin
  
  