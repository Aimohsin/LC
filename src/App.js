import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import AddTrainer from './components/trainers/AddTrainer'
import loginProfile from './components/trainers/LogPro1'
import EditLoginProfile from './components/trainers/EditLoginProfile'
import Exam1 from './components/hide/show/app'
import EditUpdate from './components/trainers/EditUpdate'
import EditLatest from './components/trainers/EditLatestUpdate'

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
            <Route path='/editLoginProfile' component={EditLoginProfile} />
            <Route path='/exam1' component={Exam1} />
            <Route path='/editUpdate' component={EditUpdate} />
            <Route path='/editLatest' component={EditLatest} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
