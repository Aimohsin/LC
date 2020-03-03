import React, {Component} from 'react'
import firebase from '../../config/fbConfig'

class OfferingsPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            Offerings:[], offeringName:[], location:[], noOfParticipants:[], OfferingCode:[], OfferingStartDate:[], OfferingEndDate:[]
        }
    }

    getOffering(){
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        return firebase.database().ref('Users/TrainerOffering/').on('value', (snapshot) => {
            var OffName = [], Offlocation = [], OffnumOfPart = [], OffoffCode = [], OffSDate=[], OffEDate=[]
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var Offname = childData.selectedTrainer.label;
                var numOfPart = childData.numOfParticipants;
                var location = childData.location;
                var daysOfTraining = childData.daysOfTraining;
                var generateCode = childData.generateCode;
                var authorID = childData.authorId;
                var Sdate = childData.startDate;
                var Edate = childData.endDate;
                if(uid === authorID){
                    console.log(childData);
                    console.log(Offname);
                    console.log(numOfPart);
                    console.log(location);
                    console.log(daysOfTraining);
                    console.log(generateCode);
                    OffName.push(Offname);
                    Offlocation.push(location);
                    OffnumOfPart.push(numOfPart);
                    OffoffCode.push(generateCode);
                    OffSDate.push(Sdate);
                    OffEDate.push(Edate);
                }
            })
            this.setState({
                // Offerings = OffName + '\n', 
                offeringName : OffName + '\n', 
                location : Offlocation + '\n', 
                noOfParticipants : OffnumOfPart + '\n', 
                OfferingCode : OffoffCode + '\n',
                OfferingStartDate: OffSDate + '\n',
                OfferingEndDate: OffEDate + '\n'
            })
        })
    }

    componentDidMount(){
        this.getOffering();
    }
    render(){
        return(
            <div>
                <h4>About Offering</h4>
                <a href='/editOffering'>Edit Current Offering</a>
                <div>
                <h5>Offering Name</h5>
                <p>{this.state.offeringName}</p>
                <h5>Location</h5>
                <p>{this.state.location}</p>
                <h5>Start Date</h5>
                <p>{this.state.OfferingStartDate}</p>
                <h5>End Date</h5>
                <p>{this.state.OfferingEndDate}</p>
                <h5>No of Participants</h5>
                <p>{this.state.noOfParticipants}</p>
                <h5>Offering Code</h5>
                <p>{this.state.OfferingCode}</p>
                <h5>Files related to course</h5>
                <a href='#'>View Files</a>
                </div>
            </div>
        )
    }
}

export default OfferingsPage