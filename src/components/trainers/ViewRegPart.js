import React, {Component} from 'react'
import firebase from '../../config/fbConfig'
import ReactTable from "@kizu/react-table-v6";
import "@kizu/react-table-v6/react-table.css";
import moment from 'moment';
import {DatetimePickerTrigger} from 'rc-datetime-picker';
import Checkbox from './InputPage'
import BootstrapTable from "react-bootstrap-table-next";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
 import DateTimePicker from 'react-datetime-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheckCircle, faCheck} from '@fortawesome/free-solid-svg-icons'
import { firebaseReducer } from 'react-redux-firebase';
import Header from '../../Header'
import Sidebar from '../../Sidebar'
import Footer from '../../Footer'

// const { Checkbox } = ReactBootstrap;

class viewRegPart extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[], code:'',name: '',loc:'', dOTrain:'', selected: null, selectedRowIndex: null, TrainID:'', 
            selectedRows:[], previousRow : null, loading: true, timestamp: "", selectAll: false, data: [], checked: [],
            DIC: new Date().toLocaleString(), moment: moment(), date: new Date(), issuedCertify: [],
            offeringName:[], location:[], noOfParticipants:[], OfferingCode:[], OfferingStartDate:[], OfferingEndDate:[],
            noOfRegisteredParticipants: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(this)
    } 

    ToCheck(){
      var uid = firebase.auth().currentUser.uidl
      firebase.database().ref('toCheck').on('value', snapshot => {
        var issuedCert=[];
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          var CDselected = childData.selected;
          var CDid = CDselected.participantId;
          // console.log(CDselected);
          // console.log(CDid)
          firebase.database().ref('Users/IssuedCertificateTo').on('value', ICsnapshot => {
            ICsnapshot.forEach((ICchildsnapshot) => {
              var ICData = ICchildsnapshot.val();
              var TrainerID = ICData.TrainerID;
              var UserID = ICData.childData.uid;
              //console.log(UserID)
              if(TrainerID === uid){
                if(CDid === UserID){
                  issuedCert.push(UserID)
                }
              }
            })
            this.setState({
                issuedCertify: issuedCert
            })
          })
        })
      })
    }

    getTableData(){
      firebase.database().ref('Users/ParticipantShouldAttendThisOffering').on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log(childKey)
          console.log(childData)
        })
      })
    }

    getData(){
        firebase.database().ref('Users/Participants').on('value', (snapshot) => {
            const data=[];
            snapshot.forEach((childSnapshot) => {
              var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                var fn = childData.firstName;
                var ln = childData.lastName;
                var ema = childData.email;
                var rol = childData.role;
                var fname = fn + ' ' + ln;
                //console.log(childData);
                const TData = {
                  participantId: childKey,
                    participantName: fname,
                    email: ema,
                    role: rol,
                }
                data.push(TData)
            })
            this.setState({
                data
            })
        })
    }

    C_Issue_notIssue(){
      firebase.database().ref('Users/IssuedCertificateTo').on('value', snapshot => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          //console.log(childData)
        })
      })
    }

    getOffering(){
      var uid = firebase.auth().currentUser.uid;
      console.log(uid);
      return firebase.database().ref('Users/TrainerOffering/').on('value', (snapshot) => {
          var OffTName = [], OffName = [], OffDaysOfTraining = [], Offlocation = [], OffnumOfPart = [], OffoffCode = [], OffSDate=[], OffEDate=[], OffnumOfRegPart = []
          snapshot.forEach((childSnapshot) => {
              var childData = childSnapshot.val();
              var Offname = childData.selectedTrainer.label;
              var numOfPart = childData.numOfParticipants;
              var location = childData.location;
              var daysOfTraining = childData.daysOfTraining;
              var generateCode = childData.generateCode;
              var authorID = childData.authorId;
              var Sdate = childData.sDate;
              var Edate = childData.eDate;
              var numOfRegPart;
              if(uid === authorID){
                firebase.database().ref('Users/Trainers').on('value', (Tsnapshot) => {
                  Tsnapshot.forEach((TchildSnapshot) => {
                    var Tchildkey = TchildSnapshot.key;
                    var TchildData = TchildSnapshot.val();
                    var fn = TchildData.firstName;
                    var ln = TchildData.lastName;
                    var fullName = fn + ' ' + ln;
                    if(Tchildkey === uid){
                      console.log(Tchildkey);
                      console.log(fullName);
                      OffTName.push(fullName);
                      OffName.push(Offname);
                      Offlocation.push(location);
                      OffnumOfPart.push(numOfPart);
                      OffoffCode.push(generateCode);
                      OffSDate.push(Sdate);
                      OffEDate.push(Edate);
                      OffnumOfRegPart.push(numOfRegPart);
                      OffDaysOfTraining.push(daysOfTraining);
                    }
                  })
                  this.setState({
                    offeringName : OffName + '\n', 
                    location : Offlocation + '\n', 
                    noOfParticipants : OffnumOfPart + '\n', 
                    OfferingCode : OffoffCode + '\n',
                    OfferingStartDate: OffSDate + '\n',
                    OfferingEndDate: OffEDate + '\n',
                    noOfRegisteredParticipants: OffnumOfRegPart + '\n',
                    dOTrain: OffDaysOfTraining + '\n',
                    TrainID: OffTName + '\n'
                })
                })
              }
          })
      })
  }

    getCDescription(){
      var uid = 'E4dec3hctiW651GYCisk9H90uEd2';
      return firebase.database().ref('Users/ParticipantShouldAttendThisOffering/').on('value', snapshot => {
        const code=[], name=[], loc=[], dOTrain=[], TrainID=[];
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          var _code = childData.code;
          var userID = childData.uid;
          var courseN = childData.courseName;
          var locat = childData.location;
          var DoT = childData.daysOfTraining;
          if(userID === uid) {
            firebase.database().ref('Users/TrainerOffering/').on('value', TOsnapshot => {
              TOsnapshot.forEach((TOchildSnapshot) => {
                var TOchildData = TOchildSnapshot.val();
                var Gcode = TOchildData.generateCode;
                var Tid = TOchildData.authorId;
                if(Gcode === _code){
                  firebase.database().ref('Users/Trainers/').on('value', Tsnapshot => {
                    Tsnapshot.forEach((TchildSnapshot) => {
                      var Tdata = TchildSnapshot.val();
                      var Tkey = TchildSnapshot.key;
                      var TFN = Tdata.firstName;
                      var TLN = Tdata.lastName;
                      var fullName = TFN + ' ' + TLN;
                      if(Tid === Tkey){
                        code.push(_code);
                        name.push(courseN);
                        loc.push(locat);
                        dOTrain.push(DoT);
                        TrainID.push(fullName);
                      }
                    })
                    this.setState({
                      code, 
                      name,
                      loc,
                      dOTrain,
                      TrainID
                    })
                  })
                }
              })
            })
          }
        })
      })
    }

    getCourseDescription(){
        firebase.database().ref('Users/ParticapantsApproveOffering/').on('value', (snapshot) => {
            const code=[], name=[], loc=[], dOTrain=[], TrainID=[];
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var CourseCode = childData.inputCode;
                var CourseName = childData.childData.selectedTrainer.label;
                var location = childData.childData.location;
                var daysOfTraining = childData.childData.daysOfTraining;
                var TrainerID = childData.childData.authorId;
                firebase.database().ref('Users/Trainers/').on('value', (Tsnapshot) => {
                    Tsnapshot.forEach((TchildSnapshot) => {
                        var TchildData = TchildSnapshot.val();
                        var TchildKey = TchildSnapshot.key;
                        var FN = TchildData.firstName;
                        var LN = TchildData.lastName;
                        var TfullName = FN + ' ' + LN;
                        if(TrainerID === TchildKey){
                            code.push(CourseCode);
                            name.push(CourseName);
                            loc.push(location);
                            dOTrain.push(daysOfTraining);
                            TrainID.push(TfullName);
                        }
                    })
                    this.setState({
                        code, 
                        name,
                        loc,
                        dOTrain,
                        TrainID
                    })
                })
            })
        })
    }

    issueCertificateButton = (e) => {
      e.preventDefault();
      firebase.database().ref('Users/IssuedCertificateTo/').push({
        selected: this.state.selected
      })
    }

    closeOffering = (e) => {
      var uid = firebase.auth().currentUser.uid;
      e.preventDefault();
      firebase.database().ref('Users/TrainerOffering').on('value', snapshot => {
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          var TrainerID = childData.authorId;
          if(TrainerID === uid){
            console.log(childKey);
            console.log(childData);
            firebase.database().ref('Users/TrainerOffering').child(childKey).remove();
          }
        })
        this.props.history.push('/')
      })
    }

    
    handleChange = () => {
        var selectAll = !this.state.selectAll;
        this.setState({ selectAll: selectAll });
        var checkedCopy = [];
        this.state.data.forEach(function(e, index) {
          checkedCopy.push(selectAll);
        });
        this.setState({
          checked: checkedCopy
        });
      };

    handleSingleCheckboxChange = index => {
        console.log(index);
        var checkedCopy = this.state.checked;
        checkedCopy[index] = !this.state.checked[index];
        if (checkedCopy[index] === false) {
          this.setState({ selectAll: false });
        }
    
        this.setState({
          checked: checkedCopy
        });
      };

    componentDidMount(){
      this.getOffering();
      this.getTableData();
      //this.getCDescription();
      this.C_Issue_notIssue();
      this.ToCheck();
        // this.getCourseDescription();
        this.getData();
            const data2 = [
              { one: "hi0", two: "two0", three: "three0" },
              { one: "hi1", two: "two1", three: "three1" },
              { one: "hi2", two: "two2", three: "three2" },
              { one: "hi3", two: "two3", three: "three3" },
              { one: "hi4", two: "two4", three: "three4" },
              { one: "hi5", two: "two5", three: "three5" },
              { one: "hi6", two: "two6", three: "three6" },
              { one: "hi7", two: "two7", three: "three7" },
              { one: "hi8", two: "two8", three: "three8" }
            ];
            var checkedCopy = [];
            var selectAll = this.state.selectAll;
            data2.forEach(function(e, index) {
              checkedCopy.push(selectAll);
            });
        
            this.setState({
              data: data2,
              checked: checkedCopy,
              selectAll: selectAll,
              // selectedRows: selectedRows
            });
    }
    render(){
      let myFont = this.state.issuedCertify === null ? (<FontAwesomeIcon icon={faTimes} />) : (<FontAwesomeIcon icon={faCheck} />);
      const selectRow = {
        mode: "checkbox",
        clickToSelect: true
      };
      const shortcuts = {
        'Today': moment(),
        'Yesterday': moment().subtract(1, 'days'),
        'Clear': ''
      };
        const { data } = this.state;
        const columns = [
            { Header: "SL No", maxWidth: 100,filterable: false, Cell: props => {
                return <div>{props.index + 1}</div>;
              }}, 
              {
                Header: 'Participant ID',
                accessor: 'participantId',
            },
            {
                Header: 'Participant Name',
                accessor: 'participantName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Role',
                accessor: 'role',
            }, 
            {
                Header: 'Issue Certificate',
                Cell: myFont
                // { 
                //   issuedCertify = null
                // ? (<FontAwesomeIcon icon={faTimes} />)
                // : (<FontAwesomeIcon icon={faCheck} />)
                // }
                // <FontAwesomeIcon icon={faTimes} />
              },
              // {
              // Header: 'Certificate',
              // Cell: <a href='/issueCertificate'>View/Download</a>
              // }
        ];
        return(
            <div>
              {/* <FontAwesomeIcon icon={faCheck} />
              <FontAwesomeIcon icon={faCheckCircle} /> */}
               <Header />
                    <Sidebar />
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
                {/* <div className="container section project-details"> */}
                    {/* <div className="card z-depth-0"> */}
                <h5>Registered Participants for Code : <b>{this.state.OfferingCode}</b></h5>
                <h6>Days of Training: {this.state.dOTrain}</h6>
                <h6>Course Name: {this.state.offeringName}</h6>
                <h6>Location: {this.state.location}</h6>
                <h6>Trainer Name: {this.state.TrainID}</h6>
                <br />
                 <div>
                    <ReactTable
                        data={data}
                        columns={columns}
                        style={{ textAlign: "center" }}
                        defaultPageSize={5}
                        className="-striped -highlight"
                        defaultFilterMethod={(filter, row) =>
                            row[filter.id] !== undefined
                              ? String(row[filter.id])
                                  .toLowerCase()
                                  .includes(filter.value.toLowerCase())
                              : false
                          }
                          getTrProps = {(state, rowInfo) => {
                            var arr1 = '';
                            if (rowInfo && rowInfo.row) {
                              return {
                                onClick: (e) => {
                                    e.preventDefault();
                                  arr1 = rowInfo.original;
                                  this.setState({
                                    selectedRowIndex: rowInfo.index,
                                    selected: rowInfo.original
                                  },
                                  console.log(arr1)
                                  )
                                },
                                style: {
                                  background: rowInfo.index === this.state.selectedRowIndex ? 'gray' : 'white',
                                  color: rowInfo.index === this.state.selectedRowIndex ? 'white' : 'black'
                                }}}
                            else{
                              return {}
                            }}} 
                        />
                        <br />
                    </div>
                    <br />
                    <div style={{textAlign:'center'}}>
                    <button type="submit" onClick={this.issueCertificateButton}>Issue Certificate</button><br/><br/>
                    <label htmlFor="moment">Issue Certificate on:  </label><br/>
                      <DateTimePicker value={this.state.date} onChange={date => this.setState({ date })} /> <br /><br />
                          <br/>       
                    <button type="submit" onClick={this.closeOffering}>Close Offering</button>
                    <br/><br/><br />
                    </div>
            </div>
            </div></div>
            <Footer />
            </div>
        )
    }
}

export default viewRegPart

// */               <InputPage /> */               
 // <MDBInput type="checkbox" id="checkbox1" />

                // <input type="checkbox" />

                // <InputGroup className="mb-3">
                //   <InputGroup.Prepend>
                //     <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                //   </InputGroup.Prepend>
                // </InputGroup>
                // <Checkbox></Checkbox>

                // row => (
                //   <input
                //     type="checkbox"
                //     defaultChecked={this.state.checked[row.index]}
                //     checked={this.state.checked[row.index]}
                //     onChange={() => this.handleSingleCheckboxChange(row.index)}
                //   />
                // ),
                // sortable: false,
                // filterable: false

                //   <Form.Group controlId="formBasicCheckbox">
              //   <Form.Check type="checkbox" />
              // </Form.Group>
                // <Checkbox
                //   checked={this.state.checked}
                //   onChange={this.handleCheckboxChange}
                // />

                // <Checkbox checked={this.state.cb5} onChange={this.handleToggle} value="5"></Checkbox>
                

                // issueCertificate = (e) => {
    //   e.preventDefault();
    //   //console.log(this.state.date)
    //   var uid = firebase.auth().currentUser.uid;
    //   firebase.database().ref('Users/ParticipantShouldAttendThisOffering').on('value', snapshot => {
    //     snapshot.forEach((childSnapshot) => {
    //       var childData = childSnapshot.val();
    //       var TrainerID = childData.TrainerID;
    //       if(TrainerID === uid){
    //         //console.log(childData)
    //         firebase.database().ref('Users/IssuedCertificateTo').push({
    //           childData
    //         })
    //       }
    //     })
    //   })

      // firebase.database().ref('toCheck').push({
      //   date: this.state.date
      // })

      //console.log(this.state.date)

      // firebase.database().ref('Users').on('value', (snapshot) => {
      //   snapshot.forEach((childSnapshot) => {
      //     var childData = childSnapshot.val();
      //     console.log(childData)
      //   })
      // })

      // var uid = firebase.auth().currentUser.uid;
      // firebase.database().ref('Users/TrainerOffering').on('value', snapshot => {
      //   snapshot.forEach((childSnapshot) => {
      //     var childData = childSnapshot.val();
      //     var childKey = childSnapshot.key;
      //     var code = childData.generateCode;
      //     var Tid = childData.authorId;
      //     if(uid === Tid){
      //       console.log(childKey)
      //       console.log(code)
      //       console.log(Tid)
      //       firebase.database().ref('Users/IssuedCertificateTo/').push({
      //         Tid, 
      //         childData,
      //         childKey
      //       })
      //       firebase.database().ref('Users/IssuedCertificateTo/').on('value', ICsnap => {
      //         ICsnap.forEach((ICchildSnap) => {
      //           var icData = ICchildSnap.val();
      //           var CC = icData.childKey;
      //           console.log(CC);
      //           firebase.database().ref('Users/TrainerOffering').child(CC).remove();
      //         })
      //       })
      //         this.props.history.push('/')
      //     }
      //   })
      // })
    // }

    // getTrProps = {(state, rowInfo) => {
                        //     if (rowInfo) {
                        //         return {
                        //           onClick: (e) => {
                        //             let selectedRows = [];
                        //             if (e.shiftKey && this.previousRow) {
                        //               if (this.previousRow.index < rowInfo.index) {
                        //                 for (let i = this.previousRow.index; i <= rowInfo.index; i++) {
                        //                   selectedRows.push(state.sortedData[i]);
                        //                 }
                        //               } else {
                        //                 for (let i = rowInfo.index; i <= this.previousRow.index; i++) {
                        //                   selectedRows.push(state.sortedData[i]);
                        //                 }
                        //               }
                        //             } else {
                        //               rowInfo._index = rowInfo.index;
                        //               selectedRows.push(rowInfo);
                        //               this.previousRow = rowInfo;
                        //             }
                        //             this.setState({ selected: rowInfo.index, selectedRows }, console.log(selectedRows))
                        //           },
                        //           style: {
                        //             background: this.state.selectedRows.some((e) => e._index === rowInfo.index) && 'gray',
                        //           }
                        //         }
                        //       } else {
                        //         return {}
                        //       }
                        // }}
