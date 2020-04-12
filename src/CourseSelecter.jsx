import React from 'react';

//material-ui imports
import IconButton from '@material-ui/core/IconButton';


//material-ui imports for dialog box
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { MenuItem } from '@material-ui/core';


export default class CourseSelecter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    }
  }

  handleChange(value) {
    this.setState({ selected: value });
  }

  mapCoursesMenuItems(coursesJson){
    return coursesJson.map(course => {
      return(
        <MenuItem key={course._id} value={course._id}>
          {course.unit}:{course.subject}:{course.course}:{course.section} {course.courseTitle} <br />
          &nbsp; &nbsp; Instr: {course.assignedInstructor} 
        </MenuItem>
      )
    })
  }
  
  render(){
    return(

      <Select
      native={false}
      name="courseId" 
      id="courseId"
      value={this.props.courseId}
      onChange={this.props.onChange}
/*       input={<Input id="courseId" />}
 */      fullWidth
      >
        {this.mapCoursesMenuItems(this.props.courses)}

      </Select>
  
    )
  } 
}