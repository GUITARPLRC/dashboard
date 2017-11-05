import React, { Component } from 'react';

import './SO.css';

class SO extends Component {
	constructor() {
		super();
		this.state = {
			data: null,
			jobs: [],
		};
	}
	componentWillMount() {
		let jobs = [];

		fetch(
			'https://stackoverflow.com/jobs/feed?q=front+end+web&l=Chicago%2c+IL%2c+United+States&d=20&u=Miles&sort='
		)
			.then(res => res.text())
			.then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
			.then(data => this.setState({ data }))
			.then(info => {
				const data = this.state.data;
				const elements = data.querySelectorAll('item');

				for (let i = 0; i < elements.length; i++) {
					let link = elements[i].querySelector('link').textContent;
					let title = elements[i].querySelector('title').textContent;
					let date = elements[i]
						.querySelector('pubDate')
						.textContent.slice(5, 11);

					jobs.push({
						link,
						title,
						date,
					});
				}

				this.setState({ jobs });
			});
	}
	render() {
		return (
			<div className="SOjobs">
				<h3>
					<a
						href="https://stackoverflow.com/jobs?q=front+end+developer&l=Chicago%2c+IL%2c+United+States&d=20&u=Miles&sort=p"
						target="_blank"
						rel="noopener noreferrer"
					>
						S.O. Jobs
					</a>
				</h3>
				{this.state.jobs &&
					this.state.jobs.map((each, key) => (
						<div className="SOjob" key={key}>
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

export default SO;
