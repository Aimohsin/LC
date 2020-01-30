import React, { Component } from 'react'
import firebase from '../../config/fbConfig'
import FileUploader from "react-firebase-file-uploader"; 

class editLoginProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'', firstName:'', lastName:'', gender:'', role:'', address:'', city:'', country:'', zipcode:'', cell1:'', cell2:'', email1:'',
      email2:'', linkedInProfile:'', website:'', currentEmployer:'', avatar: '', isUploading: false, progress: 0, avatarURL: '', 
      degreeTitle:'', degreeUni:'', yearAwarded:'', dcountry:'',  
      designation:'', employer:'', jfrom:'', jto:'', jcountry:'' , 
      briefSummary:'', totalExperience:'', teachingExperience:'', countriesServed:'', languages:'' ,
      accountTitle:'', accountID:'', bankName:'', branchName:'', IBAN:'', SWIFT:'', VAT_ID:'',
      appliedFor:'', approvedCourses:'', OtherCourses:'', HistNoCourses:'', HistNoParticipants:'', rating:'', feedback:'', courseTitle:'', 
      startDate:'', endDate:'', location:'', timings:'', 
      certificateName: '', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:''
    }
  }

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

  ChangeHandler = (e) => {
    this.setState({
      [e.target.id] : [e.target.value]
    })
  } 

  getdata () {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/Trainers/' + uid).on('value', (snapshot) => {
        //console.log(snapshot.val());
        this.setState ({
            email: snapshot.val().email,
            firstName: snapshot.val().firstName,
            lastName: snapshot.val().lastName,
            datecreated: snapshot.val().datecreated,
            role: snapshot.val().role,
            gender: snapshot.val().gender,
            address: snapshot.val().address,
            city: snapshot.val().city,
            country: snapshot.val().country,
            zipcode: snapshot.val().zipcode,
            cell1: snapshot.val().cell1,
            cell2: snapshot.val().cell2,
            email1: snapshot.val().email1,
            email2: snapshot.val().email2,
            linkedInProfile: snapshot.val().linkedInProfile,
            website: snapshot.val().website,
            currentEmployer: snapshot.val().currentEmployer,
            degreeTitle: snapshot.val().degreeTitle,
            degreeUni: snapshot.val().degreeUni,
            yearAwarded: snapshot.val().yearAwarded,
            dcountry: snapshot.val().dcountry,
            designation: snapshot.val().designation,
            employer: snapshot.val().employer,
            jfrom: snapshot.val().jfrom,
            jto: snapshot.val().jto,
            jcountry: snapshot.val().jcountry,
            briefSummary: snapshot.val().briefSummary,
            totalExperience: snapshot.val().totalExperience,
            teachingExperience: snapshot.val().teachingExperience,
            countriesServed: snapshot.val().countriesServed,
            languages: snapshot.val().languages,
            certificateName: snapshot.val().certificateName,
            certIssuedBy: snapshot.val().certIssuedBy,
            certDateIssue: snapshot.val().certDateIssue,
            certExpiry: snapshot.val().certExpiry,
            certID: snapshot.val().certID,
            accountTitle: snapshot.val().accountTitle,
            accountID: snapshot.val().accountID,
            bankName: snapshot.val().bankName,
            branchName: snapshot.val().branchName,
            IBAN: snapshot.val().IBAN,
            SWIFT: snapshot.val().SWIFT,
            VAT_ID: snapshot.val().VAT_ID
        })
      })
    }

componentDidMount(){
    this.getdata();
}

  SubmitHandler = (e) => {
      e.preventDefault();
      var uid = firebase.auth().currentUser.uid;
      const db = firebase.database().ref('Users/Trainers/' + uid).set({
        avatar: this.state.avatar,
        progress: this.state.progress,
        avatarURL: this.state.avatarURL,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: this.state.role,
        gender: this.state.gender,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        zipcode: this.state.zipcode,
        cell1: this.state.cell1,
        cell2: this.state.cell2,
        email1: this.state.email1,
        email2: this.state.email2,
        linkedInProfile: this.state.linkedInProfile,
        website: this.state.website,
        currentEmployer: this.state.currentEmployer,
        degreeTitle: this.state.degreeTitle,
        degreeUni: this.state.degreeUni,
        yearAwarded: this.state.yearAwarded,
        dcountry: this.state.dcountry,
        designation: this.state.designation,
        employer: this.state.employer,
        jfrom: this.state.jfrom,
        jto: this.state.jto,
        jcountry: this.state.jcountry,
        briefSummary: this.state.briefSummary,
        totalExperience: this.state.totalExperience,
        teachingExperience: this.state.teachingExperience,
        countriesServed: this.state.countriesServed,
        languages: this.state.languages,
        accountTitle: this.state.accountTitle,
        accountID: this.state.accountID,
        bankName: this.state.bankName,
        branchName: this.state.branchName,
        IBAN: this.state.IBAN,
        SWIFT: this.state.SWIFT,
        VAT_ID: this.state.VAT_ID,
        certificateName: this.state.certificateName,
        certIssuedBy: this.state.certIssuedBy,
        certDateIssue: this.state.certDateIssue,
        certExpiry: this.state.certExpiry,
        certID: this.state.certID
        // appliedFor: this.state.appliedFor,
        // approvedCourses: this.state.approvedCourses,
        // OtherCourses: this.state.OtherCourses,
        // HistNoCourses: this.state.HistNoCourses,
        // HistNoParticipants: this.state.HistNoParticipants,
        // rating: this.state.rating,
        // feedback: this.state.feedback,
        // courseTitle: this.state.courseTitle,
        // startDate: this.state.startDate,
        // endDate: this.state.endDate,
        // location: this.state.location,
        // timings: this.state.timings
      })  
      this.props.history.push('/loginProfile')
  }

  render(){
      return(
        <div>
        <div className="container section project-details">
        <form  onSubmit={this.SubmitHandler}>
    <div className="card z-depth-0">
      <div className="card-content">
          <h2>Edit Profile Details: </h2>
          <label>Choose Picture</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} alt={this.state.avatarURL} />}
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
          <h4>Personal Information</h4>
            <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' value={this.state.email} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' value={this.state.firstName} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' value={this.state.lastName} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="gender">Gender</label>
            <input type="text" id='gender' value={this.state.gender} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Role</label>
            <input type="text" id='role' value={'2'} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id='address' value={this.state.address} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="city">City</label>
            <input type="text" id='city' value={this.state.city} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="country">Country</label>
            <input type="text" id='country' value={this.state.country} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" id='zipcode' value={this.state.zipcode} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="cell1">Cell # 1</label>
            <input type="text" id='cell1' value={this.state.cell1} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="cell2">Cell # 2</label>
            <input type="text" id='cell2' value={this.state.cell2} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="email1">Email # 1</label>
            <input type="text" id='email1' value={this.state.email1} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="email2">Email # 2</label>
            <input type="text" id='email2' value={this.state.email2} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="linkedInProfile">LinkedIn Profile</label>
            <input type="text" id='linkedInProfile' value={this.state.linkedInProfile} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="website">Website</label>
            <input type="text" id='website' value={this.state.website} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="currentEmployer">Current Employer</label>
            <input type="text" id='currentEmployer' value={this.state.currentEmployer} onChange={this.ChangeHandler} />
          </div>
          <h4>Academic Information</h4>
          <div className="input-field">
            <label htmlFor="degreeTitle">Degree Title</label>
            <input type="text" id='degreeTitle' value={this.state.degreeTitle} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="degreeUni">Degree University</label>
            <input type="text" id='degreeUni' value={this.state.degreeUni} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="yearAwarded">Year Awarded</label>
            <input type="text" id='yearAwarded' value={this.state.yearAwarded} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="dcountry">Country</label>
            <input type="text" id='dcountry' value={this.state.dcountry} onChange={this.ChangeHandler} />
          </div>
          <h4>Job History</h4>
          <div className="input-field">
            <label htmlFor="designation">Designation</label>
            <input type="text" id='designation' value={this.state.designation} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="employer">Employer</label>
            <input type="text" id='employer' value={this.state.employer} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="jfrom">From</label>
            <input type="text" id='jfrom' value={this.state.jfrom} onChange={this.ChangeHandler} />
          </div> 
          <div className="input-field">
            <label htmlFor="jto">To</label>
            <input type="text" id='jto' value={this.state.jto} onChange={this.ChangeHandler} />
          </div> 
          <div className="input-field">
            <label htmlFor="jcountry">Country</label>
            <input type="text" id='jcountry' value={this.state.jcountry} onChange={this.ChangeHandler} />
          </div> 
          <div className="input-field">
          <h4>Brief Summary (2000 characters including spaces)</h4>
            <input type="text" id='briefSummary' value={this.state.briefSummary} onChange={this.ChangeHandler} />
          </div> 
          <h4>Resume/Profile</h4>
          <h4>Certificate</h4>
          <div className="input-field">
            <label htmlFor="certificateName">Certificate Name</label>
            <input type="text" id='certificateName' value={this.state.certificateName} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="certIssuedBy">Issued by</label>
            <input type="text" id='certIssuedBy' value={this.state.certIssuedBy} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="certDateIssue">Date Issued</label>
            <input type="text" id='certDateIssue' value={this.state.certDateIssue} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="certExpiry">Expiry</label>
            <input type="text" id='certExpiry' value={this.state.certExpiry} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="certID">ID</label>
            <input type="text" id='certID' value={this.state.certID} onChange={this.ChangeHandler} />
          </div>
        <br/>
          <h4>General Information</h4>
          <div className="input-field">
            <label htmlFor="totalExperience">Total Experience</label>
            <input type="text" id='totalExperience' value={this.state.totalExperience} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="teachingExperience">Teaching Experience</label>
            <input type="text" id='teachingExperience' value={this.state.teachingExperience} onChange={this.ChangeHandler} />
          </div>           
          <div className="input-field">
            <label htmlFor="countriesServed">Countries Served</label>
            <input type="text" id='countriesServed' value={this.state.countriesServed} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="languages">Languages</label>
            <input type="text" id='languages' value={this.state.languages} onChange={this.ChangeHandler} />
          </div>
          <h4>Bank Information</h4>
          <div className="input-field">
            <label htmlFor="accountTitle">Account Title</label>
            <input type="text" id='accountTitle' value={this.state.accountTitle} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="accountID">Account ID</label>
            <input type="text" id='accountID' value={this.state.accountID} onChange={this.ChangeHandler} />
          </div>           
          <div className="input-field">
            <label htmlFor="bankName">Bank Name</label>
            <input type="text" id='bankName' value={this.state.bankName} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="branchName">Branch Name</label>
            <input type="text" id='branchName' value={this.state.branchName} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="IBAN">IBAN</label>
            <input type="text" id='IBAN' value={this.state.IBAN} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="SWIFT">SWIFT</label>
            <input type="text" id='SWIFT' value={this.state.SWIFT} onChange={this.ChangeHandler} />
          </div>           
          <div className="input-field">
            <label htmlFor="VAT_ID">VAT ID</label>
            <input type="text" id='VAT_ID' value={this.state.VAT_ID} onChange={this.ChangeHandler} />
          </div>
          <div>
            <button>Save Changes</button>
          </div></div></div>
    </form>
  </div></div>
    )
  }}


export default editLoginProfile

 {/* {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />} */}
          {/* <FileUploader
            accept="file/*"
            name="resume"
            randomizeFilename
            storageRef={firebase.storage().ref("resume")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          /> */}

        {/* <br/> */}

        
          {/* {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />} */}
          {/* <FileUploader
            accept="file/*"
            name="ceritificate"
            randomizeFilename
            storageRef={firebase.storage().ref("ceritificate")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          /> */}

          
          {/* <h4>Applied for training courses with LearningCert</h4>
          <div className="input-field">
            <input type="text" id='appliedFor' value={this.state.appliedFor} onChange={this.ChangeHandler} />
          </div>
          <h4>Approved for following training courses with LearningCert</h4>
          <div className="input-field">
            <input type="text" id='approvedCourses' value={this.state.approvedCourses} onChange={this.ChangeHandler} />
          </div>
          <h4>Courses that I also teach (other than LearningCert)</h4>
          <div className="input-field">
            <input type="text" id='OtherCourses' value={this.state.OtherCourses} onChange={this.ChangeHandler} />
          </div>      
          <h4>History with LearningCert </h4>
          <div className="input-field">
            <label htmlFor="HistNoCourses">Number of courses:</label>
            <input type="text" id='HistNoCourses' value={this.state.HistNoCourses} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="HistNoParticipants">Number of Participants:</label>
            <input type="text" id='HistNoParticipants' value={this.state.HistNoParticipants} onChange={this.ChangeHandler} />
          </div>
          <h4>Aggregation Rating: (out of 5.0) </h4>
          <div className="input-field">
            <input type="text" id='rating' value={this.state.rating} onChange={this.ChangeHandler} />
          </div>
          <h4>Selected feedback (statements for audience): </h4>
          <div className="input-field">
            <input type="text" id='feedback' value={this.state.feedback} onChange={this.ChangeHandler} />
          </div>
          <h4>Training Events: </h4>
          <div className="input-field">
            <label htmlFor="courseTitle">Course Title </label>
            <input type="text" id='courseTitle' value={this.state.courseTitle} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="startDate">Start Date </label>
            <input type="text" id='startDate' value={this.state.startDate} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="endDate">End Date </label>
            <input type="text" id='endDate' value={this.state.endDate} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="location">Location (or online)</label>
            <input type="text" id='location' value={this.state.location} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="timings">Timings </label>
            <input type="text" id='timings' value={this.state.timings} onChange={this.ChangeHandler} />
          </div> */}
