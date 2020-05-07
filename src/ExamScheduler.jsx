import React from 'react';
import './App.css';
import moment from 'moment'
import { Route, Link } from "react-router-dom";


//For FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listViewPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';

//Import custom components
import ExamList from './ExamList.jsx'
import Calendar from './Calendar.jsx'
import ExamFilter from './ExamFilter.jsx'
import ExamDetailsForm from './ExamDetailsForm.jsx'
import ExamAddDialog from './ExamAddDialog.jsx';

//Import Material UI
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import { Popover, Card, CardHeader, CardActions, Typography, CardContent, Grid } from '@material-ui/core';



export default class ExamScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      examPopoverOpen: false,
      anchorEl: null,
      popoverExamObj: null,
      popoverExamLevelColor: null
    }
    this.props = {
      examDetailsFormOpen: false
    }
  }

  
  calendarComponentRef = React.createRef();
  
 
  render(){
    console.log(`This is what filters looks like in props`);
    console.log(this.props.filters);
    return (
      <div className="App">
      
      
      <section id="tools">
      <ExamFilter 
      levelColors={this.props.levelColors} 
      filters={this.props.filters} //I don't see this in app props so it might be used anymore
      semester={this.props.semester}
      filter={(filterObject) => this.props.examFilter(filterObject)}
      updateAppsSemester={(semesterCode) => this.props.updateAppsSemester(semesterCode)}
      />

      <IconButton id="conflictsButton">
        <WarningIcon style={{fontSize: 30}} onClick={this.handleClickOpen}/>
      </IconButton>

      <IconButton id="addExamButton"component={Link} to="/examEdit">
        <AddBoxIcon style={{fontSize: 30}}  />
      </IconButton>
      <ExamAddDialog 
        open={this.props.examDetailsFormOpen} 
        handleClose={this.handleExamDetailsFormClose} 
        semester={this.props.semester}
        courses={this.props.courses}
        addExamToGlobalState={this.props.addExamToGlobalState}
        />
        
      </section>
      
      <main>
        {/* Test route */}
        

      <section id="calendarSection">
      {/* <h2>Calendar</h2> */}
      <div id="calendar">
      <Calendar 
      exams={this.props.currentExams} 
      ref={this.calendarComponentRef}       
      levelColors={this.props.levelColors}
      />
      </div>
      </section>
      
      <section id="examListSection">
      <h2>Exam List</h2>
      <div id="examList">
      
      <ExamList 
      exams={this.props.currentExams} 
      levelColors={this.props.levelColors}
      handleExamPopover={this.handleExamPopover}
      />
      
      </div>
      </section>

      <Popover
        id="examPopover"
        open={this.state.examPopoverOpen}
        anchorEl={this.state.anchorEl}
        onClose={() => this.setState({examPopoverOpen: false, anchorEl: null})}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Card>
          <CardContent>
          <Grid container spacing={2} alignContent="flex-start">

            <Grid item container xs={12} justify="flex-end">
                <IconButton>Edit</IconButton>  
                <IconButton>Info</IconButton>
                <IconButton>Trash</IconButton>

            </Grid>
           
            <Grid item xs={12} >
              <Typography variant="h6">{this.state.popoverExamObj ? this.state.popoverExamObj.course : "course"}</Typography>
            </Grid>

            <Grid item xs={12} >
              <Typography variant="subtitle2">Arp 14 8:30 AM - 9:30 AM</Typography>
            </Grid>

          
            
              
            </Grid>
          </CardContent>
          

        </Card>
        
      </Popover>
      
      

      </main>
      </div>
      );
    };
    
    /* componentDidMount(){
      this.updateAppsSemester(this.props.semester);
      
    } */

    handleExamPopover = (event, exam, levelColor) => {
      console.log(exam);
      this.setState({
        "examPopoverOpen": true,
        "anchorEl": event.currentTarget,
        "popoverExamObj": exam,
        "popoverExamLevelColor": levelColor.color
      });
      /* console.log(levelColor);
      alert(`Hi! The level color for this exam is: ${levelColor.color}`); */
    }
    
    
  }
  
  
  
  
  
  
  
  
  