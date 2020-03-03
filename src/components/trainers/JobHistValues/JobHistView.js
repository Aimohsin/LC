import React from "react";
import firebase from '../../../config/fbConfig'
import BookList from "./JobHistCreate";

class BookView extends React.Component {
  state = {
    JobHistvalues: [
      {designation: '', employer:'', jfrom:'', jto:'', jcountry: ''}
    ]
  };
  handleChange = e => {
    if (
      ["designation", "employer", "jfrom", "jto", "jcountry"].includes(
        e.target.name
      )
    ) {
      let JobHistvalues = [...this.state.JobHistvalues];
      JobHistvalues[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = e => {
    this.setState(prevState => ({
        JobHistvalues: [
        ...prevState.JobHistvalues,
        {designation: '', employer:'', jfrom:'', jto:'', jcountry: ''}
    ]
    }));
  };

  deteteRow = index => {
    this.setState({
        Acadevalues: this.state.JobHistvalues.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
        JobHistvalues: this.state.JobHistvalues.filter(r => r !== record)
    });
  }

  getData (){
      var uid = firebase.auth().currentUser.uid;
      return firebase.database().ref('Users/Trainers/' + uid).on('value', (snapshot) => {
          this.setState({
            JobHistvalues: snapshot.val().JobHistvalues
          })
      })
  }

  componentDidMount(){
      this.getData();
  }

  render() {
    let { JobHistvalues } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-10">
              <h5 className="text-center">Job History Info</h5>
              <div className="container">
                <div className="row">
                  <BookList
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    JobHistvalues={JobHistvalues}
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
