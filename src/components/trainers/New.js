import React, { Component } from 'react'
import firebase from '../../config/fbConfig'
import FileUploader from "react-firebase-file-uploader"; 


class editLoginProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      email:'', firstName:'', lastName:'', gender:'', role:'', address:'', city:'', country:'', zipcode:'', cell1:'', cell2:'', email1:'',
      email2:'', linkedInProfile:'', website:'', currentEmployer:'', avatar: '', isUploading: false, progress: 0, avatarURL: '' ,
      briefSummary:'', totalExperience:'', teachingExperience:'', countriesServed:'', languages:'' , 
      appliedFor:'', approvedCourses:'', OtherCourses:'', HistNoCourses:'', HistNoParticipants:'', rating:'', feedback:'', courseTitle:'', 
      startDate:'', endDate:'', location:'', timings:'',     
      Acadevalues: [{ degreeTitle:'', degreeUni:'', yearAwarded:'', yearAwarded:''}],
      JobHistvalues: [{ designation:'', employer:'', jfrom:'', jto:'', jcountry:''}],
      Certvalues: [{ certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:''}]
    }
  }

  CertDynamicChangeHandler = (e) => {
    if(['certificateName', 'certIssuedBy', 'certDateIssue', 'certExpiry', 'certID'].includes(e.target.className) ){
        let Certvalues = [...this.state.Certvalues]
        Certvalues[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({ Certvalues }, () => 
        console.log(this.state.Certvalues))
    }else {
        this.setState({ [e.target.id]: e.target.value})
    }
}

  JobHistDynamicChangeHandler = (e) => {
    if(['designation', 'employer', 'jfrom', 'jto', 'jcountry'].includes(e.target.className) ){
        let JobHistvalues = [...this.state.JobHistvalues]
        JobHistvalues[e.target.dataset.id][e.target.className] = e.target.value
        this.setState({ JobHistvalues }, () => 
        console.log(this.state.JobHistvalues))
    }else {
        this.setState({ [e.target.id]: e.target.value})
    }
}

  AcadDynamicChangeHandler = (e) => {
      if(['degreeTitle', 'degreeUni', 'yearAwarded', 'yearAwarded'].includes(e.target.className) ){
          let Acadevalues = [...this.state.Acadevalues]
          Acadevalues[e.target.dataset.id][e.target.className] = e.target.value
          this.setState({ Acadevalues }, () => 
          console.log(this.state.Acadevalues))
      }else {
          this.setState({ [e.target.id]: e.target.value})
      }
  }

  addJobHistClick() {
    this.setState(prevState => ({
      JobHistvalues: [...prevState.JobHistvalues, { designation:'', employer:'', jfrom:'', jto:'', jcountry:'' }]
    }));
  }

  removeJobHistClick(i) {
    let JobHistvalues = [...this.state.JobHistvalues];
    JobHistvalues.splice(i, 1);
    this.setState({ designation:'', employer:'', jfrom:'', jto:'', jcountry:'' });
  }

  addCertClick() {
    this.setState(prevState => ({
      Certvalues: [...prevState.Certvalues, { certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:'' }]
    }));
  }

  removeCertClick(i) {
    let Certvalues = [...this.state.Certvalues];
    Certvalues.splice(i, 1);
    this.setState({ Certvalues });
  }
 
  addAcadeClick() {
    this.setState(prevState => ({
      Acadevalues: [...prevState.Acadevalues, { degreeTitle:'', degreeUni:'', yearAwarded:'', dcountry:'' }]
    }));
  }

  removeAcadeClick(i) {
    let Acadevalues = [...this.state.Acadevalues];
    Acadevalues.splice(i, 1);
    this.setState({ Acadevalues });
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
            degreeTitle: snapshot.val().degreeTitle,
            degreeUni: snapshot.val().degreeUni,
            yearAwarded: snapshot.val().yearAwarded,
            dcountry: snapshot.val().dcountry,
            designation: snapshot.val().designation,
            employer: snapshot.val().employer,
            jfrom: snapshot.val().jfrom,
            jto: snapshot.val().jto,
            jcountry: snapshot.val().jcountry,
            certificateName: snapshot.val().certificateName,
            certIssuedBy: snapshot.val().certIssuedBy,
            // certDateIssue: snapshot
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
        degreeTitle: this.state.degreeTitle,
        degreeUni: this.state.degreeUni,
        yearAwarded: this.state.yearAwarded,
        dcountry: this.state.dcountry,
        designation: this.state.designation,
        employer: this.state.employer,
        jfrom: this.state.jfrom,
        jto: this.state.jto,
        jcountry: this.state.jcountry,
        certificateName: this.state.certificateName,
        certIssuedBy: this.state.certIssuedBy,
        certDateIssue: this.state.certDateIssue,
        certExpiry: this.state.certExpiry,
        certID: this.state.certID
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
          <div>
          <h4>Academic Information
            <i class="fa fa-plus" aria-hidden="true" onClick={() => this.addAcadeClick()}></i>
            <i class="fa fa-minus" aria-hidden="true" onClick={() => this.removeAcadeClick()}></i>
            </h4>
          {this.state.Acadevalues.map((el, i) => {
              let degTitle_id = `degreeTitle-${i}`, degUni_id = `degreeUni-${i}`, yearAward_id = `yearAwarded-${i}`, dcount_id = `dcountry-${i}`
              return(
          <div key={i} onChange={this.AcadDynamicChangeHandler}>
            <div className="input-field">
                <label htmlFor="degreeTitle">Degree Title</label>
                <input type="text" value={this.state.Acadevalues[i].degreeTitle} id={degTitle_id} />
                </div>
                <div className="input-field">
                <label htmlFor="degreeUni">Degree University</label>
                <input type="text" value={this.state.Acadevalues[i].degreeUni} id={degUni_id} />
                </div>
                <div className="input-field">
                <label htmlFor="yearAwarded">Year Awarded</label>
                <input type="text" value={this.state.Acadevalues[i].yearAwarded} id={yearAward_id} />
                </div>
                <div className="input-field">
                <label htmlFor="dcountry">Country</label>
                <input type="text" value={this.state.Acadevalues[i].dcountry} id={dcount_id} />
                </div>
                <br/>
          </div>
        )})}
        </div>
        <div>
          <h4>Job History
            <i class="fa fa-plus" aria-hidden="true" onClick={() => this.addJobHistClick()}></i>
            <i class="fa fa-minus" aria-hidden="true" onClick={() => this.removeJobHistClick()}></i>
            </h4>
          {this.state.JobHistvalues.map((el, i) => {
              let designation_id = `designation-${i}`, employer_id = `employer-${i}`, jfrom_id = `jfrom-${i}`, jto_id = `jto-${i}`, jcountry_id= `jcountry-${i}`
          return(
          <div key={i} onChange={this.JobHistDynamicChangeHandler}>
            <div className="input-field">
                    <label htmlFor="designation">Designation</label>
                    <input type="text" value={this.state.JobHistvalues[i].designation} id={designation_id} />
                  </div>
                  <div className="input-field">
                    <label htmlFor="employer">Employer</label>
                    <input type="text" value={this.state.JobHistvalues[i].employer} id={employer_id} />
                  </div>          
                  <div className="input-field">
                    <label htmlFor="jfrom">From</label>
                    <input type="text" value={this.state.JobHistvalues[i].jfrom} id={jfrom_id} />
                  </div> 
                  <div className="input-field">
                    <label htmlFor="jto">To</label>
                    <input type="text" value={this.state.JobHistvalues[i].jto} id={jto_id} />
                  </div> 
                  <div className="input-field">
                    <label htmlFor="jcountry">Country</label>
                    <input type="text" value={this.state.JobHistvalues[i].jcountry} id={jcountry_id} />
                  </div><br/></div>
        )})}
        </div>
          <div className="input-field">
          <h4>Brief Summary (2000 characters including spaces)</h4>
            <input type="text" id='briefSummary' value={this.state.briefSummary} onChange={this.ChangeHandler} />
          </div> 
          <h4>Resume/Profile</h4>
          <div>
          <h4>Certificate
            <i class="fa fa-plus" aria-hidden="true" onClick={() => this.addCertClick()}></i>
            <i class="fa fa-minus" aria-hidden="true" onClick={() => this.removeCertClick()}></i>
            </h4>
          {this.state.Certvalues.map((el, i) => {
              let certificateName_id = `certificateName-${i}`, certIssuedBy_id = `certIssuedBy-${i}`, certDateIssue_id = `certDateIssue-${i}`,
              certExpiry_id = `certExpiry-${i}`, certID_id = `certID-${i}`
              return(
          <div key={i} onChange={this.CertDynamicChangeHandler}>
            <div className="input-field">
            <label htmlFor="certificateName">Certificate Name</label>
            <input type="text" value={this.state.Certvalues[i].certificateName} id={certificateName_id} />
            </div>
            <div className="input-field">
            <label htmlFor="certIssuedBy">Issued by</label>
            <input type="text" value={this.state.Certvalues[i].certIssuedBy} id={certIssuedBy_id} />
            </div>
            <div className="input-field">
            <label htmlFor="certDateIssue">Date Issued</label>
            <input type="text" value={this.state.Certvalues[i].certDateIssue} id={certDateIssue_id} />
            </div>
            <div className="input-field">
            <label htmlFor="certExpiry">Expiry</label>
            <input type="text" value={this.state.Certvalues[i].certExpiry} id={certExpiry_id} />
            </div>
            <div className="input-field">
            <label htmlFor="certID">ID</label>
            <input type="text" value={this.state.Certvalues[i].certID} id={certID_id} />
            </div><br/></div>
        )})}
        </div>
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
          </div>
        </div>
    </div>
    </form>
  </div>
  </div>
    )
  }}


export default editLoginProfile

    //   add:[ { degreeTitle:'', degreeUni:'', yearAwarded:'', dcountry:'' }], 
    //   addCertif: [ { designation:'', employer:'', jfrom:'', jto:'', jcountry:'' } ], 
    //   addJobHist: [ { certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:'' } ], 
    //   Acadevalues: [{ Acadevalues: null }], Certvalues: [{ Certvalues: null }], JobHistvalues: [{ JobHistvalues: null }] 