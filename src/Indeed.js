import React, { Component } from 'react';

import './Indeed.css';

class Indeed extends Component {
	constructor() {
		super();
		this.state = {
			info: null,
			jobs: []
		};
	}
	componentDidMount() {
		fetch('http://rss.indeed.com/rss?q=front+end+web&l=Chicago&jt=fulltime&explvl=entry_level&sort=date')
			.then(res => res.text())
			.then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
			.then(info => this.setState({ info }))
			.then(() => this.convert());
	}

	convert = () => {
		const { info } = this.state;
		const list = info.querySelectorAll('item');
		let jobs = [];

		for (let i = 0; i < list.length; i++) {
			let title = list[i].querySelector('title').textContent;
			let link = list[i].querySelector('link').textContent;
			let date = list[i].querySelector('pubDate').textContent.slice(5, 11);
			let source = list[i].querySelector('source').textContent;
			jobs.push({ title, link, date, source });
		}
		this.setState({ jobs });
	};

	render() {
		return (
			<div className="Indeedjobs">
				<h3>
					<a
						href="https://www.indeed.com/jobs?q=front+end+developer&l=wheeling%2C+il"
						target="_blank"
						rel="noopener noreferrer"
					>
						Indeed Jobs
					</a>
				</h3>
				{this.state.jobs &&
					this.state.jobs.map((each, key) => (
						<div className="Indeedjob" key={key}>
							<a href={each.link} target="_blank" rel="noopener noreferrer">
								<h4>{each.title}</h4>
								<p>{each.date}</p>
								<p>{each.source}</p>
							</a>
						</div>
					))}
			</div>
		);
	}
}

export default Indeed;
