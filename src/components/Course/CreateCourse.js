import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import firebase from '../../config/fbConfig'
import Select from 'react-select';
import moment from "moment";
import "antd/dist/antd.css";
import DateTimePicker from 'react-datetime-picker';
import { T } from 'antd/lib/upload/utils'
import Header from '../../Header'
import Sidebar from '../../Sidebar'
import Footer from '../../Footer'

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
      location:'', daysOfTraining:'', numOfParticipants:'', CourName:[], selectedTrainer: null, password:'',
      StartTimezone:'', Learning:[], sDate:'', eDate:'', sTime:'', eTime:''

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

GenPass(){
  var generator = require('generate-password');
  var password = generator.generate({
      length:7,
      numbers: true
  });
  document.getElementById("password").value = password;
  console.log(password);
}

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onChangeTimeZone = (e) => {
    this.setState({
      timezone: e.target.value
    })
  }

  handleDateChange = date => {
    this.setState({
      startDate: date.target.value
    }, console.log(date));
  };

  handleCode = (code) => {
    this.setState({
      generateCode: code
    })
  }

  handleTimeChange = time => {
    this.setState({
      startTime: time.target.value
    }, console.log(time));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state.sDate);
    console.log(this.state.password)
    this.props.createProject(this.state);
    console.log(this.state)
    this.props.history.push('/');
  }
  render() {
    const { selectedTrainer, sDate } = this.state;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div>
        <Header />
                    <Sidebar />
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
                 
      <div className="container">
        <br /><br/>
        <form className="white" onSubmit={this.handleSubmit}>
        
          <h5 className="grey-text text-darken-3">Add training you want to offer</h5>
          <div className="input-field">
          <label htmlFor="courseName">Training Name</label><br /><br />
            <Select value={selectedTrainer} onChange={this.handleChangeTrainer} options={this.state.CourName || ''} />
          </div><br />
          <div className="input-field">
          <label htmlFor="learning">Learning</label><br/><br/>
          <Select options={Learning} onChange={this.handleChangeLearning} value={this.state.Learning} />
          </div><br />
          <div className="input-field">
          <label htmlFor="daysOfTraining">Days of training</label><br/><br/>
            <input type="text" id='daysOfTraining' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
          </div><br />
          <div className="input-field">
          <label htmlFor="location">Location</label><br/><br/>
            <input type="text" id='location' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
          </div><br />
          <div className="input-field">
          <label htmlFor="startDate">Start Date, Time and Timezone</label><br/><br/>
            <input type="date" onChange={e => this.setState({ sDate: e.target.value })} /><br />
            <input type="time" onChange={e => this.setState({ sTime: e.target.value })} />
          <br />
              Timezone: <Select options={optionsValues}  style={{width: '200px', height: '25px'}} value={this.state.optionsValues}
              onChange={StartTimezone => this.setState({ StartTimezone })}
              />
              <br/>       
          </div>
          <div className="input-field">
            <label htmlFor="endDate">End Date, Time and Timezone</label><br/><br/>
            <input type="date" onChange={e => this.setState({ eDate: e.target.value })} /><br />
            <input type="time" onChange={e => this.setState({ eTime: e.target.value })} />
          </div>
          <div className="input-field">
          <label htmlFor="numOfParticipants">No. of Participants</label><br/><br/>
            <input type="text" id='numOfParticipants' onChange={this.handleChange} style={{width: '700px', height: '25px'}} />
          </div><br />
          <div className="input-field">
          <label htmlFor="generateCode">Generate Code</label><br/><br/>
            {/* <input type="text" id='generateCode' onChange={this.handleChange} style={{width: '700px', height: '25px'}} /> */}
            <input type="text" id='password' onChange={this.handleChange} />
            <input type="button" class="button" className="btn pink lighten-1 z-depth-0"  value="Generate" onClick={this.GenPass}/>
          </div><br/>
          <div className="input-field">
            <button type='submit' className="btn pink lighten-1">Add</button>
          </div>
        </form>
      </div>
      </div></div></div>
      <Footer />
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

            {/* <DateTimePicker onChange={this.onChangeeDate} value={this.state.eDate} /> <br /><br /> */}
          {/* <DateTimePicker onChange={this.onChangesDate} value={this.state.sDate} /> <br /><br /> */}
          {/* <DatePicker selected={this.state.startDate} value={this.state.startDate} onChange={this.handleDateChange} /> */}
          {/* Date: <DP selected={this.state.startDate} value={this.state.startDate} onChange={this.handleDateChange} /> */}
                    {/* Time: <TP selected={this.state.startTime} value={this.state.startTime} onChange={this.handleTimeChange} /> */}
{/* Date: <DP selected={this.state.endDate} value={this.state.endDate} onChange={this.handleDateChange} />
            Time: <TP selected={this.state.endTime} value={this.state.endTime} onChange={this.handleTimeChange} /> */}

