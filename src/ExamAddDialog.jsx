import React from 'react';

//material-ui imports for dialog box
import {
  Dialog
} from '@material-ui/core/';

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


//custom components
import ExamDetailsForm from './ExamDetailsForm.jsx'

export default function ExamAddDialog (props) {
  return(
    <div>
    <Dialog open={props.open} onClose={props.handleClose} /* fullScreen */ fullWidth={false} maxWidth="lg" aria-labelledby="exam-details-form">
    <DialogTitle id="exam-details-form-title">Add Exam</DialogTitle>
    <DialogContent>
      <ExamDetailsForm semester={props.semester} handleClose={props.handleClose} courses={props.courses} addExamToGlobalState={props.addExamToGlobalState}/>
    </DialogContent>
    </Dialog> 
    </div>
    )
  }
  