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

        calendarRef = React.createRef()
        
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

        handleViewObjectOnDatesRender = (info) => {
          //console.log(this.calendarRef.current.calendar.view);
          
          //bubble up currentStart to app state, and focus examList based on app state
          console.log(`currentStart of calendar = ${info.view.currentStart}`);
        }
        
        render(){
          console.log(this.formatFullCalendarEvents(this.props.exams));

          return (
            <FullCalendar 
            defaultView="timeGridWeek" 
            height={664}
            header={{
              left: 'timeGridDay timeGridWeek, dayGridMonth',
              center: 'title',
              right: 'prev, next, today' 
          }}
            plugins={[ dayGridPlugin, timeGridPlugin, listViewPlugin ]}
            weekends={false} 
            ref={this.calendarRef}
            events = {this.formatFullCalendarEvents(this.props.exams)}
            datesRender={this.handleViewObjectOnDatesRender}
            />
            )
            
          }
          
        }
        
export default Calendar;