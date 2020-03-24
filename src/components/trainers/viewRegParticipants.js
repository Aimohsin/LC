import React, {Component} from 'react'
import firebase from '../../config/fbConfig'
import ReactTable from "@kizu/react-table-v6";
import "@kizu/react-table-v6/react-table.css";
import testData from './testData';
import Chance from "chance";
// import checkboxHOC from "react-table/lib/hoc/selectTable";
const chance = new Chance();

// const CheckboxTable = checkboxHOC(ReactTable);

function getData() {
    const data = testData.map(item => {
      const _id = chance.guid();
      return {
        _id,
        ...item
      };
    });
    return data;
  }

  function getColumns(data) {
    const columns = [];
    const sample = data[0];
    Object.keys(sample).forEach(key => {
      if (key !== "_id") {
        columns.push({
          accessor: key,
          Header: key
        });
      }
    });
    return columns;
  }

class viewRegParticipants extends Component{
    constructor(props){
        super(props);
        const data = getData();
        const columns = getColumns(data);
        this.state = {
            _data:[], code:'',name: '',loc:'', dOTrain:'', selected: null, selectedRowIndex: null, TrainID:'', data,
            columns,
        }
    } 
    toggleSelection = (key, shift, row) => {
        let selection = [...this.state.selection];
        const keyIndex = selection.indexOf(key);
        if (keyIndex >= 0) {
          selection = [
            ...selection.slice(0, keyIndex),
            ...selection.slice(keyIndex + 1)
          ];
        } else {
          selection.push(key);
        }
        this.setState({ selection });
      };
    
      toggleAll = () => {
        const selectAll = this.state.selectAll ? false : true;
        const selection = [];
        if (selectAll) {
          const wrappedInstance = this.checkboxTable.getWrappedInstance();
          const currentRecords = wrappedInstance.getResolvedState().sortedData;
          currentRecords.forEach(item => {
            selection.push(item._original._id);
          });
        }
        this.setState({ selectAll, selection });
      };
    
      isSelected = key => {
        return this.state.selection.includes(key);
      };
    
      logSelection = () => {
        console.log("selection:", this.state.selected);
        alert('Issue Certificate to: ', this.state.selected)
      };

    getRegisteredParticipants(){
        firebase.database().ref('Users/ParticapantsApproveOffering/').on('value', (snapshot) => {
            const data = [];
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var courseName = childData.childData.selectedTrainer.label;
                var location = childData.childData.location;
                var daysOfTraining = childData.childData.daysOfTraining;
                var code = childData.childData.generateCode;
                var TrainerID = childData.childData.authorId;
                var UserID;
                firebase.database().ref('Users/Trainers/').on('value', (snapshotTrainer) => {
                    snapshotTrainer.forEach((childSnapshotTrainer) => {
                        var childData = childSnapshotTrainer.val();
                        var childKey = childSnapshotTrainer.key;
                        var FN = childData.firstName;
                        var LN = childData.lastName;
                        var TfullName = FN + ' ' + LN;
                        if(TrainerID === childKey){
                            const TData = {
                                trainerName: TfullName,
                                courseName: courseName,
                                daysOfTraining: daysOfTraining,
                                code: code,
                                location: location
                            }
                            data.push(TData)
                        }
                    })
                    this.setState({
                        data
                    })
                })
            })
        })
    }

    getCourseDescription(){
        firebase.database().ref('Users/ParticapantsApproveOffering/').on('value', (snapshot) => {
            const code=[], name=[], loc=[], dOTrain=[], TrainID=[];
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                var CourseCode = childData.inputCode;
                var CourseName = childData.childData.selectedTrainer.label;
                var location = childData.childData.location;
                var daysOfTraining = childData.childData.daysOfTraining;
                var TrainerID = childData.childData.authorId;
                firebase.database().ref('Users/Trainers/').on('value', (Tsnapshot) => {
                    Tsnapshot.forEach((TchildSnapshot) => {
                        var TchildData = TchildSnapshot.val();
                        var TchildKey = TchildSnapshot.key;
                        var FN = TchildData.firstName;
                        var LN = TchildData.lastName;
                        var TfullName = FN + ' ' + LN;
                        if(TrainerID === TchildKey){
                            //console.log(TfullName);
                            code.push(CourseCode);
                            name.push(CourseName);
                            loc.push(location);
                            dOTrain.push(daysOfTraining);
                            TrainID.push(TfullName);
                        }
                    })
                    this.setState({
                        code, 
                        name,
                        loc,
                        dOTrain,
                        TrainID
                    })
                })
               
            })
        })
    }

    componentDidMount(){
        this.getCourseDescription();
        // this.getData();
        // this.getColumns();
       // this.getRegisteredParticipants();
    }
    render(){
        // const { data } = this.state;
        const { toggleSelection, toggleAll, isSelected, logSelection } = this;
        const { data, columns, selectAll } = this.state;
        const checkboxProps = {
            selectAll,
            isSelected,
            toggleSelection,
            toggleAll,
            selectType: "checkbox",
            getTrProps: (state, rowInfo) => {
                var arr1 = '';
                if (rowInfo && rowInfo.row) {
                  return {
                    onClick: (e) => {
                        e.preventDefault();
                      arr1 = rowInfo.original;
                      this.setState({
                        selectedRowIndex: rowInfo.index,
                        selected: rowInfo.original
                      },
                      console.log(arr1),
                      console.log(rowInfo.index)
                      )
                    },
                    style: {
                      background: rowInfo.index === this.state.selectedRowIndex ? 'gray' : 'white',
                      color: rowInfo.index === this.state.selectedRowIndex ? 'white' : 'black'
                    }}}
                else{
                  return {}
                }}

                //******************** */
            // getTrProps: (s, r) => {
            //   const selected = this.isSelected(r.original._id);
            //   return {
            //     style: {
            //       backgroundColor: selected ? "lightgreen" : "inherit"
            //       // color: selected ? 'white' : 'inherit',
            //     }
            //   };
            // }
            //******************** */
            
          };
        // const columns = [
        //     { Header: "SL No", maxWidth: 100,filterable: false, Cell: props => {
        //         return <div>{props.index + 1}</div>;
        //       }}, 
        //     {
        //         Header: 'Participant Name',
        //         accessor: 'participantName',
        //     },
        //     {
        //         Header: 'Email',
        //         accessor: 'email',
        //     },
        //     {
        //         Header: 'Role',
        //         accessor: 'role',
        //     }, 
        //     {
        //         Header: 'Checkbox',
        //         Cell: row => (<input type="checkbox" />)
        //         // Cell: row => (<input type="checkbox" />)
        //     }
        // ];
        return(
            <div>
                <br />
                <h5>Registered Participants for Code : <b>{this.state.code}</b></h5>
                <h6>Days of Training: {this.state.dOTrain}</h6>
                <h6>Course Name: {this.state.name}</h6>
                <h6>Location: {this.state.loc}</h6>
                <h6>Trainer Name: {this.state.TrainID}</h6>
                <br />
                <div>
                <button onClick={logSelection}>Issue Certificate</button>
                        <br />
                        </div>
                <div>
                    {/* <CheckboxTable
                    ref={r => (this.checkboxTable = r)}
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    {...checkboxProps}
                    /> */}
                </div>
                 <div>
                    <ReactTable
                        ref={r => {this.checkboxTable = r}}
                        data={data}
                        columns={columns}
                        {...checkboxProps}
                        style={{ textAlign: "center" }}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTrProps = {(state, rowInfo) => {
                            var arr1 = '';
                            if (rowInfo && rowInfo.row) {
                              return {
                                onClick: (e) => {
                                    e.preventDefault();
                                  arr1 = rowInfo.original;
                                  this.setState({
                                    selectedRowIndex: rowInfo.index,
                                    selected: rowInfo.original
                                  },
                                  console.log(arr1)
                                  )
                                },
                                style: {
                                  background: rowInfo.index === this.state.selectedRowIndex ? 'gray' : 'white',
                                  color: rowInfo.index === this.state.selectedRowIndex ? 'white' : 'black'
                                }}}
                            else{
                              return {}
                            }}}
                        />
                        <br />
                    </div>
            </div>
        )
    }
}

export default viewRegParticipants

// import Chance from "chance";
// import checkboxHOC from "react-table/lib/hoc/selectTable";
// const CheckboxTable = checkboxHOC(ReactTable);