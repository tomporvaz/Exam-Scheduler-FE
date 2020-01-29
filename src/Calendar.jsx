import React from 'react';

//For FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listViewPlugin from '@fullcalendar/list';
import FullCalendar from '@fullcalendar/react';




    //component for rendering caldendar view
    class Calendar extends React.Component{
        constructor (props) {
          super(props);
          this.formatFullCalendarEvents = this.formatFullCalendarEvents.bind(this);
        }
        
        formatFullCalendarEvents(exams) {
          let events = exams.map((exam) => {
            //console.log(exam);
            return {
              title: `${exam.sectionNickname} ${exam.examName} - ${exam.assignedInstructor}`,
              start: exam.examStart,
              end: exam.examEnd  
            }
          })
          
          return events;
        }
        ;
        
        render(){
          console.log(this.formatFullCalendarEvents(this.props.exams));
          return (
            <FullCalendar 
            defaultView="timeGridWeek" 
            width={'650px'}
            height={'500px'}
            //aspectRatio={'1.3'}
            plugins={[ dayGridPlugin, timeGridPlugin, listViewPlugin ]} 
            ref={this.props.ref}
            events = {this.formatFullCalendarEvents(this.props.exams)}
            />
            )
            
          }
          
        }
        
export default Calendar;