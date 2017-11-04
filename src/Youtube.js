import React, { Component } from 'react';

import './Youtube.css';

class Youtube extends Component {
	constructor() {
		super();
		this.state = {
			music: 'dub'
		};
	}

	changeMusic = e => {
		this.setState({ music: e.target.value });
	};

	render() {
		return (
			<div className="youtube">
				<select name="dropdown" onChange={e => this.changeMusic(e)}>
					<option value="dub">DUB</option>
					<option value="shinedown">Shinedown</option>
				</select>
				{this.state.music === 'dub' ? (
					<iframe
						title="youtube"
						width="300"
						height="151"
						src="http://www.youtube.com/embed/?loop=1&listType=playlist&list=PLrKMH4J9erlXm8IxCEa6IOXqh4rxcwpGU"
						frameBorder="0"
					/>
				) : (
					<iframe
						title="youtube"
						width="300"
						height="151"
						src="http://www.youtube.com/embed/?loop=1&listType=playlist&list=PLrKMH4J9erlXMEm4o4Fy4KUI0Nrfu9MQq"
						frameBorder="0"
					/>
				)}
			</div>
		);
	}
}

export default Youtube;
