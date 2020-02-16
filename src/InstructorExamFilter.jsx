import React from 'react';



//material-ui imports for dialog box
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class InstructorExamFilter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "Smartypants, Jone": false,
      "Up, Harry": false,
      "Cranium, John": false
    }
  }
  
  handleChange = name => event => {
    this.props.update('assignedInstructor', name, event.target.checked);;
  };
  
  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
      let filterArr = [];
      for (let key in this.state){
        if(this.state[key]) { filterArr.push(key) };
      }
      this.props.update('assignedInstructor', filterArr);
    }
  };  
  
  componentDidMount(){
    /* let newState = {};
    this.props.checkboxes.forEach(field => newState[field] = true);
    console.log(newState);
    this.setState(newState) */
  }
  
  
  render(){
    return(
      <FormControl component="fieldset" /* className={classes.formControl} */>
      <FormLabel component="legend">Instructors</FormLabel>
      <FormGroup>
      <FormControlLabel
      control={<Checkbox checked={this.props.checkboxes["Smartypants, Jone"]} onChange={this.handleChange('Smartypants, Jone')} value="Smartypants, Jone" />}
      label="Smartypants, Jone"
      />
      <FormControlLabel
      control={<Checkbox checked={this.props.checkboxes["Up, Harry"]} onChange={this.handleChange('Up, Harry')} value="Up, Harry" />}
      label="Up, Harry"
      />
      <FormControlLabel
      control={<Checkbox checked={this.props.checkboxes["Cranium, John"]} onChange={this.handleChange('Cranium, John')} value="Cranium, John" />}
      label="Cranium, John"
      />
      </FormGroup>
      </FormControl>
      )
    }
    
  }
  
  
  