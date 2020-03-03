import React, {Component} from 'react'
import firebase from '../../config/fbConfig'
import ExampleComponent from 'react-rounded-image'

class LogPro1 extends Component{

    constructor(props){
        super(props);
            this.state = { email:'', firstName:'', lastName:'', datecreated:'', role:'', gender:'', address:'', city:'', country:'',
            zipcode:'', cell1:'', cell2:'', email1:'', email2:'', linkedInProfile:'', website:'', currentEmployer:'', 
            avatar: "", isUploading: false, progress: 0, avatarURL: "", 
            briefSummary:'', totalExperience:'', teachingExperience:'', countriesServed:'', languages:''  
            , accountTitle:'', accountID:'', bankName:'', branchName:'', IBAN:'', SWIFT:'', VAT_ID:'' , appliedFor:'',approvedCourses:'', 
            OtherCourses:'', HistNoCourses:'', HistNoParticipants:'', rating:'', feedback:'', courseTitle:'',
            startDate:'', endDate:'', location:'', timings:'', 
            Acadevalues: [], JobHistvalues:[], Certvalues:[],
           locationCovered: [], courseTrainingLanguage: [], selectLang: [], selectValue:[]
        }      
    }

getdata () {
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/Trainers/' + uid).on('value', (snapshot) => {
        this.setState ({
            avatar: snapshot.val().avatar,
            progress: snapshot.val().progress,
            avatarURL: snapshot.val().avatarURL,
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
            Certvalues: snapshot.val().Certvalues,
            locationCovered: snapshot.val().locationCovered,
            courseTrainingLanguage: snapshot.val().courseTrainingLanguage,
            selectLang: snapshot.val().selectLang,
            selectValue: snapshot.val().selectValue
        }, console.log(snapshot.val().selectLang.label))
      })
    }

componentDidMount(){
    this.getdata();
}

    render(){
            return(
                <div className="container section project-details">
                    <div className="card z-depth-0">
                    <div className="card-content">
                    <h4>Profile Details</h4>
                    <dl>
                        <ExampleComponent
                            image={this.state.avatarURL}
                            roundedColor="#321124"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="13"
                        />
                        <h6>Personal Information</h6>
                        <dt>Email: {this.state.email  || ''}</dt>
                        <dt>First Name: {this.state.firstName || ''}</dt>
                        <dt>Last Name: {this.state.lastName || ''}</dt>
                        <dt>Gender: {this.state.gender || ''}</dt> 
                        <dt>Role: {this.state.role || ''}</dt>
                        <dt>Address: {this.state.address || ''}</dt>
                        <dt>City: {this.state.city || ''}</dt>
                        <dt>Country: {this.state.country || ''}</dt>
                        <dt>Zip Code: {this.state.zipcode || ''}</dt>
                        <dt>Cell # 1: {this.state.cell1 || ''}</dt>
                         <dt>Cell # 2: {this.state.cell2 || ''}</dt>
                         <dt>Email # 1: {this.state.email1 || ''}</dt>
                         <dt>Email # 2: {this.state.email2 || ''}</dt>
                         <dt>LinkedIn Profile: {this.state.linkedInProfile || ''}</dt>
                         <dt>Website: {this.state.website || ''}</dt>
                         <dt>Current Employer: {this.state.currentEmployer || ''}</dt>
                         <h4>Academic Information</h4>
                            <dt>{this.state.Acadevalues && this.state.Acadevalues.map(NAcaval => <div>
                            <dt>Degree Title: {NAcaval.degreeTitle || ''}</dt>
                            <dt>Degree Uni: {NAcaval.degreeUni || ''}</dt>
                            <dt>Year Awarded: {NAcaval.yearAwarded || ''}</dt>
                            <dt>Country: {NAcaval.dcountry || ''}</dt>
                            <br />
                            </div>)}</dt>
                         <h4>Job History</h4>
                            <dt>{this.state.JobHistvalues && this.state.JobHistvalues.map(JHval => <div>
                                <dt>Designation: {JHval.designation || ''}</dt>
                                <dt>Employer: {JHval.employer || ''}</dt>
                                <dt>From: {JHval.jfrom || ''}</dt>
                                <dt>To: {JHval.jto || ''}</dt>
                                <dt>Country: {JHval.jcountry || ''}</dt>
                                <br />
                            </div>)}</dt>
                         <h4>Brief Summary (2000 characters including spaces)</h4>
                         <dt> {this.state.briefSummary || ''}</dt>
                         <h4>Resume/Profile</h4>
                         <h4>Certificate</h4>
                            <dt>{this.state.Certvalues && this.state.Certvalues.map(cerVal => <div>
                                <dt>Certificate Name: {cerVal.certificateName || ''}</dt>
                                <dt>Certificate Issued By: {cerVal.certIssuedBy || ''}</dt>
                                <dt>Certificate Date Issue: {cerVal.certDateIssue || ''}</dt>
                                <dt>Certificate Expiry: {cerVal.certExpiry || ''}</dt>
                                <dt>Certificate ID: {cerVal.certID || ''}</dt>
                                <br />
                            </div>)}</dt>
                         <h4>General Information</h4>
                         <dt>Total Experience: {this.state.totalExperience || ''}</dt>
                         <dt>Teaching Experience: {this.state.teachingExperience || ''}</dt>
                         <dt>Countries Served: {this.state.countriesServed || ''}</dt>
                         <dt>Languages(with fluency level): {this.state.languages || ''}</dt>
                         <dt>Course Training Languages: 
                             {this.state.selectLang && this.state.selectLang.map(sL => 
                                <div>
                                    <li>{sL.label || ''}</li>
                                </div>
                                )}
                         </dt>
                         <dt>Location covered: 
                             {this.state.selectValue && this.state.selectValue.map(sV => 
                                <div>
                                    <li>{sV.label || ''}</li>
                                </div>
                                )}
                             </dt>
                         <h4>Bank Information</h4>
                         <dt>Account Title: {this.state.accountTitle || ''}</dt>
                         <dt>Account ID: {this.state.accountID || ''}</dt>
                         <dt>Bank Name: {this.state.bankName || ''}</dt>
                         <dt>Branch Name: {this.state.branchName || ''}</dt>
                         <dt>IBAN: {this.state.IBAN || ''}</dt>
                         <dt>SWIFT: {this.state.SWIFT || ''}</dt>
                         <dt>VAT ID: {this.state.VAT_ID || ''}</dt>
                    </dl>
                    </div></div></div>
            )
    }}

export default LogPro1