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
            let levelColor = this.props.levelColors.find(levelColor => levelColor.level == exam.level);
            //console.log(exam);
            return {
              title: `${exam.sectionNickname} ${exam.examName} - ${exam.assignedInstructor}`,
              start: exam.examStart,
              end: exam.examEnd,
              backgroundColor: (levelColor ? levelColor.color : "grey"),
              borderColor: (levelColor ? levelColor.color : "grey"),
              extendedProps: {examObj: exam}
            }
          })
          
          return events;
        };

        handleViewObjectOnDatesRender = (info) => {
          //console.log(this.calendarRef.current.calendar.view);
          
          //bubble up currentStart to app state, and focus examList based on app state
          console.log(`currentStart of calendar = ${info.view.currentStart}`);
        }
        
        render(){

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
            eventClick={(eventClickInfo) =>  {
              console.log(eventClickInfo.jsEvent)  
              this.props.handleExamPopover(null, eventClickInfo.event.extendedProps.examObj, eventClickInfo.event.backgroundColor)
            }}
            />
            )
            
          }
          
        }
        
export default Calendar;

let testExamObj = {
courseId: "5e7678f440b97600780cf6d9",
examName: "Exam 1",
examStart: "2020-04-22T16:30:00.000Z",
examEnd: "2020-04-22T18:00:00.000Z",
examSemester: "9909",
examId: "5e853c1388374a02cb51212c",
uniqueId: 856143841,
semester: "9909",
unit: "99",
subject: "999",
course: "990",
section: "99",
index: "10000",
courseTitle: "BRAIN SCI FNDTS I",
assignedInstructor: "Smartypants, Jone",
day: "T",
courseStartTime: "08:00",
courseEndTime: "10:50",
building: "ABC",
room: "100",
program: "Doctoral",
level: "1st Year",
examsoft: "true",
final: "true",
enrollment: 87,
sectionNickname: "BRAIN99"
}