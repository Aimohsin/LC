import React, {Component} from 'react'
import firebase from '../../config/fbConfig'

class EditOffering extends Component{
    constructor(props){
        super(props);
        this.state = {
            Offerings:'', offeringName:'', location:'', numOfParticipants:'', generateCode:'', daysOfTraining:'', OfferingCode:'',
            OfferingStartDate:'', OfferingEndDate:''
        }
    }

    ChangeHandler = (e) => {
        this.setState({
          [e.target.id] : [e.target.value]
        })
      } 

    getData(){
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        return firebase.database().ref('Users/TrainerOffering/').on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var authorID = childData.authorId;
                var name = childData.selectedTrainer.label;
                var location = childData.location;
                var numOfParts = childData.numOfParticipants;
                var daysOfTraining = childData.daysOfTraining;
                var generatedCode = childData.generateCode;
                var startDate = childData.startDate;
                var endDate = childData.endDate;
                if(uid === authorID){
                    this.setState({
                       offeringName: name,
                       offeringlocation: location,
                       offeringnoOfParticipants: numOfParts,
                       OfferingDays: daysOfTraining,
                       OfferingCode: generatedCode,
                       OfferingStartDate: startDate,
                       OfferingEndDate: endDate
                    })
                }
            })
        })
    }

    componentDidMount(){
        this.getData();
    }

    EditOfferings = (e) => {
        e.preventDefault();
        var uid = firebase.auth().currentUser.uid;
        console.log(uid);
        firebase.database().ref('Users/TrainerOffering').on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var childKey = childSnapshot.key;
                var authorID = childData.authorId;
                console.log(childKey);
                if(uid === authorID){
                        firebase.database().ref('Users/TrainerOffering' + childKey).set({
                        offeringName: this.state.offeringName,
                        location: this.state.location,
                        numOfParticipants: this.state.numOfParticipants,
                        OfferingCode: this.state.OfferingCode,
                        OfferingDays: this.state.OfferingDays
                    })
                    this.props.history.push('/offerings')
                }
            })
        })
    }
    render(){
        const {startDate} = this.state;
        return(
            <div>
                <form onSubmit={this.EditOfferings}>
                <h4>Edit Offerings Details</h4>
               <div className="input-field">
                <label htmlFor="offeringName">Offering Name</label>
                <input type="text" id='offeringName' value={this.state.offeringName || ''} />
            </div>
            <div className="input-field">
                <label htmlFor="offeringlocation">Location</label>
                <input type="text" id='offeringlocation' value={this.state.offeringlocation || ''} onChange={this.ChangeHandler} />
            </div>
            <div className="input-field">
                <label htmlFor="offeringnoOfParticipants">No of Participants</label>
                <input type="text" id='offeringnoOfParticipants' value={this.state.offeringnoOfParticipants || ''} onChange={this.ChangeHandler} />
            </div>
            <div className="input-field">
                <label htmlFor="OfferingDays">Days Of Training</label>
                <input type="text" id='OfferingDays' value={this.state.OfferingDays || ''} onChange={this.ChangeHandler} />
            </div>
            <div className="input-field">
          <label htmlFor="startDate">Start Date</label><br/><br/>
          <input type="date" value={this.state.OfferingStartDate || ''} onChange={e => this.setState({ startDate: e.target.value })} /><br/>
              {/* {startDate && (
                <React.Fragment>
                  <h6 htmlFor="startDate">End Date:</h6>
                  <input
                    type="date"
                    value={this.state.OfferingEndDate || ''}
                    onChange={e => this.setState({ endDate: e.target.value })}
                  />
                </React.Fragment>
              )}           */}
          </div>
          <div className="input-field">
              <label htmlFor="endDate">End Date</label><br /><br />
              <input type="date" value={this.state.OfferingEndDate || ''} onChange={e => this.setState({ endDate: e.target.value})} />
          </div>
            <div className="input-field">
                <label htmlFor="OfferingCode">Offering Code</label>
                <input type="text" id='OfferingCode' value={this.state.OfferingCode || ''} />
            </div>
            <div>
            <button>Save Changes</button>
          </div>
          </form>
            </div>
        )
    }
}

export default EditOffering