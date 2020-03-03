import React, {Component} from 'react'
import firebase from '../../config/fbConfig'
import Select from 'react-select'
import ReactTable from "@kizu/react-table-v6";
import "@kizu/react-table-v6/react-table.css";
import FileUploader from "react-firebase-file-uploader";
import UploadFile from '../functions/uploadFile'

class CourseApproval extends Component{
    constructor(props){
        super(props);
        this.state = {
            CourName:[], selectedCourse: null, comments:'', evidence:'', status: false, 
            data: [], Cour_Name:[], ReqCourse: [], isUploading: false, progress: 0, avatarURL: '' 
        }
    }

    getDesiredFile(){
        const files = firebase.storage().ref();
        const StorageRef = files.child('pdf')
        StorageRef.listAll().then(function(res) {
            Promise.all(res.items.map((fileRef) => fileRef.getDownloadURL())).then((downloadURLs) => {
                console.log(downloadURLs);
                var uid = firebase.auth().currentUser.uid;
                firebase.database().ref('Users/CourseApprovals/').on('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        var childData = childSnapshot.val();
                        var avatarURL = childData.avatarURL;
                        var Tid = childData.uid;
                        if(Tid === uid){
                            console.log(avatarURL);
                            if(avatarURL === downloadURLs){
                                //console.log(downloadURLs);
                            }
                        }
                    })
                })            });
        }).catch(function(error){
            console.log(error)
        })
       
    }

    DownloadEvidence(){
        const files = firebase.storage().ref('pdf/5b8e28a8-fe06-4312-9ff6-3c9adfefb2b3.pdf/');
        files.getDownloadURL().then((url) => {
          window.open(url, "_blank")
        })
      } 

    handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    //console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("pdf")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };

    handleSubmit = (e) => {
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        e.preventDefault();
        console.log('Files Save')
        firebase.database().ref('/Users/CourseApprovals').push({
            selectedTrainer: this.state.selectedCourse,
            comments: this.state.comments,
            progress: this.state.progress,
            avatarURL: this.state.avatarURL,
            evidence: this.state.evidence,
            isUploading: this.state.isUploading,
            progress: this.state.progress,
            uid
        })
        alert('Requested');
        this.props.history.push('/')
    }

    handleChangeCourse = (selectedCourse) => {
        this.setState(
          { selectedCourse },
          () => console.log(`Option selected:`, this.state.selectedCourse)
        );
      };

    changeStatus = (e) => {
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      }

      reqNewCourses(){
        var uid = firebase.auth().currentUser.uid;
        return firebase.database().ref('Users/CourseApprovals/').on('value', (snapshot) => {
            var ReqCourse = [];
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var TrainerID = childData.uid;
                var CourseName = childData.selectedTrainer.label;
                var CourseID = childData.selectedTrainer.value;
                if(uid === TrainerID){
                  //console.log(CourseID);
                  firebase.database().ref('Users/Courses/').on('value', (Coursesnapshot) => {
                      Coursesnapshot.forEach((CoursechildSnapshot) => {
                          var childData = CoursechildSnapshot.val();
                          var childkey = CoursechildSnapshot.key;
                          var childCourseName = childData.courseName;
                          if(childCourseName !== CourseName){
                              //console.log(childCourseName);
                              ReqCourse.push({
                                label: childCourseName,
                                value: childkey
                            });
                          }
                      })
                      this.setState({
                          ReqCourse
                      })
                  })
                }
            })
        })
    }

    get_course_list(){
        return firebase.database().ref('Users/Courses/').on('value', (snapshot) => {
            var CourName = [];
            snapshot.forEach((childSnapshot) => {
                var childData= childSnapshot.val();
                var childKey= childSnapshot.key;
                var CName = childData.courseName;
                CourName.push({
                    label: CName,
                    value: childKey
                })
            })
            this.setState({ 
                CourName
            }) 
        })
    }

    getCompleteTable(){
        var uid = firebase.auth().currentUser.uid;
        const database = firebase.database().ref("Users/CourseApprovals/");
    database.on("value", snapshot => {
      const data = [];
      snapshot.forEach(childSnapShot => {
          var TrainerName = childSnapShot.val().uid;
        firebase.database().ref('Users/Trainers/').on('value', (snapshot) => {
            snapshot.forEach((TrainerChildSnapshot) => {
                var TrainerID = TrainerChildSnapshot.key;
                var FN = TrainerChildSnapshot.val().firstName;
                var LN = TrainerChildSnapshot.val().lastName;
                var FLN = FN + ' ' + LN;
                if(uid === TrainerName){
                if(TrainerName === TrainerID){
                    const TData = {
                        TrainerName: FLN,
                        CourseName: childSnapShot.val().selectedTrainer.label,
                        evidence: childSnapShot.val().evidence,
                        avatarURL: childSnapShot.val().avatarURL,
                        Comments: childSnapShot.val().comments
                    }
                    data.push(TData);
                }}
            })
            this.setState({
                data
            })
            })
        });
    });
    }

    componentDidMount(){
        this.get_course_list();
        this.getCompleteTable();
        this.reqNewCourses();
        this.getDesiredFile();
    }
    render(){
        const {selectedCourse, data} = this.state;
        const columns = [
            { Header: "SL No", maxWidth: 100,filterable: false, Cell: props => {
                return <div>{props.index + 1}</div>;
              }}, 
            {
                Header: 'Course Name',
                accessor: 'CourseName',
            },
            {
                Header: 'Evidence',
                accessor:'evid',
                Cell: <a href='#' onClick={this.DownloadEvidence}>View File</a>
            }, 
            // {
            //     Header: 'Evidence',
            //     accessor: 'avatarURL',
            //     Cell: <a href='#' onClick={this.DownloadEvidence}>Download File</a>
            // },
             {
                Header: 'Comments',
                accessor: 'Comments',
            }, {
                Header: 'Status',
                accessor: 'status',
                Cell: 'Pending'
            },];
        return(
            <div>
                <div>
                    <h5>Pending Approvals</h5>
                    <div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        style={{ textAlign: "center" }}
                        defaultPageSize={5}
                        className="-striped -highlight"
                        />
                        <br />
                    </div>
                    <form onSubmit={this.handleSubmit}>
                    <h5>Request New Course</h5>
                    <div className="input-field">
                    <label htmlFor="courseName">Course Name</label><br /><br/>
                    <Select value={selectedCourse} onChange={this.handleChangeCourse} options={this.state.CourName || ''} />
                    </div><br/>
                    <div className="input-field">
                    <label htmlFor="comments">Comments</label><br/><br/>
                        <input type="text" id='comments' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
                    </div><br/>
                    <div className="input-field">
                    <label htmlFor="evidence">Evidence</label><br/><br/>
                    <FileUploader
                        accept="pdf/*"
                        name="avatar"
                        randomizeFilename
                        storageRef={firebase.storage().ref("pdf")}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                    />
                    <br/>
                    {/* <UploadFile /> */}
                    </div><br/>
                    <div className="input-field">
                        <button className="btn pink lighten-1">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CourseApproval

 //   changeStatus = id => {
    //     console.log("id: ", id);
    //     const newData = data.map(item => {
    //       if (item.id === id) {
    //         item.status = item.status === 'Pending' ? 'Approve' : 'Pending';
    //       }
    //       return item;
    //     });
    //     console.log("new Data: ", newData);
    //     this.setState({ data: newData });
    //   };

       
    // getTable(){
    //     var uid = firebase.auth().currentUser.uid;
    //     const database = firebase.database().ref("Users/CourseApprovals/");
    //     database.on("value", snapshot => {
    //     const data = [];
    //     snapshot.forEach(childSnapShot => {
    //         var keyy = childSnapShot.val().uid;
    //         console.log(keyy);
    //         const locker = {
    //             TrainerName: childSnapShot.key.toString(),
    //             CourseName: childSnapShot.val().selectedTrainer.label,
    //             evidence: childSnapShot.val().evidence,
    //             Comments: childSnapShot.val().comments
    //         };
    //         if(uid === keyy){
    //             data.push(locker);
    //         }
    //     });
    //     this.setState(prevState => {
    //         return { data: [...prevState.data, ...data] };
    //     });
    //     });
    //     }
