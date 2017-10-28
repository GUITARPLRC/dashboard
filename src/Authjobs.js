import React, { Component } from 'react';

import './Authjobs.css';

class Authjobs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: null
		};
	}

	componentDidMount() {
		fetch(
			'https://authenticjobs.com/api/?api_key=4f1b43183c38b3afc3936d34404c4ab0&format=json&method=aj.jobs.search&keywords=front,end&location=chicagoilus'
		)
			.then(res => res.json())
			.then(info => this.setState({ list: info.listings.listing }));
	}

	render() {
		return (
			<div className="Authjobs">
				<h3>Authentic Jobs</h3>
				{this.state.list &&
					this.state.list.map((each, key) => (
						<div key={key} className="authjob">
							<a href={each.url} target="_blank" rel="noopener noreferrer">
								<h4>{each.title}</h4>
								<h6>{each.type.name}</h6>
								<p>{each.post_date.slice(5, 9)}</p>
								{each.company.name}
							</a>
						</div>
					))}
			</div>
		);
	}
}

export default Authjobs;
