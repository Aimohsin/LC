import React from 'react'
import EnrolledCourseSummary from './EnrolledCourseSummary'
import { Link } from 'react-router-dom'

const EnrolledCourseList = ({projects}) => {

  function get_enrolled_Courses(){
    var uid = firebase.auth().currentUser.uid;
    console.log(uid);
    firebase.database().ref('Users/AssignedCoursesToTrainer/').on('value', (snapshot) => {
      var enrolledCourses = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        var TrainerKey = childData.selectedTrainer.value;
        var CourName = childData.selectedCourse.label;
        console.log(TrainerKey)
        console.log(CourName);
        if(uid === TrainerKey){
          enrolledCourses.push(CourName)
        }
      })
    })
  }

  return (
    <div className="project-list section">
      { projects && projects.map(project => {
        return (
          <Link to={'/project/' + project.id} key={project.id}>
            <EnrolledCourseSummary project={project} />
          </Link>
        )
      })}  
    </div>
  )
}

export default EnrolledCourseList
