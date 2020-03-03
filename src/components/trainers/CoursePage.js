import React, {Component} from 'react'
import firebase from '../../config/fbConfig'

class CoursePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            CourName:[], CourCategory:[], CourDescription:[]
        }
    }

    // getSelectedCourseData(){
    //     var uid = firebase.auth().currentUser.uid;
    //     return firebase.database().ref('Users/AssignedCoursesToTrainer/').on('value', (snapshot) => {
    //         snapshot.forEach((childSnapshot) => {
    //             var childSnapshotData = childSnapshot.val();
    //             var id = childSnapshotData.selectedTrainer.value;
    //             if(uid === id){
    //                 //console.log(id);
    //                 firebase.database().ref('Users/AssignedCoursesToTrainer/').on('value', (assignedcourseSnapshot) => {
    //                     assignedcourseSnapshot.forEach((childassignedCourseSnapshot) => {
    //                         var childassignedCourseSnapshotData = childassignedCourseSnapshot.val();
    //                         var CCSDid = childassignedCourseSnapshotData.selectedCourse.value;
    //                         //console.log(CCSDid)
    //                         if(childassignedCourseSnapshotData.selectedTrainer.value === id){
    //                             //console.log(CCSDid)
    //                             firebase.database().ref('Users/Courses/').on('value', (coursesnapshot) => {
    //                                 var itemsCourseName = [], itemsCourseCategory = [], itemsCourseDescription = [];
    //                                 coursesnapshot.forEach((childCourseSnapshot) => {
    //                                     var Cid = childCourseSnapshot.key;
    //                                     var childCourseSnapshotData = childCourseSnapshot.val();
    //                                     var CourName = childCourseSnapshotData.courseName;
    //                                     var CourCategory = childCourseSnapshotData.courseCategory;
    //                                     var CourDescription = childCourseSnapshotData.description;
    //                                     //console.log(Cid)
    //                                     if(childCourseSnapshot.key === CCSDid){
    //                                         console.log(Cid);
    //                                         itemsCourseName.push(CourName);
    //                                         itemsCourseCategory.push(CourCategory);
    //                                         itemsCourseDescription.push(CourDescription);
    //                                         console.log(CourName);
    //                                         console.log(CourCategory);
    //                                         console.log(CourDescription);
    //                                     }
    //                                 })
    //                                 this.setState({
    //                                     CourName: itemsCourseName + '\n',
    //                                     CourCategory: itemsCourseCategory + '\n',
    //                                     CourDescription: itemsCourseDescription + '\n'
    //                                 })
    //                             })
    //                         }
    //                     })
    //                 })
    //             }
    //         })
    //     })
    // }

    getSelectedCourse(){
        var uid = firebase.auth().currentUser.uid;
        return firebase.database().ref('Users/AdminApprove/').on('value', (snapshot) => {
            var itemsCourseName = [], itemsCourseCategory = [], itemsCourseDescription = [];
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var childKey = childSnapshot.key;
                var TrainerID = childData.selected.TID;
                var courseName = childData.selected.CourseName;
                if(uid === TrainerID){
                    console.log(courseName)
                    firebase.database().ref('Users/Courses/').on('value', (Csnapshot) => {
                        Csnapshot.forEach((CchildSnapshot) => {
                            var CchildData = CchildSnapshot.val();
                            var CName = CchildData.courseName;
                            var CCategory = CchildData.courseCategory;
                            var Cdescription = CchildData.description;
                            if(courseName === CName){
                                console.log(CName)
                                console.log(CCategory)
                                console.log(Cdescription)
                                itemsCourseName.push(CName),
                                itemsCourseCategory.push(CCategory),
                                itemsCourseDescription.push(Cdescription)
                            }
                        })
                        this.setState({
                            CourName: itemsCourseName + '\n',
                            CourCategory: itemsCourseCategory + '\n',
                            CourDescription: itemsCourseDescription + '\n'
                        })
                    })
                }  
            })
        })
    }

    componentDidMount(){
        //this.getSelectedCourseData();
        this.getSelectedCourse();
    }
    render(){
        return(
            <div>
                <h3>About Course</h3>
                <div>
                <h5>Course Name: </h5>
                <p>{this.state.CourName}</p>
                <h5>Course Category: </h5>
                <p>{this.state.CourCategory}</p>
                <h5>Course Description: </h5>
                <p>{this.state.CourDescription}</p>
                <h5>Wants to add Offerings </h5>
                <a href='/createCourse'><h6>Add Offerings</h6></a>
                <h5>Files related to course</h5>
                <a href='#'><h6>View Files</h6></a>
                </div>
            </div>
        )
    }
}

export default CoursePage