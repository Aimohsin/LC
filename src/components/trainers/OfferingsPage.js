import React, {Component} from 'react'
import firebase from '../../config/fbConfig'
import Header from '../../Header'
import Sidebar from '../../Sidebar'
import Footer from '../../Footer'

class OfferingsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            Offerings:[], offeringName:[], location:[], noOfParticipants:[], OfferingCode:[], OfferingStartDate:[], OfferingEndDate:[],
            noOfRegisteredParticipants: []
        }
    }

    getOffering(){
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        return firebase.database().ref('Users/TrainerOffering/').on('value', (snapshot) => {
            var OffName = [], Offlocation = [], OffnumOfPart = [], OffoffCode = [], OffSDate=[], OffEDate=[], OffnumOfRegPart = []
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var Offname = childData.selectedTrainer.label;
                var numOfPart = childData.numOfParticipants;
                var location = childData.location;
                var daysOfTraining = childData.daysOfTraining;
                var generateCode = childData.generateCode;
                var authorID = childData.authorId;
                var Sdate = childData.sDate;
                var Edate = childData.eDate;
                var numOfRegPart;
                if(uid === authorID){
                    OffName.push(Offname);
                    Offlocation.push(location);
                    OffnumOfPart.push(numOfPart);
                    OffoffCode.push(generateCode);
                    OffSDate.push(Sdate);
                    OffEDate.push(Edate);
                    OffnumOfRegPart.push(numOfRegPart);
                }
            })
            this.setState({
                // Offerings = OffName + '\n', 
                offeringName : OffName + '\n', 
                location : Offlocation + '\n', 
                noOfParticipants : OffnumOfPart + '\n', 
                OfferingCode : OffoffCode + '\n',
                OfferingStartDate: OffSDate + '\n',
                OfferingEndDate: OffEDate + '\n',
                noOfRegisteredParticipants: OffnumOfRegPart + '\n'
            })
        })
    }

    componentDidMount(){
        this.getOffering();
    }
    render(){
        return(
            <div>
                 <Header />
                    <Sidebar />
                <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
                {/* <div className="container section project-details"> */}
                    {/* <div className="card z-depth-0"> */}
                <h4>About Offering</h4>
                <a href='/editOffering'>Edit Current Offering</a>
                <div><br />
                <h5>Offering Name</h5>
                <p>{this.state.offeringName}</p>
                <h5>Location</h5>
                <p>{this.state.location}</p>
                <h5>Start Date and Time</h5>
                <p>{this.state.OfferingStartDate}</p>
                <h5>End Date and Time</h5>
                <p>{this.state.OfferingEndDate}</p>
                <h5>No of Participants</h5>
                <p>{this.state.noOfParticipants}</p>
                <h5>No of registered Participants</h5>
                <p>{this.state.noOfRegisteredParticipants}<a href='/vrp'>View</a></p>
                <h5>Offering Code</h5>
                <p>{this.state.OfferingCode}</p>
                <h5>Files related to course</h5>
                <a href='#'>View Files</a>
                </div>
            </div>
            <Footer />
            </div></div></div>
        )
    }
}

export default OfferingsPage