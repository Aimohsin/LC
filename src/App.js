import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import AddTrainer from './components/trainers/AddTrainer'
import loginProfile from './components/trainers/LogPro1'
import Newest from './components/trainers/Newest'
import CreateCourse from './components/Course/CreateCourse'
import CourseDetails from './components/Course/CourseDetails'
import EnrolledCourseDetails from './components/EnrolledCourses/EnrolledCourseDetails'
import CoursePage from './components/trainers/CoursePage'
import CourseApproval from './components/trainers/CourseApprovals'
import FileUploader from './components/functions/uploadFile'
import Offerings from './components/trainers/OfferingsPage'
import EditOffering from './components/trainers/EditOffering'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/addtrainer' component={AddTrainer} />
            <Route path='/loginProfile' component={loginProfile} />
            <Route path='/newest' component={Newest} />
            <Route path='/createCourse' component={CreateCourse} />
            <Route path='/project/:id' component={CourseDetails} />
            <Route path='/EnrolledCourse' component={EnrolledCourseDetails} />
            <Route path='/coursePage' component={CoursePage} />
            <Route path='/courseApproval' component={CourseApproval} />
            <Route path='/uploadFile' component={FileUploader} />
            <Route path='/offerings' component={Offerings} />
            <Route path='/editOffering' component={EditOffering} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
