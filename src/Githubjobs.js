import React, { Component } from 'react';

import './Githubjobs.css';

class Githubjobs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	componentDidMount() {
		let url = 'https://jobs.github.com/positions.json?description=&location=chicago';
		fetch(url)
			.then(info => info.json())
			.then(list => this.setState({ list }));
	}

	render() {
		return (
			this.state.list && (
				<div className="Githubjobs">
					<h3>
						<a
							href="https://jobs.github.com/positions?description=&location=chicago"
							target="_blank"
							rel="noopener noreferrer"
						>
							Github Jobs
						</a>
					</h3>
					{this.state.list &&
						this.state.list.map((each, key) => (
							<div className="job" key={key}>
								<h4>{each.title}</h4>
								<h6>{each.type}</h6>
								<p>{each.created_at.slice(4, 9)}</p>
								<a href={each.company_url}>{each.company}</a>
							</div>
						))}
				</div>
			)
		);
	}
}

export default Githubjobs;
