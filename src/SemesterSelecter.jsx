import React from 'react';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';


import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const options = {
  //'Fall 1999': '9909',
  'Spring 2020': '2001',
  'Summer 2020': '2007',
  'Fall 2020': '2009'
};

export default class SemesterSelecter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedSemester: 'Fall 2020'
    }
    
  };
anchorRef = React.createRef(null);

  handleClick = () => {
    console.info(`You clicked ${options[this.state.selectedIndex]}`);
  };

  handleMenuItemClick = (event, option) => {
    this.props.updateAppsSemester(options[option]);
    console.log(options[option]);
    this.setState({
      selectedSemester: option,
      open: false
    })
  };

  handleToggle = () => {
   this.setState({
     open: !this.state.open
   })
  };

  handleClose = event => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
      return;
    }

    this.setState({
      open: false
    })
  };

/*    componentDidMount(){
    this.props.updateAppsSemester(options[this.state.selectedSemester]);
  }  */

  

  render(){
    return (
          <div className="semesterSelecter" style={{color: "white", backgroundColor: "black"}} ref={this.anchorRef}>
          {this.state.selectedSemester}
          <div/>
          <IconButton size="small" color="inherit" onClick={this.handleToggle}>
          <ArrowDropDownIcon fontSize="small"/>
          </IconButton>
          


          <Popper open={this.state.open} anchorEl={this.anchorRef.current} role={undefined} transition >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList id="split-button-menu">
                      {Object.keys(options).map((option, index) => (
                        <MenuItem
                          key={option}
                          selected={index === this.selectedIndex}
                          onClick={event => this.handleMenuItemClick(event, option)}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </div>
    );

    return(
        <div className="filterSelectedItem" style={{color: "white", backgroundColor: "black"}}>
          Fall 1999
          <div/>
          <IconButton size="small" color="inherit">
          <ArrowDropDownIcon fontSize="small"/>
          </IconButton>
          </div>
      )
    }
  }