import React, {Component} from 'react'
import firebase from '../../config/fbConfig'
import ExampleComponent from 'react-rounded-image'

class LogPro1 extends Component{

    constructor(props){
        super(props);
            this.state = { email:'', firstName:'', lastName:'', datecreated:'', role:'', gender:'', address:'', city:'', country:'',
            zipcode:'', cell1:'', cell2:'', email1:'', email2:'', linkedInProfile:'', website:'', currentEmployer:'', 
            degreeTitle:'', degreeUni:'', yearAwarded:'', dcountry:'', 
            avatar: "", isUploading: false, progress: 0, avatarURL: "", 
            designation:'', employer:'', jfrom:'', jto:'', jcountry:'' , 
            briefSummary:'', totalExperience:'', teachingExperience:'', countriesServed:'', languages:''  
            , accountTitle:'', accountID:'', bankName:'', branchName:'', IBAN:'', SWIFT:'', VAT_ID:'' , appliedFor:'',approvedCourses:'', 
            OtherCourses:'', HistNoCourses:'', HistNoParticipants:'', rating:'', feedback:'', courseTitle:'',
            startDate:'', endDate:'', location:'', timings:'', 
            certificateName: '', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:''
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
            accountTitle: snapshot.val().accountTitle,
            accountID: snapshot.val().accountID,
            bankName: snapshot.val().bankName,
            branchName: snapshot.val().branchName,
            IBAN: snapshot.val().IBAN,
            SWIFT: snapshot.val().SWIFT,
            VAT_ID: snapshot.val().VAT_ID,
            certificateName: snapshot.val().certificateName,
            certIssuedBy: snapshot.val().certIssuedBy,
            certDateIssue: snapshot.val().certDateIssue,
            certExpiry: snapshot.val().certExpiry,
            certID: snapshot.val().certID
        })
      })
    }

componentDidMount(){
    this.getdata();
}

    render(){
            return(
                <div>
                <div className="container section project-details">
                    <div className="card z-depth-0">
                    <div className="card-content">
                    <h2>Profile Details</h2>
                    <dl>
                        <ExampleComponent
                            image={this.state.avatarURL}
                            roundedColor="#321124"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="13"
                        />
                        <h4>Personal Information</h4>
                        <dt>Email: {this.state.email}</dt>
                        <dt>First Name: {this.state.firstName}</dt>
                        <dt>Last Name: {this.state.lastName}</dt>
                        <dt>Gender: {this.state.gender}</dt> 
                        <dt>Role: {this.state.role}</dt>
                        <dt>Address: {this.state.address}</dt>
                        <dt>City: {this.state.city}</dt>
                        <dt>Country: {this.state.country}</dt>
                        <dt>Zip Code: {this.state.zipcode}</dt>
                        <dt>Cell # 1: {this.state.cell1}</dt>
                         <dt>Cell # 2: {this.state.cell2}</dt>
                         <dt>Email # 1: {this.state.email1}</dt>
                         <dt>Email # 2: {this.state.email2}</dt>
                         <dt>LinkedIn Profile: {this.state.linkedInProfile}</dt>
                         <dt>Website: {this.state.website}</dt>
                         <dt>Current Employer: {this.state.currentEmployer}</dt>
                         <h4>Academic Information</h4>
                         <dt>Degree Title: {this.state.degreeTitle}</dt>
                         <dt>University: {this.state.degreeUni}</dt>
                         <dt>Year Awarded: {this.state.yearAwarded}</dt>
                         <dt>Country: {this.state.dcountry}</dt>
                         <h4>Job History</h4>
                         <dt>Designation: {this.state.designation}</dt>
                         <dt>Employer: {this.state.employer}</dt>
                         <dt>From: {this.state.jfrom}</dt>
                         <dt>To: {this.state.jto}</dt>
                         <dt>Country: {this.state.jcountry}</dt>
                         <h4>Brief Summary (2000 characters including spaces)</h4>
                         <dt> {this.state.briefSummary}</dt>
                         <h4>Resume/Profile</h4>
                         <h4>Certificate</h4>
                        <dt>Certificate Name: {this.state.certificateName}</dt>
                        <dt>Certificate Issued By: {this.state.certIssuedBy}</dt>
                        <dt>Certificate Date Issue: {this.state.certDateIssue}</dt>
                        <dt>Certificate Expiry: {this.state.certExpiry}</dt>
                        <dt>Certificate ID: {this.state.certID}</dt>
                         <h4>General Information</h4>
                         <dt>Total Experience: {this.state.totalExperience}</dt>
                         <dt>Teaching Experience: {this.state.teachingExperience}</dt>
                         <dt>Countries Served: {this.state.countriesServed}</dt>
                         <dt>Languages(with fluency level): {this.state.languages}</dt>
                         <h4>Bank Information</h4>
                         <dt>Account Title: {this.state.accountTitle}</dt>
                         <dt>Account ID: {this.state.accountID}</dt>
                         <dt>Bank Name: {this.state.bankName}</dt>
                         <dt>Branch Name: {this.state.branchName}</dt>
                         <dt>IBAN: {this.state.IBAN}</dt>
                         <dt>SWIFT: {this.state.SWIFT}</dt>
                         <dt>VAT ID: {this.state.VAT_ID}</dt>
                    </dl>
                    </div></div></div>
                </div>
            )
    }}

export default LogPro1


                         {/* <h4>Applied for training courses with LearningCert </h4>
                        <dt>{this.state.appliedFor}</dt>
                         <h4>Approved for following training courses with LearningCert </h4>
                         <dt>{this.state.approvedCourses}</dt>
                         <h4>Courses that I also teach (other than LearningCert) </h4>
                         <dt>{this.state.OtherCourses}</dt>
                         <h4>History with LearningCert </h4>
                         <dt>Number of courses: {this.state.HistNoCourses}</dt>
                         <dt>Number of Participants: {this.state.HistNoParticipants}</dt>
                         <h4>Aggregation Rating: (out of 5.0) </h4>
                         <dt>{this.state.rating}</dt>
                         <h4>Selected feedback (statements for audience): </h4>
                         <dt>{this.state.feedback}</dt>
                         <h4>Training Events: </h4>
                         <dt>Course Title {this.state.courseTitle}</dt>
                         <dt>Start Date: {this.state.startDate}</dt>
                         <dt>End Date: {this.state.endDate}</dt>
                         <dt>Location (or online) {this.state.location}</dt>
                         <dt>Timings: {this.state.timings}</dt> */}

                         
            // appliedFor: snapshot.val().appliedFor,
            // approvedCourses: snapshot.val().approvedCourses,
            // OtherCourses: snapshot.val().OtherCourses,
            // HistNoCourses: snapshot.val().HistNoCourses,
            // HistNoParticipants: snapshot.val().HistNoParticipants,
            // rating: snapshot.val().rating,
            // feedback: snapshot.val().feedback,
            // courseTitle: snapshot.val().courseTitle,
            // startDate: snapshot.val().startDate,
            // endDate: snapshot.val().endDate,
            // location: snapshot.val().location,
            // timings: snapshot.val().timings