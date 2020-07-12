import React from 'react';
import moment from 'moment';
import { Link, Redirect, useParams } from 'react-router-dom';

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
  Input,
  MenuItem,
  Container,
  Paper
} from '@material-ui/core/';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import DateFnsUtils from '@date-io/moment';

//custom components
import CourseSelecter from './CourseSelecter.jsx'

//apiURL
let apiUrl ="https://exam-scheduler-production.glitch.me/api"

const software = [
  {
    value: "ES",
    label: "Examsoft"
  },
  {
    value: "CNV",
    label: "Canvas"
  },
  {
    value: "PT",
    label: "Canvas with ProctorTrack"
  },
  {
    value: "ATI",
    label: "ATI"
  }
]

const supportPeople = [
  {
    value: "Grittwald Grittington",
    label: "Grittwald Grittington"
  },
  {
    value: "Tom Porvaznik",
    label: "Tom Porvaznik"
  },
  {
    value: "Jason Love",
    label: "Jason Love"
  }
]




export default class ExamDetailsForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseId: this.props.examObj.courseId,
      approved: this.props.examObj.approved,
      examId: this.props.match.params.examId,
      examName: this.props.examObj.examName,
      examStart: new Date(this.props.examObj.examStart),
      examEnd: new Date(this.props.examObj.examEnd),
      examBuilding: this.props.examObj.examBuilding,
      examRoom: this.props.examObj.examRoom,
      examSoftware: this.props.examObj.examSoftware,
      supportPerson:this.props.examObj.supportPerson,
      emailFaculty: this.props.examObj.emailFaculty,
      facultyConfirmed: this.props.examObj.facultyConfirmed
    }
  }
  


  
  //TODO...
  handleClose = () => this.props.history.push('/');
  ;

  handleInputChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleCheckboxChange = (event) => {
    this.setState({[event.target.name]: !this.state[event.target.name]})
  }

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
  /* getSemestersCourses = (semesterCode) =>{
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
      this.getSemestersCourses(this.props.semester);apiUrl
    } 
     
  };*/



  submitForm = (event) => {
    let newExamObj = {
      //examId: this.state.examId,
      courseId: this.state.courseId,
      examSemester: this.props.semester,
      examName: this.state.examName,
      approved: this.state.approved,
      examStart: this.state.examStart.toISOString(),
      examEnd: this.state.examEnd.toISOString(),
      examBuilding: this.state.examBuilding,
      examRoom: this.state.examRoom,
      examSoftware: this.state.examSoftware,
      supportPerson: this.state.supportPerson,
      emailFaculty: this.state.emailFaculty,
      facultyConfirmed: this.state.facultyConfirmed
    }

    event.preventDefault();  
    putData(`${apiUrl}/exams?examId=${this.state.examId}`, newExamObj)
    .then((response) => {
      this.props.addExamToGlobalState(JSON.parse(response));
      console.log(response);
    })
    .catch(err => console.error(err))
    this.handleClose();
  }
 
  
  render(){
    
   console.log(`render in editExamForm.  What is props? ${this.props}`);
   console.log(this.props);

    return(
      <Paper id="examDetailsFormPaper">
      {/* <Container maxWidth="sm"> */}
     
      <form onSubmit={this.submitForm}>


        
        <Grid container alignItems="flex-start" spacing={2}>
          {this.props.match.params.examId}
          <Grid item xs={12} md={9}>
            <InputLabel htmlFor="courseId">Course</InputLabel>
            <CourseSelecter courses={this.props.courses} onChange={this.handleInputChange} courseId={this.state.courseId} />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField 
              name="examSemester"
              id="examSemester"
              label="Semester"
              value={this.props.semester}
              onChange={this.handleInputChange}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          
          

          <Grid item xs={12} md={9}>
            <TextField 
              name="examName"
              id="examName" 
              label="Exam Name" 
              value={this.state.examName}    

              onChange={this.handleInputChange}
              variant="filled" 
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControlLabel
              value={this.state.approved}
              control={<Checkbox
                name="approved"
                id="approved"
                checked={this.state.approved}
                onChange={this.handleCheckboxChange}
              />}
              label="Approved"
            />
          </Grid>



          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            
    {/*         Create a 3 piece date time picker: 1 date picker for date, 1 time picker for start time, and 1 time picker for end time picker
            Requires higher level functions to massage data before returning to server. */}
            {/*<Grid item xs={12} lg={6}>
               <KeyboardDateTimePicker
              margin="normal"</Grid>
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
            

            <Grid item xs={12} md={5}>
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
            

            <Grid item xs={12} md={5}>
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



          <Grid item xs={12} md={5}>
            <TextField 
              name="examBuilding"
              id="examBuilding" 
              label="Building" 
              value={this.state.examBuilding}
              onChange={this.handleInputChange}
              variant="filled" 
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <TextField 
              name="examRoom"
              id="examRoom" 
              label="Room" 
              value={this.state.examRoom}
              onChange={this.handleInputChange}
              variant="filled" 
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl style={{minWidth: 200}}>
            <InputLabel id="examSoftwareLabel">Software</InputLabel>
            <Select
              name="examSoftware"
              id="examSoftware" 
              labelId="examSoftwareLabel"
              value={this.state.examSoftware}
              onChange={this.handleInputChange}
              
              >
                {software.map((software) => {
                return(
                  <MenuItem key={software.value} value={software.value}>
                    {software.label}
                  </MenuItem>
                )
              })}
            
            </Select>
            </FormControl>
          </Grid>

            <Grid item xs={12} md={4}>
              <FormControl style={{minWidth: 200}}>
              <InputLabel id="supportPersonLabel">Support Person</InputLabel>
              <Select
                name="supportPerson"
                id="supportPerson" 
                labelId="supportPersonLabel"
                value={this.state.supportPerson}
                onChange={this.handleInputChange}
                native={false}
                >
                  {supportPeople.map((supportPerson) => {
                  return(
                    <MenuItem key={supportPerson.value} value={supportPerson.value}>
                      {supportPerson.label}
                    </MenuItem>
                  )
                })}
              
              </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} md={4}>
              <FormControlLabel
                value={this.state.emailFaculty}
                control={<Checkbox
                  name="emailFaculty"
                  id="emailFaculty"
                  checked={this.state.emailFaculty}
                  onChange={this.handleCheckboxChange}
                />}
                label="Email Faculty"
              />
            </Grid>

          <Grid item xs={6} md={4}>
            <FormControlLabel
              value={this.state.facultyConfirmed}
              control={<Checkbox
                name="facultyConfirmed"
                id="facultyConfirmed"
                checked={this.state.facultyConfirmed}
                onChange={this.handleCheckboxChange}
              />}
              label="Faculty Confirmed"
            />
          </Grid>


        </Grid>

                
        <Button component={Link} to="/" color="primary">
        Cancel
        </Button>

        <Button type="submit" color="primary">
        Add/Update
        </Button>

        </form>
        </Paper>
      

    
    )
  }
}

async function putData(url = '', data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'manual', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.text(); // parses JSON response into native JavaScript objects
}