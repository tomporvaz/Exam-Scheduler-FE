import React from 'react';
import moment from 'moment';

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
import Grid from  '@material-ui/core/Grid';
import {
  Checkbox,
  FormControlLabel,
  Input
} from '@material-ui/core/';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/moment';

//custom components
import CourseSelecter from './CourseSelecter.jsx'




export default class ExamDetailsForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      approved: false,
      examStart: new Date(),
      examEnd: new Date()
    }
  }
  
  //TODO...
  handleClose = () => {
    this.props.handleClose();
  };

  handleCheckApproved = () => {
    this.setState({approved: !this.state.approved})
  }
  
  handleExamStartChange = (date) => {
    this.setState({examStart: date})
  }

  handleExamEndChange = (date) => {
    this.setState({examEnd: date})
  }




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

    //Fetch courses based on current semester
    postNewExam = () =>{
      const req = new XMLHttpRequest();
      req.open("POST",`https://exam-scheduler.glitch.me/api/exams`,true);
      req.send(`examStart: ${this.state.examStart}`);
    }



  componentDidUpdate(prevProps, prevState){
    if(prevProps.semester !== this.props.semester){
      this.getSemestersCourses(this.props.semester);
    }
     
  };

  submitForm = () => postData("https://exam-scheduler.glitch.me/api/exams", {examStart: this.state.examStart.toISOString()});
 
  
  render(){
    

    return(
    <Dialog open={this.props.open} onClose={this.handleClose} fullScreen fullWidth={false} maxWidth="lg" aria-labelledby="exam-details-form">
    <DialogTitle id="exam-details-form-title">Add Exam</DialogTitle>
    <DialogContent>
      <form onSubmit={this.submitForm}>
      <FormControl  style={{minWidth: 120}} >  

        
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={9}>
            <InputLabel htmlFor="course">Course</InputLabel>
            <CourseSelecter courses={this.state.courses}/>
          </Grid>

          <Grid item xs={3}>
            <TextField 
              name="examSemester"
              id="examSemester"
              label="Semester"
              value={this.props.semester}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>

          <Grid item xs={9}>
            <TextField 
              name="examName"
              id="examTitle" 
              label="Exam Title" 
              variant="filled" 
              fullWidth
            />
          </Grid>

          <Grid item xs={3}>
            <FormControlLabel
              value={this.state.approved}
              control={<Checkbox
                name="approved"
                id="approved"
                checked={this.state.approved}
                onChange={this.handleCheckApproved}
              />}
              label="Approved"
            />
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
    {/*         Create a 3 piece date time picker: 1 date picker for date, 1 time picker for start time, and 1 time picker for end time picker
            Requires higher level functions to massage data before returning to server. */}
            {/*<Grid item xs={12} lg={6}>
               <KeyboardDateTimePicker
              margin="normal"
              id="examDate"
              label="Exam Date"
              format="MM/DD/YYYY"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />  
            </Grid>*/}
            

            <Grid item xs={12} md={6}>
            <KeyboardDateTimePicker
              margin="normal"
              name="examStart"
              id="examStart"
              label="Start Time"
              value={this.state.examStart} 
              //inputValue={this.state.examStart}
              onChange={this.handleExamStartChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              />
              
            </Grid> 

            <Grid item xs={12} md={6}>
              <KeyboardDateTimePicker
                margin="normal"
                name="examEnd"
                id="examEnd"
                label="End Time"
                value={this.state.examEnd}
                //inputValue={this.state.examEnd}
                onChange={this.handleExamEndChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>

            
          </MuiPickersUtilsProvider>

   {/*        <Grid item xs={12} md={6}>

            <TextField
              margin="normal"
              type="datetime-local"
              name="examStart"
              id="examStart"
              label="Start Time"
              defaultValue="2020-04-01T08:00"
              inputValue={this.state.examStart}
              onChange={this.handleExamStartChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              />
              
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                type="datetime-local"
                name="examEnd"
                id="examEnd"
                label="End Time"
                defaultValue="2020-04-01T09:30"
                inputValue={this.state.examEnd}
                onChange={this.handleExamEndChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid> */}
        </Grid>



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

async function postData(url = '', data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}