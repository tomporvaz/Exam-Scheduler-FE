import React from 'react';
import './App.css';
import moment from 'moment'

//For FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listViewPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';
import { render } from 'react-dom';

//Import custom components
import ExamList from './ExamList.jsx'

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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "9909",
      semesterExams: []
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
      <div id="filterContainer">
      <h3>Filters</h3>
      </div>
      <main>
      <div id="calendar">
      <Calendar exams={this.state.semesterExams}/>
      </div>
      
      <section id="examListSection">
      <h2>Exam List</h2>
      <div id="examList">
      
      <ExamList exams={this.state.semesterExams}/>
      
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
        this.setState({semesterExams: json});
        console.log(this.state.semesterExams);
      };
    }
    
    
    
    
    
  }
  
  
    
    //component for rendering caldendar view
    class Calendar extends React.Component{
      constructor (props) {
        super(props);
        this.formatFullCalendarEvents = this.formatFullCalendarEvents.bind(this);
      }
      
      formatFullCalendarEvents(exams) {
        let events = exams.map((exam) => {
          //console.log(exam);
          return {
            title: `${exam.sectionNickname} ${exam.examName} - ${exam.assignedInstructor}`,
            start: exam.examStart,
            end: exam.examEnd  
          }
        })
        
        return events;
      }
      ;
      
      render(){
        console.log(this.formatFullCalendarEvents(this.props.exams));
        return (
          <FullCalendar 
          defaultView="timeGridWeek" 
          plugins={[ dayGridPlugin, timeGridPlugin, listViewPlugin ]} 
          ref={this.calendarComponentRef}
          events = {this.formatFullCalendarEvents(this.props.exams)}
          />
          )
          
        }
        
      }
      
      
      
      
      
      