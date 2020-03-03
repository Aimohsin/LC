import React from "react";
import firebase from '../../../config/fbConfig'
import BookList from "./CertCreate";

class BookView extends React.Component {
  state = {
    Certvalues: [
      { certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:'' }    
    ]
  };
  handleChange = e => {
    if (
      ["certificateName", "certIssuedBy", "certDateIssue", "certExpiry", "certID"].includes(
        e.target.name
      )
    ) {
      let Certvalues = [...this.state.Certvalues];
      Certvalues[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = e => {
    this.setState(prevState => ({
      Certvalues: [
        ...prevState.Certvalues,
        { certificateName:'', certIssuedBy:'', certDateIssue:'', certExpiry:'', certID:'' }    ]
    }));
  };

  deteteRow = index => {
    this.setState({
      Certvalues: this.state.Certvalues.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      Certvalues: this.state.Certvalues.filter(r => r !== record)
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var uid = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/Trainers/' + uid).set({
      Certvalues: this.state.Certvalues
    })
  }

  // getData (){
  //     var uid = firebase.auth().currentUser.uid;
  //     return firebase.database().ref('Users/Trainers/' + uid).on('value', (snapshot) => {
  //       if(this.state.Certvalues === null){
  //         this.setState({
  //         })
  //       }
  //       else{
  //         this.setState({
  //           Certvalues: snapshot.val().Certvalues
  //         })
  //       }
  //     })
  // }

  // componentDidMount(){
  //     this.getData();
  // }

  render() {
    let { Certvalues } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-10">
              <h5 className="text-center">Certificates Info</h5>
              <div className="container">
                <div className="row">
                  <BookList
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    Certvalues={Certvalues}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-1" />
          </div>
        </form>
      </div>
    );
  }
}
export default BookView;
