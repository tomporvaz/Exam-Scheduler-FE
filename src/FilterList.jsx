import React from 'react';



//material-ui imports for dialog box
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function FilterList(props){
  
  let handleChange = name => event => {
    props.update(props.filterGroup, name, event.target.checked);
  };

  function filterItemCheckboxLabels(){
    let filterItemCheckboxLabels = Object.keys(props.checkboxes).map((filterItem) => {
      return (<FormControlLabel
      control={<Checkbox checked={props.checkboxes[filterItem]} onChange={handleChange(filterItem)} value={filterItem} />}
      label={filterItem}
      />)
    })

    return filterItemCheckboxLabels;
  }
  
  
    return(
      <FormControl component="fieldset">
      <FormLabel component="legend">{props.filterLabel}</FormLabel>
      <FormGroup>
        {filterItemCheckboxLabels()}
      </FormGroup>
      </FormControl>
      )
    
    
  }