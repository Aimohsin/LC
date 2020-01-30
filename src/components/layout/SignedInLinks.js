import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
      <li><NavLink to='/loginProfile'>User Profile</NavLink></li>
      <li><NavLink to='/editLoginProfile'>Edit User Profile</NavLink></li>
      <li><NavLink to='/editUpdate'>Edit Update</NavLink></li>
      <li><NavLink to='/editLatest'>Edit Latest</NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
        {/* <li><NavLink to={'/profile/'} className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </NavLink></li> */}
                {/* <li><NavLink to='/create'>Add Course</NavLink></li> */}
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)