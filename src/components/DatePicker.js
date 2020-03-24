import React, {Component} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DPicker extends Component{
    constructor(props){
        super(props);
        this.state={
            Date: ''
        }
    }

    handleDateChange = date => {
        this.setState({
            Date: date
        }, console.log(date));
      };

    render(){
        return(
            <div>
            <DatePicker selected={this.state.Date} value={this.state.Date} onChange={this.handleDateChange} />
            </div>
        )
    }
}

export default DPicker