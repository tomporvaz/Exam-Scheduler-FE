import React from 'react';



//material-ui imports for dialog box
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class LevelExamFilter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "1st Year": false,
      "2nd Year": false
    }
  }
  
  handleChange = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };
  
  
  render(){
    return(
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
      )
    }
    
  }