import React from 'react';
import './App.css';
import ExamScheduler from './ExamScheduler';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class App extends React.Component {
 
  render(){

    return (
      <Route path="/" exact component={ExamScheduler} />
    )
    };
  }
  
  
  
  
  
  
  
  
  