import React, {Component} from "react";
import Select from "react-select";

let apples = [
      // {value: 1, label: 'English'},
      // {value: 2, label: 'Urdu'},
      // {value: 3, label: 'Persian'}
    "Afrikaans",	"Albanian",	"Arabic",	"Armenian",	"Basque",	'Bengali',	'Bulgarian','Catalan',	'Cambodian',	'Chinese (Mandarin)',	'Croatian',	
'Czech','Danish',	'Dutch',	'English',	'Estonian',	'Fiji',	'Finnish','French',	'Georgian',	'German',	'Greek',	'Gujarati',	'Hebrew',	'Hindi',	
'Hungarian',	'Icelandic',	'Indonesian',	'Irish','Italian',	'Japanese',	'Javanese',	'Korean',	'Latin',	'Latvian',	'Lithuanian',	'Macedonian',	
'Malay',	'Malayalam',	'Maltese',	'Maori',	'Marathi',	'Mongolian',	'Nepali','Norwegian','Persian','Polish',	'Portuguese',	'Punjabi',	
'Quechua',	'Romanian',	'Russian',	'Samoan',	'Serbian',	'Slovak',	'Slovenian','Spanish','Swahili','Swedish', 	'Tamil',	'Tatar',	'Telugu',	'Thai',	
"Tibetan","Tonga",	"Turkish",	"Ukrainian",	"Urdu",	"Uzbek",	"Vietnamese",	"Welsh","Xhosa"
];

class Languages extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectValue: []
    }
  }

  MakeOption = (x) => {
    return { value: x, label: x };
  }
  
  ChangeHandler = (e) => {
    this.setState({
      [e.target.id] : [e.target.value]
    })
  }

  render(){
    let options = [
    ];
    options = options.concat(apples.map(x => "Language - " + x));
    return(
      <div>
        <Select
        isMulti
        name="colors"
        options={options.map(x => this.MakeOption(x))}
        className="basic-multi-select"
        classNamePrefix="select"
    //     onChange={
    //       event => {
    //         let opts = [], opt;
    //         for (let i = 0, len = event.target.options.length; i < len; i++) {
    //           opt = event.target.options[i];
    //           if (opt.selected) {
    //             opts.push(opt.value);
    //           }
    //         }
    //         console.log('opts: ', opts);
    //         this.setState({selectValue: opts});
    //   }
    // }
  />
      </div>
    )
  }
}

export default Languages

// export default () => (
//   <Select
//     isMulti
//     name="colors"
//     options={options.map(x => MakeOption(x))}
//     className="basic-multi-select"
//     classNamePrefix="select"
//     onChange={
//       event => {
//         let opts = [], opt;
//         for (let i = 0, len = event.target.options.length; i < len; i++) {
//           opt = event.target.options[i];
//           if (opt.selected) {
//             opts.push(opt.value);
//           }
//         }
//         console.log('opts: ', opts);
//         this.setState({selectValue: opts});
//       }
//     }
//   />
// );