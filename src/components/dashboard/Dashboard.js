import React, { Component } from 'react'
// import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/fbConfig'
import EnrolledCourseList from '../Course/CourseList'
// import TrainerList from '../trainerProfile/TrainerList'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName:'', lastName:'', CourseName: [], Cour_Name: [], AppCourses:[], Offerings:[], enrolledCourses:[]
    }
  }

  getTrainerOfferings(){
    var uid = firebase.auth().currentUser.uid;
    //console.log(uid);
    return firebase.database().ref('Users/TrainerOffering/').on('value', (snapshot => {
      var TrainerOffering = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        var TrainerID = childData.authorId;
        var childCourseName = childData.selectedTrainer.label;
        console.log(TrainerID);
        console.log(childCourseName);
        if(uid === TrainerID){
          TrainerOffering.push(childCourseName)
        }
      })
      this.setState({
        Offerings: TrainerOffering + '\n'
      })
    }))
  }


  getdata () {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/Trainers/' + uid).on('value', (snapshot) => {
        this.setState ({
            firstName: snapshot.val().firstName,
            lastName: snapshot.val().lastName, 
        })
      })
    }

    get_course_list(){
      return firebase.database().ref('Users/Courses/').on('value', (snapshot) => {
          var itemsCourse = [];
          snapshot.forEach((childSnapshot) => {
              var childData= childSnapshot.val();
              var CName = childData.courseName;
              itemsCourse.push(CName);
          })
          this.setState({
              CourseName: [itemsCourse + '\n']
          })
      })
  }

  getApprovedCourses(){
    var uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('Users/AdminApprove/').on('value', (snapshot) => {
      var AppCourses = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        var key = childData.selected.TID;
        var courseName = childData.selected.CourseName;
        if(uid === key){
          firebase.database().ref('Users/Courses/').on('value', (CSnapshot) => {
            CSnapshot.forEach((CchildSnapshot) => {
              var CchildData = CchildSnapshot.val();
              var CName = CchildData.courseName;
              if(courseName === CName){
                AppCourses.push(CName);
              }
            })
            this.setState({
              AppCourses
          })
        })
        }
      })
    })
  }

  get_enrolled_Courses(){
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/AssignedCoursesToTrainer/').on('value', (snapshot) => {
      var enrolledCourses = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        var TrainerKey = childData.selectedTrainer.value;
        var CourName = childData.selectedCourse.label;
        if(uid === TrainerKey){
          enrolledCourses.push(CourName)
        }
      })
      this.setState({
        enrolledCourses
      })
    })
  }

  componentDidMount(){
    this.getTrainerOfferings();
    this.getApprovedCourses();
    this.get_course_list();
    this.getdata();
    this.get_enrolled_Courses();
  }

  render() {
    const { projects, auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' /> 

    return (
      <div className="dashboard container">
        <br /><br />
        <h3>Welcome {this.state.firstName || ''} {this.state.lastName || ''}</h3>
        <div className="row">
          <div className="col s12 m6">
            <h5>List of Available Courses</h5>
            <dt>Course Name: {this.state.CourseName}</dt>
                <h5>List of Approved Courses</h5>
               <dt>Approved Courses: </dt>
               <ul>
                 <a href='/coursePage'><li>{this.state.AppCourses}</li></a>
               </ul>
               <h5>List of Trainings</h5>
               <dt>Offerings: </dt>
               <ul>
                <a href='/offerings'><li>{this.state.Offerings}</li></a>
               </ul>
            {/* <TrainerList trainers={trainers} />*/}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // trainers: state.firestore.ordered.trainers,
    //projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection:'trainers', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
  ])
)(Dashboard)
