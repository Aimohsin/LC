import React, { Component } from 'react'
// import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
// import TrainerList from '../trainerProfile/TrainerList'



class Dashboard extends Component {
  render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to='/signin' /> 

    return (
      <div className="dashboard container">
        <h3>Welcome {auth.username}</h3>
        {/* <h6>List Of Trainers</h6> */}
        <div className="row">
          <div className="col s12 m6">
            {/* <TrainerList trainers={trainers} />
            <ProjectList projects={projects} /> */}
          </div>
         
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // trainers: state.firestore.ordered.trainers,
    //projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc']},
    { collection:'trainers', orderBy: ['createdAt', 'desc']},
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc']}
  ])
)(Dashboard)
