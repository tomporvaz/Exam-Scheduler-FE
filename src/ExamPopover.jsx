import React from 'react';
import './App.css';
import moment from 'moment';

//Import Material UI
import IconButton from '@material-ui/core/IconButton';
import { Popover, Card, CardHeader, CardActions, Typography, CardContent, Grid } from '@material-ui/core';



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
        <Card>
          <CardContent>
          <Grid container spacing={2} alignContent="flex-start">

            <Grid item container xs={12} justify="flex-end">
                <IconButton>Edit</IconButton>  
                <IconButton>Info</IconButton>
                <IconButton>Trash</IconButton>

            </Grid>
           
            <Grid item xs={12} >
              <Typography variant="h6">{sectionNickname}  {examName}</Typography>
            </Grid>

            <Grid item xs={12} >
              <Typography variant="subtitle1">{examDate} {examStartTime} - {examEndTime}</Typography>
            </Grid>

            <Grid item xs={2} >
              <Typography variant="overline">Building</Typography>
            </Grid>
            <Grid item xs={2} >
              <Typography variant="overline">Room</Typography>
            </Grid>
            <Grid item xs={8} >
              <Typography variant="caption"></Typography>
            </Grid>

            <Grid item xs={2} >
              <Typography variant="body1">{building}</Typography>
            </Grid>
            <Grid item xs={2} >
              <Typography variant="body1">{room}</Typography>
            </Grid>
            <Grid item xs={8} >
              <Typography variant="body1"></Typography>
            </Grid>

            <Grid item xs={2} >
              <Typography variant="overline">Instructor</Typography>
            </Grid>
            <Grid item xs={2} >
              <Typography variant="overline">Level</Typography>
            </Grid>
            <Grid item xs={8} >
              <Typography variant="caption"></Typography>
            </Grid>

            <Grid item xs={2} >
              <Typography variant="body1">{assignedInstructor}</Typography>
            </Grid>
            <Grid item xs={2} container>
                <div className="levelColorDot" 
                style={{
                  backgroundColor: (levelColor ? levelColor : "grey"),
                   margin: 0               
                }}></div>&nbsp;

              <Typography variant="body1">{level}</Typography>
            </Grid>
            <Grid item xs={8} >
              <Typography variant="body1"></Typography>
            </Grid>

          
            
              
            </Grid>
          </CardContent>
          

        </Card>
        
      </Popover>)
   
      }
      
      export default ExamList;