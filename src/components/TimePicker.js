import React, {Component} from 'react'
import 'rc-time-picker/assets/index.css';
import ReactDom from 'react-dom';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

const format = 'h:mm a';
const now = moment().hour(0).minute(0);

class TPicker extends Component{

    onChange(value) {
        console.log(value && value.format(format));
      }

    render(){
        return(
            <div>
                <TimePicker
                    showSecond={false}
                    defaultValue={now}
                    className="xxx"
                    onChange={this.onChange}
                    format={format}
                    use12Hours
                    inputReadOnly
                />
            </div>
        )
    }
}

export default TPicker