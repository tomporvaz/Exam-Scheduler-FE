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
import ExamPopover from './ExamPopover.jsx';

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
      handleExamPopover={this.handleExamPopoverOpen}
      />
      </div>
      </section>
      
      <section id="examListSection">
      <h2>Exam List</h2>
      <div id="examList">
      
      <ExamList 
      exams={this.props.currentExams} 
      levelColors={this.props.levelColors}
      handleExamPopover={this.handleExamPopoverOpen}
      />
      
      </div>
      </section>

      <ExamPopover
        examPopoverOpen={this.state.examPopoverOpen}
        anchorEl={this.state.anchorEl}
        popoverExamObj={this.state.popoverExamObj}
        popoverExamLevelColor={this.state.popoverExamLevelColor}
        handleExamPopoverClose={this.handleExamPopoverClose}
      />
      

      </main>
      </div>
      );
    };
    
    /* componentDidMount(){
      this.updateAppsSemester(this.props.semester);
      
    } */

    handleExamPopoverOpen = (anchorEl, exam, levelColor) => {

      console.log(anchorEl);
      
      this.setState({
        "examPopoverOpen": true,
        "anchorEl": anchorEl,
        "popoverExamObj": exam,
        "popoverExamLevelColor": levelColor
      });
      /* console.log(levelColor);
      alert(`Hi! The level color for this exam is: ${levelColor.color}`); */
    }

    handleExamPopoverClose = () => this.setState({examPopoverOpen: false, anchorEl: null});
    
    
  }
  
  
  
  
  
  
  
  
  