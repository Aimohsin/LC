import React, { Component } from 'react'
import firebase from '../../config/fbConfig'
import FileUploader from "react-firebase-file-uploader"; 
// import ExampleComponent from 'react-rounded-image'
import UploadFile from '../functions/uploadFile'
import BookView from './AcademicValues/AcadeView';
import JobHistory from './JobHistValues/JobHistView';
import CertHistory from './CertificateValues/CertView';
// import Languages from './Languages';
// import LocationsCovered from './LocationsCovered';
import LC from './LC'
import Lang from './Lang'
import PropTypes from 'prop-types';
import Select from 'react-select'

const LCoptions = [
  { label:'Afghanistan', value:'Afghanistan' },
  { label:'Åland Islands', value:'Åland Islands' },
  { label:'Albania', value:'Albania' },
  { label:'Algeria', value:'Algeria' },
  { label:'American Samoa', value:'American Samoa' },
  { label:'Andorra', value:'Andorra' },
  { label:'Angola', value:'Angola' },
  { label:'Anguilla', value:'Anguilla' },
  { label:'Antarctica', value:'Antarctica' },
  { label:'Antigua and Barbuda', value:'Antigua and Barbuda' },
  { label:'Argentina', value:'Argentina' },
  { label:'Armenia', value:'Armenia' },
  { label:'Aruba', value:'Aruba' },
  { label:'Australia', value:'Australia' },
  { label:'Austria', value:'Austria' },
  { label:'Azerbaijan', value:'Azerbaijan' },
  { label:'Bahamas', value:'Bahamas' },
  { label:'Bahrain', value:'Bahrain' },
  { label:'Bangladesh', value:'Bangladesh' },
  { label:'Barbados', value:'Barbados' },
  { label:'Belarus', value:'Belarus' },
  { label:'Belgium', value:'Belgium' },
  { label:'Belize', value:'Belize' },
  { label:'Benin', value:'Benin' },
  { label:'Bermuda', value:'Bermuda' },
]

const Language = [
  { label:'xyz', value:'Afghanistan' },
  { label:' Isds', value:'Åland Islands' },
  { label:'ba', value:'Albania' },
  { label:'Agria', value:'Algeria' },
  { label:'Amea', value:'American Samoa' },
]

class editLoginProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'', firstName:'', lastName:'', gender:'', role:'', address:'', city:'', country:'', zipcode:'', cell1:'', cell2:'', email1:'',
      email2:'', linkedInProfile:'', website:'', currentEmployer:'', avatar: '', isUploading: false, progress: 0, avatarURL: '' ,
      briefSummary:'', totalExperience:'', teachingExperience:'', countriesServed:'', languages:'' , 
      appliedFor:'', approvedCourses:'', OtherCourses:'', HistNoCourses:'', HistNoParticipants:'', rating:'', feedback:'', courseTitle:'', 
      startDate:'', endDate:'', location:'', timings:'',
      Acadevalues:[{ degreeTitle: null, degreeUni:null, yearAwarded: null, dcountry: null}],
      values: [{ value: null }], JHvalues: [{ JHvalue: null }], Cvalues: [{ Cvalue: null }],
      Certvalues: [{ certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:'', isUploading: false, progress: 0, avatarURL: ''}], 
      JobHistvalues: [{ designation: null, employer: null, jfrom: null, jto: null, jcountry:null }],
      degreeTitle: '', degreeUni: '', yearAwarded:'', dcountry:'', designation:'', employer:'', jfrom:'',jto:'', jcountry:'',
      certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:'', isUploading: false, progress:0, avatarURL:'', 
      locationsCovered: [], courseTrainingLanguage: [] , exampleLanguages: [], selectValue: [], selectLang: []
    }
    this.addCertClick = this.addCertClick.bind(this);
    this.addJobHistClick = this.addJobHistClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChangeLang = this.handleSelectChangeLang.bind(this);
  }

  addAcadeClick() {
    this.setState(prevState => ({
      Acadevalues: [...prevState.Acadevalues, { degreeTitle: '', degreeUni: '', yearAwarded: '', dcountry: '' }]
    }))
  }

  removeAcadeClick(i) {
    let Acadevalues = [...this.state.Acadevalues];
    Acadevalues.splice(i, 1);
    this.setState({ Acadevalues });
  }

  addJobHistClick() {
    this.setState({
      JobHistvalues: [{ designation: null, employer: null, jfrom: null, jto: null, jcountry: null }]
    }) 
  }

  removeJobHistClick(i) {
    let JobHistvalues = [...this.state.JobHistvalues];
    JobHistvalues.splice(i, 1);
    this.setState({ JobHistvalues });
  }

  addCertClick() {
       this.setState( prevState => ({
         Certvalues: [...prevState.Certvalues, {certificateName: '', certIssuedBy: '', certDateIssue: '', certExpiry: '', certID: ''}]
       }))
  }

  removeCertClick(i) {
    let Certvalues = [...this.state.Certvalues];
    Certvalues.splice(i, 1);
    this.setState({ Certvalues });
  }

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ])
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
            briefSummary: snapshot.val().briefSummary,
            totalExperience: snapshot.val().totalExperience,
            teachingExperience: snapshot.val().teachingExperience,
            countriesServed: snapshot.val().countriesServed,
            languages: snapshot.val().languages,
            accountTitle: snapshot.val().accountTitle,
            accountID: snapshot.val().accountID,
            bankName: snapshot.val().bankName,
            branchName: snapshot.val().branchName,
            IBAN: snapshot.val().IBAN,
            SWIFT: snapshot.val().SWIFT,
            VAT_ID: snapshot.val().VAT_ID,
            Acadevalues: snapshot.val().Acadevalues,
            JobHistvalues: snapshot.val().JobHistvalues,
            // Certvalues: snapshot.val().Certvalues,
            // locationsCovered: snapshot.val().locationsCovered,
            // courseTrainingLanguage: snapshot.val().courseTrainingLanguage,
            selectLang: snapshot.val().selectLang,
            selectValue: snapshot.val().selectValue
        })
      })
    }

    handleSelectChange(selectValue) {
      console.log('You have selected: ', selectValue);
      this.setState({ selectValue });
    }

    handleSelectChangeLang(selectLang) {
      console.log('You have selected: ', selectLang);
      this.setState({ selectLang });
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
        Acadevalues: this.state.Acadevalues,
        // Certvalues: this.state.Certvalues,
        JobHistvalues: this.state.JobHistvalues,
        // locationsCovered: this.state.locationsCovered,
        // courseTrainingLanguage: this.state.courseTrainingLanguage,
        selectLang: this.state.selectLang,
        selectValue: this.state.selectValue
    })
      this.props.history.push('/loginProfile')
  }
  render(){
      return(
        <div className="container section project-details">
        <form  onSubmit={this.SubmitHandler}>
    <div className="card z-depth-0">
      <div className="card-content">
          <h4>Edit Profile Details: </h4>
          <h5>Choose Picture</h5>
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
          <h5>Personal Information</h5>
            <div className="input-field">
            <label>Email</label>
            <input className="form-control required" type="email" id='email' value={this.state.email || ''} />
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' value={this.state.firstName || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' value={this.state.lastName || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="gender">Gender</label>
            <input type="text" id='gender' value={this.state.gender || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Role</label>
            <input type="text" id='role' value={'2'} />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <input type="text" id='address' value={this.state.address || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="city">City</label>
            <input type="text" id='city' value={this.state.city || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="country">Country</label>
            <input type="text" id='country' value={this.state.country || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="zipcode">Zip Code</label>
            <input type="text" id='zipcode' value={this.state.zipcode || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="cell1">Cell # 1</label>
            <input type="text" id='cell1' value={this.state.cell1 || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="cell2">Cell # 2</label>
            <input type="text" id='cell2' value={this.state.cell2 || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="email1">Email # 1</label>
            <input type="text" id='email1' value={this.state.email1 || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="email2">Email # 2</label>
            <input type="text" id='email2' value={this.state.email2 || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="linkedInProfile">LinkedIn Profile</label>
            <input type="text" id='linkedInProfile' value={this.state.linkedInProfile || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="website">Website</label>
            <input type="text" id='website' value={this.state.website || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="currentEmployer">Current Employer</label>
            <input type="text" id='currentEmployer' value={this.state.currentEmployer || ''} onChange={this.ChangeHandler} />
          </div>
               <BookView />          
              <JobHistory />
          <div className="input-field">
          <h5>Brief Summary (2000 characters including spaces)</h5>
          <textarea id="briefSummary"  value={this.state.briefSummary} onChange={this.ChangeHandler}></textarea>
          </div> 
          <h5>Resume/Profile</h5>
          {/* <CertHistory />  */}
          <h5>General Information</h5>
          <div className="input-field">
            <label htmlFor="totalExperience">Total Experience</label>
            <input type="text" id='totalExperience' value={this.state.totalExperience || ''} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="teachingExperience">Teaching Experience</label>
            <input type="text" id='teachingExperience' value={this.state.teachingExperience || ''} onChange={this.ChangeHandler} />
          </div>           
          <div className="input-field">
            <label htmlFor="countriesServed">Countries Served</label>
            <input type="text" id='countriesServed' value={this.state.countriesServed || ''} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="languages">Course Training Languages</label><br /><br />
            <Select options={LCoptions} 
                        isMulti 
                        closeMenuOnSelect={ false }
                        value={this.state.selectLang} joinValues
                        onChange={this.handleSelectChangeLang}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        onCloseResetsInput={false}
                        />
            {/* <Languages value={this.state.courseTrainingLanguage} /> */}
            {/* <input type="text" id='languages' value={this.state.languages || ''} onChange={this.ChangeHandler} /> */}
          </div>
          <div className="input-field">
            <label htmlFor="languages">Location covered</label><br /><br />
            {/* <LocationsCovered value={this.state.locationsCovered || ''} />    */}
            <Select 
            options={Language} 
                        isMulti 
                        closeMenuOnSelect={ false }
                        value={this.state.selectValue} joinValues
                        onChange={this.handleSelectChange}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        onCloseResetsInput={false}
                        />
            {/* <LC />        */}
            </div>
          <h5>Bank Information</h5>
          <div className="input-field">
            <label htmlFor="accountTitle">Account Title</label>
            <input type="text" id='accountTitle' value={this.state.accountTitle || ''} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="accountID">Account ID</label>
            <input type="text" id='accountID' value={this.state.accountID || ''} onChange={this.ChangeHandler} />
          </div>           
          <div className="input-field">
            <label htmlFor="bankName">Bank Name</label>
            <input type="text" id='bankName' value={this.state.bankName || ''} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="branchName">Branch Name</label>
            <input type="text" id='branchName' value={this.state.branchName || ''} onChange={this.ChangeHandler} />
          </div>
          <div className="input-field">
            <label htmlFor="IBAN">IBAN</label>
            <input type="text" id='IBAN' value={this.state.IBAN || ''} onChange={this.ChangeHandler} />
          </div>          
          <div className="input-field">
            <label htmlFor="SWIFT">SWIFT</label>
            <input type="text" id='SWIFT' value={this.state.SWIFT || ''} onChange={this.ChangeHandler} />
          </div>           
          <div className="input-field">
            <label htmlFor="VAT_ID">VAT ID</label>
            <input type="text" id='VAT_ID' value={this.state.VAT_ID || ''} onChange={this.ChangeHandler} />
          </div>
          <div>
            <button className="btn pink lighten-1">Save Changes</button>
          </div>
        </div>
    </div>
    </form>
  </div>
    )
  }}


export default editLoginProfile