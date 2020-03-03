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
// "", "", "", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory",
// "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic",
// "Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo, The Democratic Republic of The",
// "Cook Islands","Costa Rica","Cote D'ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
// "Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji",
// "Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar",
// "Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-bissau","Guyana","Haiti","Heard Island and Mcdonald Islands",
// "Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic of","Iraq","Ireland",
// "Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic of","Korea, Republic of",
// "Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein",
// "Lithuania","Luxembourg","Macao","Macedonia, The Former Yugoslav Republic of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands",
// "Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States of","Moldova, Republic of","Monaco","Mongolia","Montenegro",
// "Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand",
// "Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied",
// "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation",
// "Rwanda","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and The Grenadines","Samoa","San Marino",
// "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
// "Somalia","South Africa","South Georgia and The South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard and Jan Mayen",
// "Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province of China","Tajikistan","Tanzania, United Republic of","Thailand",
// "Timor-leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands","Tuvalu",
// "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan",
// "Vanuatu","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, U.S.","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"


class LC extends Component{
    constructor(props){
        super(props);
        this.state={
            selectValue: []
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(selectValue) {
        console.log('You have selected: ', selectValue);
        this.setState({ selectValue });
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
                        value={this.state.selectValue} joinValues
                        onChange={this.handleSelectChange}
                        onBlurResetsInput={false}
                        onSelectResetsInput={false}
                        onCloseResetsInput={false}
                        />
            </div>
        )
    }
}

export default LC