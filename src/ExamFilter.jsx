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
      "1st Year": false,
      "2nd Year": false,
      "Smartypants, Jone": false,
      "Up, Harry": false,
      "Cranium, John": false
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
              control={<Checkbox checked={this.state["1st Year"]} onChange={this.handleChange('1st Year')} value="1st Year" />}
              label="1st Year"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state["2nd Year"]} onChange={this.handleChange('2nd Year')} value="2nd Year" />}
              label="2nd Year"
            />
          </FormGroup>
          </FormControl>

          <FormControl component="fieldset" /* className={classes.formControl} */>
          <FormLabel component="legend">Instructors</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={this.state["Smartypants, Jone"]} onChange={this.handleChange('Smartypants, Jone')} value="Smartypants, Jone" />}
              label="Smartypants, Jone"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state["Up, Harry"]} onChange={this.handleChange('Up, Harry')} value="Up, Harry" />}
              label="Up, Harry"
            />
            <FormControlLabel
              control={<Checkbox checked={this.state["Cranium, John"]} onChange={this.handleChange('Cranium, John')} value="Cranium, John" />}
              label="Cranium, John"
            />
          </FormGroup>
          </FormControl>

        </DialogContent>


        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
    )
  }
  }
  


  //Below this lin
  
  