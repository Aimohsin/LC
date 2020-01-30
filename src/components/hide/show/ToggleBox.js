import React, { Component } from "react";

class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened){
			title =<i class="fa fa-minus" aria-hidden="true"></i>;
		}else{
			title =<i class="fa fa-plus" aria-hidden="true"></i>;
		}

		return (
			<div className="box">
				<div className="boxTitle" onClick={this.toggleBox}>
					{title}
				</div>
				{opened && (					
					<div class="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;