import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from './store/actions/authActions'

const SignedInLinks = (props) => {
    return (
        <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
            </li>
        </ul>
        <ul className="navbar-nav ml-auto">
            <ul className="navbar-nav">
                <li className="nav-item d-none d-sm-inline-block">
                <a href='/' className="nav-link">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <a onClick={props.signOut} className="nav-link">Log Out</a>
                </li>
            </ul>
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

// export default class Header extends Component {
//     render() {
//         return (
//             <div>
//                 <nav className="main-header navbar navbar-expand navbar-white navbar-light">
//                 {/* Left navbar links */}
//                 <ul className="navbar-nav">
//                     <li className="nav-item">
//                     <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
//                     </li>
//                 </ul>
//                 <ul className="navbar-nav ml-auto">
//                     <ul className="navbar-nav">
//                         <li className="nav-item d-none d-sm-inline-block">
//                         <a href='/' className="nav-link">Home</a>
//                         </li>
//                         <li className="nav-item d-none d-sm-inline-block">
//                         <a onClick={props.signOut} className="nav-link">Log Out</a>
//                         </li>
//                     </ul>
//                   </ul>
//                 </nav>
//             </div>
//         )
//     }
// }