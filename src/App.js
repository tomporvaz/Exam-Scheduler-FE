import React from 'react';
import './App.css';
import moment from 'moment'

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

//Import Material UI
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';


let currentViewEvents = [
  {
    title: "FNP:Women's Exam 1",
    start: '2020-01-01 08:00',
    end: '2020-01-01 09:30'
  },
  {
    title: "ABS Peds ATI",
    start: '2020-01-01 14:00',
    end:'2020-01-01 15:30'
  }
];

//levelColors should come from server
let levelColors = [
  {
    level: "1st Year",
    color: "#E40066"
  },
  {
    level: "2nd Year",
    color: "#345995"
  },
  {
    level: "Soph",
    color: "#06B900"  
  }
]

//instructors should come from server
let instructors = [
  {
    "id": "js456",
    "name": "Smartypants, Jone"
  },
  {
    "id": "hu123",
    "name": "Up, Harry"
  },
  {
    "id": "jc890",
    "name": "Cranium, John"
  }
]

let filters = { 
    "level":["1st Year", "2nd Year"],
    "assignedInstructor":["Smartypants, Jone", "Up, Harry","Cranium, John"],
    "courseTitle":["BRAIN SCI FNDTS I","NEUROLOGY 4 BABIES","MONKEY BRAINS"],
    "examSoftware": ["Examsoft","Canvas","ATI"]
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "",
      semesterExams: [],
      currentExams:[],
      levelColors: levelColors,
      instructors: instructors,
      filters: {},
      examDetailsFormOpen: false
    }
  }
  
  calendarComponentRef = React.createRef();
  
  /*   events = this.state.semesterExams.map((exam) => {
    return {
      title: exam.examName,
      start: exam.examDate + exam.examStart,
      end: exam.examDate + exam.examEnd
    }
  }) */
  
  render(){
    console.log(`This is what filters looks like in state`);
    console.log(this.state.filters);
    return (
      <div className="App">
      <header>
      
      <h1>Exam Scheduler</h1>
      </header>

      <section id="tools">
      <ExamFilter 
      levelColors={this.state.levelColors} 
      filters={this.state.filters}
      semester={this.state.semester}
      filter={(filterObject) => this.examFilter(filterObject)}
      updateAppsSemester={(semesterCode) => this.updateAppsSemester(semesterCode)}
      />

      <IconButton id="conflictsButton">
        <WarningIcon style={{fontSize: 30}} onClick={this.handleClickOpen}/>
      </IconButton>

      <IconButton id="addExamButton">
        <AddBoxIcon style={{fontSize: 30}} onClick={this.handleExamDetailsFormOpen}/>
      </IconButton>
      <ExamDetailsForm open={this.state.examDetailsFormOpen} handleClose={this.handleExamDetailsFormClose} />
      </section>
      
      <main>
      
      <section id="calendarSection">
      {/* <h2>Calendar</h2> */}
      <div id="calendar">
      <Calendar 
      exams={this.state.currentExams} 
      ref={this.calendarComponentRef} 
      levelColors={this.state.levelColors}
      />
      </div>
      </section>
      
      <section id="examListSection">
      <h2>Exam List</h2>
      <div id="examList">
      
      <ExamList 
      exams={this.state.currentExams} 
      levelColors={this.state.levelColors}
      />
      
      </div>
      </section>
      
      </main>
      </div>
      );
    };
    
    /* componentDidMount(){
      this.updateAppsSemester(this.state.semester);
      
    } */

    getSemestersExams = (semesterCode) =>{
      const req = new XMLHttpRequest();
      req.open("GET",`https://exam-scheduler.glitch.me/api/exams?semester=${semesterCode}`,true);
      req.send();
      req.onload = () => {
        const json = JSON.parse(req.responseText);
        console.log(json);
        this.setState({
          semesterExams: json,
          currentExams: json
        });
        console.log(this.state.semesterExams);
      };
    }

    /* getSemestersFilters = (semesterCode) =>{
      const req = new XMLHttpRequest();
      req.open("GET",`https://exam-scheduler.glitch.me/api/filters?semester=${semesterCode}`,true);
      req.send();
      req.onload = () => {
        const json = JSON.parse(req.responseText);
        console.log(json);
        this.setState({
          filters: json
        });
      };
    } */

    updateAppsSemester = (semesterCode) => {
      this.getSemestersExams(semesterCode);
     /*  this.getSemestersFilters(semesterCode); */
      this.setState({
        semester: semesterCode
      })
    }

    

    /*examFilter function accepts an oject of fields, and the values by which to filter
      e.g. - 
      {
        level: ["1st Year"],
        assignedInstructors: ["Up, Harry", "Smartypants, Jone"]
      }
    */
    examFilter = (filterObject) => {
      //create filteredExams to operate on and initialize with fresh copy of this semester data
      let filteredExams = this.state.semesterExams
      //alias the filter keys to get list of field names
      const filterKeys = Object.keys(filterObject);
      
      /*
      filter exams with Array.filter testing if each field (filterKey) in the exam includes  
      at least one filter value.
      */
      filteredExams = filteredExams.filter(exam => {
        return filterKeys.every(key => {
          if (!filterObject[key].length) {return true};
          return filterObject[key].includes(exam[key]);
        })
      })

      this.setState({
        "currentExams": filteredExams
      })
    };

    handleExamDetailsFormOpen = () => {
      this.setState({
        "examDetailsFormOpen": true
      })
    };
    
    handleExamDetailsFormClose = () => {
      this.setState({
        "examDetailsFormOpen": false
      })
    };
    
  }
  
  
  
  
  
  
  
  
  