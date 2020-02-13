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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "9909",
      semesterExams: [],
      currentExams:[],
      levelColors: levelColors,
      instructors: instructors
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
    return (
      <div className="App">
      <header>
      
      <h1>Exam Scheduler</h1>
      </header>
      <ExamFilter 
      levelColors={this.state.levelColors} 
      instructors={this.state.instructors}
      filter={(filterObject) => this.examFilter(filterObject)}
      />
      
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
    
    componentDidMount(){
      const req = new XMLHttpRequest();
      req.open("GET",`https://exam-scheduler.glitch.me/api/exams?semester=9909`,true);
      req.send();
      req.onload = () => {
        const json = JSON.parse(req.responseText);
        //console.log(JSON.stringify(json));
        this.setState({
          semesterExams: json,
          currentExams: json
        });
        console.log(this.state.semesterExams);
      };
      console.log(this.calendarComponentRef);
      
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
    
    
    
  }
  
  
  
  
  
  
  
  
  