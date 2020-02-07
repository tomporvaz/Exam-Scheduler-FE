import React from 'react';

//material-ui imports
import FilterListIcon from '@material-ui/icons/FilterList';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';

//material-ui imports for dialog box
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class ExamFilter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      "open": false
    }
  }

  handleClickOpen = () => {
    this.setState({
      "open": true
    })
  };

  handleClose = () => {
    this.setState({
      "open": false
    })
  };

  render(){
  return(
    <div id="filterContainer">
    <FilterListIcon style={{fontSize: 70}}/>

    <div className="filterSelectionsContainer">
      <div className="filterSelectedItem" style={{color: "white", backgroundColor: "black"}}>Fall 1999</div>
    <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[0].color}} >1st year</div>
    <div className="filterSelectedItem" style={{backgroundColor: this.props.levelColors[1].color}}>2nd year</div>

    </div>
    <IconButton>
    <AddBoxIcon style={{fontSize: 60}} onClick={this.handleClickOpen}/>
    </IconButton>

    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
    )
  }
  }
  


  //Below this lin
  
  