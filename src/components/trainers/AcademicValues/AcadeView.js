import React from "react";
import firebase from '../../../config/fbConfig'
import BookList from "./AcadeCreate";

class BookView extends React.Component {
  state = {
    Acadevalues: [
      { degreeTitle: '', degreeUni:'', yearAwarded:'', dcountry:'' }
    ]
  };

  handleChange = e => {
    if (
      ["degreeTitle", "degreeUni", "yearAwarded", "dcountry"].includes(
        e.target.name
      )
    ) {
      let Acadevalues = [...this.state.Acadevalues];
      Acadevalues[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  addNewRow = e => {
    this.setState(prevState => ({
        Acadevalues: [
        ...prevState.Acadevalues,
        {degreeTitle: '', degreeUni:'', yearAwarded:'', dcountry:''}
      ]
    }));
  };

  deteteRow = index => {
    this.setState({
        Acadevalues: this.state.Acadevalues.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
        Acadevalues: this.state.Acadevalues.filter(r => r !== record)
    });
  }

  getData (){
      var uid = firebase.auth().currentUser.uid;
      return firebase.database().ref('Users/Trainers/' + uid).on('value', (snapshot) => {
          this.setState({
              Acadevalues: snapshot.val().Acadevalues
          })
      })
  }

  componentDidMount(){
      this.getData();
  }

  render() {
    let { Acadevalues } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-10">
              <h5 className="text-center">Academic Info</h5>
              <div className="container">
                <div className="row">
                  <BookList
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    Acadevalues={Acadevalues}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default BookView;
