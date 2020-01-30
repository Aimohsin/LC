import React, { Component } from "react";

class Vehicles extends Component {	 
	render() {
		return (
			<div> Vehicles Child Component
                <div className="input-field">
            <label htmlFor="degreeTitle">Degree Title</label>
            <input type="text" id='degreeTitle' />
          </div>
          <div className="input-field">
            <label htmlFor="degreeUni">Degree University</label>
            <input type="text" id='degreeUni' />
          </div>
          <div className="input-field">
            <label htmlFor="yearAwarded">Year Awarded</label>
            <input type="text" id='yearAwarded'/>
          </div>
          <div className="input-field">
            <label htmlFor="dcountry">Country</label>
            <input type="text" id='dcountry' />
          </div>
                 </div>
		);
	}
}

export default Vehicles;