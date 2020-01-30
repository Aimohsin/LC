import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addtrainer } from '../../store/actions/trainerAction'
import { signUp } from '../../store/actions/authActions'
import firebase from '../../config/fbConfig'
import { Redirect } from 'react-router-dom'
import FileUploader from "react-firebase-file-uploader"; 

class AddTrainer extends Component {
  state = {
    email: '',
    password: '', 
    firstName: '',
    lastName: '',
    role:'',
    datecreated: '',
    datemodified: '',
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: "",
    isPasswordShown: false
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
  GenPass(){
    var generator = require('generate-password');
    var password = generator.generate({
        length:6,
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
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.addtrainer(this.state);
    this.props.signUp(this.state);
    this.props.history.push('/');
  }
  render() {
    const { isPasswordShown } = this.state;
    const { auth, authError } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add Trainer</h5>
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} alt={this.state.avatarURL}/>}
          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        <br/>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type={isPasswordShown ? "text" : "password"} id='password' onChange={this.handleChange} />
            <i className="fa fa-eye password-icon" onClick={this.togglePasswordVisiblity} />
            <input type="button" class="button" className="btn pink lighten-1 z-depth-0"  value="Generate Password" onClick={this.GenPass}/>
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Role</label>
            <input type="text" id='role' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="datecreated">Date Created</label>
            <input type="text" id='datecreated' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="datemodified">Date Modified</label>
            <input type="text" id='datemodified' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Add</button>
            { authError ? <p>{authError}</p> : null }
            <div className="center red-text">
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.firebase.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addtrainer: (add) => dispatch(addtrainer(add)),
    signUp: (creds) => dispatch(signUp(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTrainer)
