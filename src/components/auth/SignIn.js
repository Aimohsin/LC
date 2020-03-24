import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

class SignIn extends Component {
  state = {
    email: '',
    password: '',
    isPasswordShown: false
  }
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  }

  render() {
    const { isPasswordShown } = this.state;
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' /> 
    return (
      <div>
        <Header />
        <Sidebar />
        <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
      <div style={{textAlign: 'center'}} className="container">
        <br />
        <form className="white" onSubmit={this.handleSubmit}>
          <h2>LearningCert</h2><br/><br/>
          <h5 className="grey-text text-darken-3">Sign In as Trainer</h5>
          <br />
          <div className="input-field">
            <label htmlFor="email">Email</label><span> </span>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label><span> </span>
            <input type={isPasswordShown ? "text" : "password"} id='password' onChange={this.handleChange} />
            <i class="fas fa-eye" onClick={this.togglePasswordVisiblity}></i>
          </div><br />
          <div className="input-field">
            <button type="button" className="btn btn-info">Login</button>
            <div className="center red-text">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div><br />
          <div>
            <a href="http://192.168.18.5:3001/trainerNew">Signup</a>
            <div className="center red-text">
            </div>
          </div><br />
          {/* <div>
            <a href="http://192.168.18.5:3001/participantSignIN">If you are a Participant, Click Here</a>
            <div className="center red-text">
            </div>
          </div>
          <div>
            <a href="http://192.168.18.5:3001/">If you are an Admin, Click Here</a>
            <div className="center red-text">
            </div>
          </div> */}
        </form>
        </div>
        </div></div></div>
        <Footer />
      </div>
    )
  }
}
// className="fa fa-eye password-icon" 

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
