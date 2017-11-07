import React, { Component } from 'react';
import Indeed from './Indeed';
import Craigs from './Craigs';
import Authjobs from './Authjobs';
import Githubjobs from './Githubjobs';
import SO from './SO';

class Components extends Component {
	update = () => {
		this.setState(this.state);
	};

	render() {
		return (
			<div>
				<button onClick={this.update} style={{ margin: '0 0 5px 0' }}>
					Refresh Jobs
				</button>
				<div className="components">
					<Indeed />
					<SO />
					<Authjobs />
					<Githubjobs />
					<Craigs />
				</div>
			</div>
		);
	}
}

export default Components;
