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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import CourseSelecter from './CourseSelecter.jsx'


export default class ExamDetailsForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    }
  }
  
  //TODO...
  handleClose = () => {
    this.props.handleClose();
  };



  //Fetch courses based on current semester
  getSemestersCourses = (semesterCode) =>{
    const req = new XMLHttpRequest();
    req.open("GET",`https://exam-scheduler.glitch.me/api/courses?semester=${semesterCode}`,true);
    req.send();
    req.onload = () => {
      const json = JSON.parse(req.responseText);
      console.log(json);
      this.setState({
        courses: json
      });
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.semester !== this.props.semester){
      this.getSemestersCourses(this.props.semester);
    }
     
  };
 
  
  render(){
    

    return(
    <Dialog open={this.props.open} onClose={this.handleClose} fullWidth={false} maxWidth="xl" aria-labelledby="exam-details-form">
    <DialogTitle id="exam-details-form-title">Add Exam</DialogTitle>
    <DialogContent>
      <form action="https://exam-scheduler.glitch.me/api/exams" method="post">
      <FormControl style={{minWidth: 120}}>  
        <InputLabel htmlFor="course">Course</InputLabel>
        <CourseSelecter courses={this.state.courses}/>

        <TextField 
          name="examSemester"
          id="examSemester"
          label="Semester"
          value={this.props.semester}
          InputProps={{
            readOnly: true
          }}
          variant="filled"
        />

        <TextField 
          name="examTitle"
          id="examTitle" 
          label="Exam Title" 
          variant="filled" 
        />




      </FormControl>
          <DialogActions>
        <Button onClick={this.handleClose} color="primary">
        Cancel
        </Button>

        <Button type="submit" color="primary">
        Add/Update
        </Button>

        </DialogActions>
      </form>
    </DialogContent>
  
    

    </Dialog>
    
    )
  }
}

