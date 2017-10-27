import React, { Component } from 'react';

import './Github.css';

class Github extends Component {
	constructor(props) {
		super(props);
		this.state = {
			public: 0,
			list: [],
			totalCommits: 0
		};
	}

	componentDidMount() {
		fetch('https://api.github.com/users/guitarplrc')
			.then(info => info.json())
			.then(items => this.setState({ public: items.public_repos }));

		let reposURL = 'https://api.github.com/users/guitarplrc/repos';
		fetch(reposURL)
			.then(info => info.json())
			.then(list => this.setState({ list }))
			.then(() => this.getCommits());
	}

	getCommits = () => {
		let total = [];

		this.state.list.map(each => {
			let eachRepoURL = `https://api.github.com/repos/guitarplrc/${each.name}/commits`;
			fetch(eachRepoURL)
				.then(list => list.json())
				.then(newList => total.push(newList.length))
				.then(() => this.countCommits(total));
			return true;
		});
	};

	countCommits = list => {
		let count = 0;
		for (let i = 0; i < list.length; i++) {
			count = count + list[i];
		}
		this.setState({ totalCommits: count });
	};

	render() {
		return (
			this.state.totalCommits > 0 && (
				<div className="Github">
					<h3>
						<a href="https://github.com/guitarplrc" target="_blank" rel="noopener noreferrer">
							Github
						</a>
					</h3>
					<p>Repos: {this.state.public}</p>
					<p>Commits: {this.state.totalCommits}</p>
				</div>
			)
		);
	}
}

export default Github;
