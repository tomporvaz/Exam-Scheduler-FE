import React from 'react';
import './App.css';
import moment from 'moment';

import EditExamForm from './EditExamForm.jsx';

//Import Material UI
import IconButton from '@material-ui/core/IconButton';
import { Popover, Card, CardHeader, CardActions, Typography, CardContent, Grid } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, Route } from 'react-router-dom';

function ExamList(props){


    let sectionNickname = props.popoverExamObj ? props.popoverExamObj.sectionNickname : "sectionNickname";
    let examName = props.popoverExamObj ? props.popoverExamObj.examName : "examName";
    let building = props.popoverExamObj ? props.popoverExamObj.building : "building";
    let room = props.popoverExamObj ? props.popoverExamObj.room : "room";
    let assignedInstructor = props.popoverExamObj ? props.popoverExamObj.assignedInstructor : "assignedInstructor";
    let level = props.popoverExamObj ? props.popoverExamObj.level : "level";
    let levelColor = props.popoverExamLevelColor ? props.popoverExamLevelColor : "#000"; 
    let examDate = props.popoverExamObj ? moment(props.popoverExamObj.examStart).format('MMM D') : moment().format('MMM D');
    let examStartTime = props.popoverExamObj ? moment(props.popoverExamObj.examStart).format('h:mm a') : moment().format('h:mm a');
    let examEndTime = props.popoverExamObj ? moment(props.popoverExamObj.examEnd).format('h:mm a') : moment().format('h:mm a');
    let examId = props.popoverExamObj ? props.popoverExamObj.examId : "examId";

    console.log(props.popoverExamObj);

    return(<Popover
        id="examPopover"
        open={props.examPopoverOpen}
        anchorEl={props.anchorEl}
        onClose={props.handleExamPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}


      >
        <Card         style={{maxWidth: 500}}>
          <CardContent>
          <Grid container spacing={2} alignContent="flex-start">

            <Grid item container xs={12} justify="flex-end">
                <IconButton 
                  id="editExamButton"
                  component={Link} 
                  to={`/editExam/${examId}`}
                >
                  <EditIcon/>
                </IconButton>  
                
                <IconButton>
                  <InfoIcon/>
                </IconButton>
                
                <IconButton>
                  <DeleteIcon/>
                </IconButton>

            </Grid>
           
            <Grid item xs={12} >
              <Typography variant="h6">{sectionNickname}  {examName}</Typography>
            </Grid>

            <Grid item xs={12} >
              <Typography variant="subtitle1">{examDate} {examStartTime} - {examEndTime}</Typography>
            </Grid>

            <Grid item xs={6} md={4}>
              <Typography variant="overline">Building</Typography>
              <Typography variant="body1">{building}</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="overline">Room</Typography>
              <Typography variant="body1">{room}</Typography>
            </Grid>
            <Grid item xs={0} md={4} >
              <Typography variant="body1"></Typography>
            </Grid>

            <Grid item xs={12} md={4} container>
              <Grid item xs={12}><Typography variant="overline">Instructor</Typography></Grid>
              <Grid item xs={12}><Typography variant="body1">{assignedInstructor}</Typography></Grid>
            </Grid>

            <Grid item xs={12} md={4} container>
                <Grid item xs={12}><Typography variant="overline">Level</Typography></Grid>
                <Grid item xs={12} container>
                <Grid item xs={2}>
                    <div className="levelColorDot" 
                    style={{
                      backgroundColor: (levelColor ? levelColor : "grey"),
                      margin: ".25rem 0"               
                    }}></div>
                  </Grid>

                  <Grid item xs={10}><Typography variant="body1">{level}</Typography></Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} >
              <Typography variant="body1"></Typography>
            </Grid>

          
            
              
            </Grid>
          </CardContent>
          

        </Card>
  {/*       
        <Route path="/editExam" render={(props) =>  <EditExamForm 
            {...props} 
            semester={this.state.semester} 
            handleClose={this.handleClose} 
            courses={this.state.courses} 
            addExamToGlobalState={this.addExamToGlobalState}
          />}
        /> */}

      </Popover>
      

      
      )
   
      }


      
      export default ExamList;