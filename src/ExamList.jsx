import React from 'react';
import moment from 'moment'

function ExamList(props){
  let examItems = props.exams.map((exam) => {
    let levelColor = props.levelColors.find(levelColor => levelColor.level == exam.level);
    //console.log(props.levelColors.find(levelColor => levelColor.level == "1st Year"));

    return(
      <div className="examListItem" key={exam.examId}>
      <div className="examListDate">{moment(exam.examStart).format("MMM D")}</div>
      <div className="examListTime">{moment(exam.examStart).format("h:mm A")} - {moment(exam.examEnd).format("h:mm A")}</div>
      <p className="examListDescription">
      <span> {exam.sectionNickname} {exam.examName}</span>&nbsp; 
      <span style={{backgroundColor: levelColor.color}}> ({exam.level}) </span>&nbsp; 
      <span> {exam.assignedInstructor} </span>&nbsp; 
      <span> [{exam.building}-{exam.room}] </span>&nbsp; 
      <span> {exam.unit}:{exam.subject}:{exam.course}:{exam.section} </span>&nbsp;
      <span> {exam.examSoftware} </span>&nbsp;
      </p>
      </div>
      )
    }
    );
    
    
    return (
      examItems
      )
    }
    
    export default ExamList;