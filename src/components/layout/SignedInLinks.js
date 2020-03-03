import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <nav className="nav-wrapper grey darken-3">
      <ul className="right">
        <li><NavLink to='/loginProfile'>User Profile</NavLink></li>
        <li><NavLink to='/newest'>Edit Profile</NavLink></li>
        <li><NavLink to='/courseApproval'>Course Approval</NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
      </ul>
      </nav>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
