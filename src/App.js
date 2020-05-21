import React from 'react';
import './App.css';
import ExamScheduler from './ExamScheduler';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExamDetailsForm from './ExamDetailsForm';
import NavBar from './NavBar';
import { useAuth0 } from "./react-auth0-spa";
import Auth0Loader from './Auth0Loader';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';




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
    level: "Frsh",
    color: "#795548"
  },
  {
    level: "Soph",
    color: "#4285F4"  
  },
  {
    level: "Jrs",
    color: "#0B8043"
  },
  {
    level: "Srs",
    color: "#8F7000"
  },
  {
    level: "L1",
    color: "#8E24AA"
  },
  {
    level: "L2",
    color: "#D81B60"
  },
  {
    level: "L3",
    color: "#EF6C00"
  },
  {
    level: "L4",
    color: "#D50000"
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
      /* instructors: instructors, */
      filterObjectCopy: {},
      /* examDetailsFormOpen: false,  */
      courses: []
    }

  }




 
  render(){
/*     //from Auth0 for loading
    const { loading } = useAuth0();
    //from Auth0 for loading
    if (loading) {
      return <div>Loading...</div>;
    } */


    return (
      <div>

      <header>
        <h1><Link to="/">Exam Scheduler</Link></h1>
        <p>~</p>
        {/* <NavBar></NavBar> 
        <Link to="/profile">Profile</Link>*/}
      </header>

      <Route path="/" exact render={(props) => <Auth0Loader>
          <ExamScheduler
            {...props}
            semester={this.state.semester}
            semesterExams={this.state.semesterExams}
            currentExams={this.state.currentExams}
            levelColors={this.state.levelColors}
            courses={this.state.courses}
            //function props
            examFilter={(filterObject) => this.examFilter(filterObject)}
            updateAppsSemester={(semesterCode) => this.updateAppsSemester(semesterCode)}

            />
          </Auth0Loader>
        }
      />

      <Route path="/examEdit" render={(props) =>  <ExamDetailsForm 
            {...props} 
            semester={this.state.semester} 
            handleClose={this.handleClose} 
            courses={this.state.courses} 
            addExamToGlobalState={this.addExamToGlobalState}
          />}
        />

      {/* <Route path="/profile" component={Profile}/> */}
      <PrivateRoute path="/profile" component={Profile} />

      </div>
    )
    };

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

    /* getSemestersFilters = (semesterCode) =>{React App
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
      this.getSemestersCourses(semesterCode);
     /*  this.getSemestersFilters(semesterCode); */
      this.setState({
        semester: semesterCode
      })
    }

    componentDidMount(){
      this.updateAppsSemester(this.state.semester);
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
        "currentExams": filteredExams,
        "filterObjectCopy": filterObject
      })
    };

    //add exam to semesterExams and update UI while retaining filter
    addExamToGlobalState = (examObj) => {
      let newSemesterExams = [...this.state.semesterExams, examObj];
      newSemesterExams.sort((a, b) => {
        return new Date(a.examStart).getTime() - new Date(b.examStart).getTime();
      })

      this.setState({
        semesterExams: newSemesterExams
      })
      //examFilter needs to be fired to update currentExams, as well as reapply filter
      //filterObjectCopy is sloppy, and it probably should be the canonical source for all components
      //TODO: delete filterObject from examFilter, and update all sources to use filterObjectCopy in App.js
      this.examFilter(this.state.filterObjectCopy);
    }

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
  
  
  
  
  
  
  
  
  