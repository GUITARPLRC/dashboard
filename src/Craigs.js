import React, { Component } from 'react';

import './Craigs.css';

class Craigs extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			jobs: []
		};
	}

	componentDidMount() {
		fetch('https://chicago.craigslist.org/search/web?format=rss')
			.then(res => res.text())
			.then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
			.then(data => this.setState({ data }))
			.then(() => this.convert());
	}

	convert = () => {
		let item = this.state.data.querySelectorAll('item');
		let jobs = [];

		for (let i = 0; i < item.length; i++) {
			let title = item[i].querySelector('title').textContent;
			let link = item[i].querySelector('link').textContent;
			let date = item[i].getElementsByTagName('dcterms:issued')[0].textContent.slice(5, 10);

			jobs.push({ title, link, date });
		}
		this.setState({ jobs });
	};

	render() {
		return (
			<div className="Craigsjobs">
				<h3>
					<a
						href="https://chicago.craigslist.org/d/web-html-info-design/search/web"
						target="_blank"
						rel="noopener noreferrer"
					>
						CraigsList Jobs
					</a>
				</h3>
				{this.state.jobs &&
					this.state.jobs.map((each, key) => (
						<div className="craigjob" key={key}>
							<a href={each.link} target="_blank" rel="noopener noreferrer">
								<h4>{each.title}</h4>
								<p>{each.date}</p>
							</a>
						</div>
					))}
			</div>
		);
	}
}

export default Craigs;
