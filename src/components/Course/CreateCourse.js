import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/fbConfig'
import Select from 'react-select';
import moment from "moment";
import "antd/dist/antd.css";
import DateTimePicker from 'react-datetime-picker';

const Learning= [
  {label: 'Online', value: 1},
  {label: 'Onsite', value:2}
]

const optionsValues =[
  { value: -12.0, label: 'GMT -12:00' },
  { value: "-11.0", label: 'GMT -11:00'},
  { value: "-10.0", label: 'GMT -10:00'},
  { value: "-9.0", label: 'GMT -9:00'},
  { value: "-8.0", label: 'GMT -8:00'},
  { value: "-7.0", label: 'GMT -7:00'},
  { value: "-6.0", label: 'GMT -6:00'},
  { value: "-5.0", label: 'GMT -5:00'},
  { value: "-4.0", label: 'GMT -4:00'},
  { value: "-3.0", label: 'GMT -3:00'},
  { value: "-2.0", label: 'GMT -2:00'},
  { value: "-1.0", label: 'GMT -1:00'},
  { value: "-0.0", label: 'GMT'},
  { value: "+1.0", label: 'GMT +1:00'},
  { value: "+2.0", label: 'GMT +2:00'},
  { value: "+3.0", label: 'GMT +3:00'},
  { value: "+4.0", label: 'GMT +4:00'},
  { value: "+5.0", label: 'GMT +5:00'},
  { value: "+6.0", label: 'GMT +6:00'},
  { value: "+7.0", label: 'GMT +7:00'},
  { value: "+8.0", label: 'GMT +8:00'},
  { value: "+9.0", label: 'GMT +9:00'},
  { value: "+10.0", label: 'GMT +10:00'},
  { value: "+11.0", label: 'GMT +11:00'},
  { value: "+12.0", label: 'GMT +12:00'},
]

class CreateProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      location:'', daysOfTraining:'', numOfParticipants:'', CourName:[], selectedTrainer: null, generateCode:'',
      StartTimezone:'', EndTimezone:'', Learning:[], sDate: '', eDate: ''
   }
  }

  getSelectedCourse(){
    var uid = firebase.auth().currentUser.uid;
    return firebase.database().ref('Users/AdminApprove').on('value', (snapshot) => {
      var CourName = [];
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        var TrainerID = childData.selected.TID;
        var courseName = childData.selected.CourseName;
        if(uid === TrainerID){
          CourName.push({
            label: courseName,
            value:''
          });
        }
      })
      this.setState({
        CourName
      })
    })
  }

  handleChangeLearning = (Learning) => {
    this.setState(
      {Learning},
      () => console.log(this.state.Learning)
    )
  }

  handleChangeTimezone = (timezone) => {
    this.setState(
      {timezone},
      () => console.log(this.state.timezone)
    )
  }

handleChangeTrainer = (selectedTrainer) => {
  this.setState(
    { selectedTrainer },
    () => console.log(`Option selected:`, this.state.selectedTrainer)
  );
};

componentDidMount(){
    this.getSelectedCourse();
}

GenCode(){
  var generator = require('generate-password');
  var generateCode = generator.generate({
      length:5,
      numbers: true
  });
  document.getElementById("generateCode").value = generateCode;
  console.log(generateCode)
} 

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onChangeeDate = eDate => this.setState({ eDate })

  onChangesDate = sDate => this.setState({ sDate })

  onChangeTimeZone = (e) => {
    this.setState({
      timezone: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state);
    console.log(this.state)
    this.props.history.push('/');
  }
  render() {
    const { selectedTrainer } = this.state;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <br /><br/>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add training you want to offer</h5>
          <div className="input-field">
          <label htmlFor="courseName">Training Name</label><br /><br />
            <Select value={selectedTrainer} onChange={this.handleChangeTrainer} options={this.state.CourName || ''} />
          </div>
          <div className="input-field">
          <label htmlFor="learning">Learning</label><br/><br/>
          <Select options={Learning} onChange={this.handleChangeLearning} value={this.state.Learning} />
          </div>
          <div className="input-field">
          <label htmlFor="daysOfTraining">Days of training</label><br/><br/>
            <input type="text" id='daysOfTraining' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
          </div>
          <div className="input-field">
          <label htmlFor="location">Location</label><br/><br/>
            <input type="text" id='location' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
          </div>
          <div className="input-field">
          <label htmlFor="startDate">Start Date, Time and Timezone</label><br/><br/>
          <DateTimePicker onChange={this.onChangesDate} value={this.state.sDate} /> <br /><br />
              <Select options={optionsValues}  style={{width: '200px', height: '25px'}}
              onChange={StartTimezone => this.setState({ StartTimezone })}
              />
              <br/>       
          </div>
          <div className="input-field">
            <label htmlFor="endDate">End Date, Time and Timezone</label><br/><br/>
            <DateTimePicker onChange={this.onChangeeDate} value={this.state.eDate} /> <br /><br />
              <Select options={optionsValues}  style={{width: '200px', height: '25px'}}
              onChange={EndTimezone => this.setState({ EndTimezone })}
              />
          </div>
          <div className="input-field">
          <label htmlFor="numOfParticipants">No. of Participants</label><br/><br/>
            <input type="text" id='numOfParticipants' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
          </div>
          <div className="input-field">
          <label htmlFor="generateCode">Generate Code</label><br/><br/>
            <input type="text" id='generateCode' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
            <input type="button" className="btn pink lighten-1 z-depth-0"  value="Generate" onClick={this.GenCode}/>
          </div><br/>
          <div className="input-field">
            <button className="btn pink lighten-1">Add</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)

// import TimezonePicker from 'react-timezone'
// import { DatePicker } from 'antd';
// import TimePicker from 'react-time-picker';
// import Tpicker from './TimePicker';
 {/* <input type="date" format="YYYY-MM-D" style={{ width: '200px', height: '25px' }}
            onChange={ e => this.setState({ startDate: e.target.value })}
              /><span> </span>
              <TP value={this.state.Starttime} onChange={Starttime => this.setState({ Starttime })} /> */}
              {/* <Timepicker value={this.state.Starttime} onChange={Starttime => this.setState({ Starttime })} /> */}
               
 {/* <TimePicker onChange={this.onChange} value={this.state.time} /> */}
              {/* <DatePicker format="YYYY-MM-D HH:m:s" />{'  '} */}
               {/* <input type="date" format="YYYY-MM-D" style={{width: '200px', height: '25px'}}
            onChange={e => this.setState({ endDate: e.target.value })}
              />
              <TP value={this.state.EndTime} onChange={EndTime => this.setState({ EndTime })} /> */}
              {/* <Timepicker value={this.state.EndTime} onChange={EndTime => this.setState({ EndTime })} /> */}
 {/* <input
            type="date"
            onChange={e => this.setState({ startDate: e.target.value })}
            format="YYYY-MM-D HH:m:s"
            style={{width: '200px', height: '25px'}}
              />  */}
              {/* <Tpicker /> */}
                {/* <input
                    type="date"
                    format="YYYY-MM-D HH:m:s"
                    style={{width: '200px', height: '25px'}}
                    onChange={e => this.setState({ endDate: e.target.value })}
                  /> */}
                  // {startDate && (
                  //   <React.Fragment>
                  //     <h6 htmlFor="startDate">End Date:</h6>
                  //     <DatePicker format="YYYY-MM-D HH:m:s" />
                  //      <TimezonePicker
                  //       // value="Asia/Yerevan"
                  //       placeholder= "Select Timezone"
                  //       onChange={timezone => console.log('New Timezone Selected:', timezone)}
                  //       inputProps={{
                  //         placeholder: 'Select Timezone...',
                  //         name: 'timezone',
                  //       }}
                  //       />
                  //   </React.Fragment>
                  // )}  

                   {/* <TimezonePicker
                placeholder= "Select Timezone" id={StartTimezone} name="StartTimezone"
                onChange={this.handleChangeTimezone}
                inputProps={{
                  placeholder: 'Select Timezone...',
                  onChange={handleChangeTimezone},
                  name: 'timezone',
                }}  
             /> */}
                         {/* <DatePicker format="YYYY-MM-D HH:m:s" />{'  '} */}
             {/* timezone => console.log(timezone) */}

             {/* <TimezonePicker
                    placeholder= "Select Timezone"
                    onChange={timezone => console.log('New Timezone Selected:', timezone)}
                    inputProps={{
                      placeholder: 'Select Timezone...',
                      name: 'timezone',
                    }}
                    /> */}