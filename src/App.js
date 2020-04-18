import React from 'react';
import './App.css';
import ExamScheduler from './ExamScheduler';



export default class App extends React.Component {
 
  render(){

    return (
      <Route path="/" exact component={ExamScheduler} />
    )
    };
  }
  
  
  
  
  
  
  
  
  