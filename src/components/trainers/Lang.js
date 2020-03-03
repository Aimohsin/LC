import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select'

const LCoptions = [
    { label:'Afghanistan', value:'Afghanistan' },
    { label:'Åland Islands', value:'Åland Islands' },
    { label:'Albania', value:'Albania' },
    { label:'Algeria', value:'Algeria' },
    { label:'American Samoa', value:'American Samoa' },
    { label:'Andorra', value:'Andorra' },
    { label:'Angola', value:'Angola' },
    { label:'Anguilla', value:'Anguilla' },
    { label:'Antarctica', value:'Antarctica' },
    { label:'Antigua and Barbuda', value:'Antigua and Barbuda' },
    { label:'Argentina', value:'Argentina' },
    { label:'Armenia', value:'Armenia' },
    { label:'Aruba', value:'Aruba' },
    { label:'Australia', value:'Australia' },
    { label:'Austria', value:'Austria' },
    { label:'Azerbaijan', value:'Azerbaijan' },
    { label:'Bahamas', value:'Bahamas' },
    { label:'Bahrain', value:'Bahrain' },
    { label:'Bangladesh', value:'Bangladesh' },
    { label:'Barbados', value:'Barbados' },
    { label:'Belarus', value:'Belarus' },
    { label:'Belgium', value:'Belgium' },
    { label:'Belize', value:'Belize' },
    { label:'Benin', value:'Benin' },
    { label:'Bermuda', value:'Bermuda' },
]

const Language = [
    { label:'Afghanistan', value:'Afghanistan' },
    { label:'Åland Islands', value:'Åland Islands' },
    { label:'Albania', value:'Albania' },
    { label:'Algeria', value:'Algeria' },
    { label:'American Samoa', value:'American Samoa' },
]

class Lang extends Component{
    constructor(props){
        super(props);
        this.state={
            selectLang: []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(selectLang) {
        console.log('You have selected: ', selectLang);
        this.setState({ selectLang });
      }

      static propTypes = {
        label: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.array,
          PropTypes.object,
        ])
      }

    render(){
        return(
            <div>
                <Select options={LCoptions} 
                        isMulti 
                        closeMenuOnSelect={ false }
                        value={this.state.selectLang} joinValues
                        onChange={this.handleSelectChange}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        onCloseResetsInput={false}
                        />
            </div>
        )
    }
}

export default Lang