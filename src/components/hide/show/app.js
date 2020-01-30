import React, { Component } from "react";
import ToggleBox from "./ToggleBox";
import Vehicles from "./Vehicle";

class App extends Component {
	render(){
		return (
			<ToggleBox title="Show Vehicles" >
				<Vehicles />
			</ToggleBox>
		);
	}
}

export default App;