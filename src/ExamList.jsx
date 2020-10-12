import React from 'react';
import moment from 'moment';


function ExamList(props){
  let examItems = props.exams.map((exam) => {
    let levelColor = props.levelColors.find(levelColor => levelColor.level == exam.level);  //search list of level colors to find color for level

    return(
      <div className="higlightRow">
      <div className="examListItem" key={exam.examId} onClick={(event) => props.handleExamPopover(event.currentTarget, exam, levelColor ? levelColor.color : "grey")} style={{"cursor": "pointer"}}>
      <div className="examListDate">{moment(exam.examStart).format("MMM D")}</div>
      <div className="levelColorDot" style={{backgroundColor: (levelColor ? levelColor.color : "grey")}}></div>&nbsp;
      <div className="examListTime">{moment(exam.examStart).format("h:mm A")} - {moment(exam.examEnd).format("h:mm A")}</div>
      <p className="examListDescription">
      <span> {exam.sectionNickname} {exam.examName}</span>&nbsp; 

      <span> ({exam.level}) </span>&nbsp; 
      <span> {exam.assignedInstructor} </span>&nbsp; 
      <span> [{exam.examBuilding}-{exam.examRoom}] </span>&nbsp; 
      <span> {exam.unit}:{exam.subject}:{exam.course}:{exam.section} </span>&nbsp;
      <span> {exam.examSoftware} </span>&nbsp;
      </p>
      </div>
      </div>
      )
    }
    );
    
    
    return (
      examItems
      )
    }
    
    export default ExamList;