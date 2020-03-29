import React from 'react';

//material-ui imports
import IconButton from '@material-ui/core/IconButton';


//material-ui imports for dialog box
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';


export default class ExamDetailsForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  //TODO...
  handleClose = () => {
    this.props.handleClose();
  };
  
  
  render(){
    return(
    <Dialog open={this.props.open} onClose={this.handleClose} fullWidth={false} maxWidth="xl" aria-labelledby="exam-details-form">
    <DialogTitle id="exam-details-form-title">Exam Details</DialogTitle>
    <DialogContent>
      <form action="/api/exams" method="post">
        {/* TODO: Create component with drilldown dropbox for for courses <CourseSelecter/> */}



      </form>
    </DialogContent>
  
    
    <DialogActions>
    <Button onClick={this.handleClose} color="primary">
    Cancel
    </Button>

    <Button /* TODO onClick={} */ color="primary">
    Add/Update
    </Button>

    </DialogActions>
    </Dialog>
    
    )
  }
}

