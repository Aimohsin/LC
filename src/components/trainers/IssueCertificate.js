import React, {Component} from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Certificate from '../../img/Certificate.png'

class issueCertificate extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedRows: []
        }
    }
    printDocument() {
        const input = document.getElementById('FormtoPrint');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            // const pdf = new jsPDF('p', 'mm', 'landscape');
            const pdf = new jsPDF('landscape');
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save("CourseManual.pdf");
          })
        ;
      }

    render(){
        return(
            <div>
                <br />
                 <div className="container section project-details" style={{textAlign:'center'}}>
        <div id="FormtoPrint">
       <img src={Certificate} width='900px' />
        </div>
        <div className="input-field">
              <button className="mdl-button mdl-js-button" style={{backgroundColor:'RGB(0,153,153)',color:'#fff',margin:10}}
          onClick={this.printDocument}>
          Download 
          </button>
          </div>
      </div>
            </div>
        )
    }
}

export default issueCertificate

 {/* <div className="card z-depth-0">
            <h2>Certificate</h2>
          <div className="card-content">
            Course Name: <b>Abc </b> <br/>
            Course Expiration Date: <b>Abc </b> <p>{}</p> <br/>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
          <div>This course manual is registered to <b>User 1</b> to use till <b>Expiry Date</b></div>
          </div><br />
        </div> */}