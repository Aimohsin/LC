import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
       <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
            </li>
        </ul>
      <div className="container">
        <p><Link to='/' className="brand-logo">Trainer Platform</Link></p>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)



// <div className="navbar">
    //             <a href='./'>LearningCert</a>
    //                 <div class="dropdown">
    //                 <button class="dropbtn">Users
    //                 <i class="fa fa-caret-down"></i>
    //                 </button>
    //                 <div class="dropdown-content">
    //                 <a href="./">Admin</a>
    //                 <a href="http://192.168.18.5:3000/signin">Trainer Platform</a>
    //                 <a href="/participantSignIN">Participant Platform</a>
    //                 </div>
    //             </div> 
    //         </div>