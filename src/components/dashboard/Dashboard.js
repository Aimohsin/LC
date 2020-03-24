import React, { Component } from 'react'
// import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/fbConfig'
import EnrolledCourseList from '../Course/CourseList'
// import TrainerList from '../trainerProfile/TrainerList'
import Header from '../../Header'
import Footer from '../../Footer'
import Sidebar from '../../Sidebar'
import Content from '../../Content'

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
      var TrainerOffering = [], SDT=[], EDT=[];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        var TrainerID = childData.authorId;
        var SDate = childData.sDate;
        var sTime = childData.sTime;
        var eDate = childData.eDate;
        var eTime = childData.eTime;
        var sDateTime = SDate + ' at ' + sTime;
        var eDateTime = eDate + ' at ' + eTime;
        var childCourseName = childData.selectedTrainer.label;
        console.log(TrainerID);
        console.log(childCourseName);
        if(uid === TrainerID){
          TrainerOffering.push(childCourseName + ' ( ' + sDateTime + '  --  ' + eDateTime + ' ) ');
          // SDT.push(sDateTime);
          // EDT.push(eDateTime);
        }
      })
      this.setState({
        Offerings: TrainerOffering 
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
              CourseName: itemsCourse
          })
      })
  }

  getApprovedCourses(){
    var uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('Users/AdminApprove/').on('value', (snapshot) => {
      var ApproveCourses = [];
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
                ApproveCourses.push(
                  CName
                  );
              }
            })
            this.setState({
              AppCourses: ApproveCourses
          })
        })
        }
      })
    })
  }
                  // CName + '\n'
                  // <ul>
                  // <li>{CName}</li>
                  // </ul>
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
      <div>
      <Header />
      <Sidebar />
      <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
      <div className="dashboard container">
        <br /><br />
        <h3>Welcome {this.state.firstName || ''} {this.state.lastName || ''}</h3><br />
        <div className="row">
          <div className="col s12 m6">
            <h5>List of Available Courses</h5>
            <dt>Course Name: </dt>
            {this.state.CourseName && this.state.CourseName.map(CN => 
                 <div>
                   <li>{CN || ''}</li>
                 </div>
               )}<br />
                <h5>List of Approved Courses</h5>
               <dt>Approved Courses: </dt>
               {this.state.AppCourses && this.state.AppCourses.map(ApC => 
                 <div>
                   <li><a href='/coursePage'>{ApC || ''}</a></li>
                 </div>
               )}<br />
               <h5>List of Trainings</h5>
               <dt>Offerings: </dt>
               {this.state.Offerings && this.state.Offerings.map(Of => 
                <div>
                  <li><a href='/offerings'>{Of || ''}</a></li>
                </div>
                )}
                 {/* <ul>
               <li><a href='/coursePage'>{this.state.AppCourses}</a></li>
               </ul> */}
               {/* <ul>
                <li><a href='/offerings'>{this.state.Offerings}</a></li>
               </ul> */}
            {/* <TrainerList trainers={trainers} />
            {this.state.selectLang && this.state.selectLang.map(sL => 
                <div>
                <li>{sL.label || ''}</li>
                </div>
               )}
            */}
          </div>
        </div>
      </div>
      </div></div></div>
      <Footer />
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

// (Tue Mar 24 2020 - Tue Mar 28 2020)