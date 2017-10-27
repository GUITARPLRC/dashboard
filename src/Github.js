import React, { Component } from 'react';

class Github extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			totalCommits: 0
		};
	}

	componentDidMount() {
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
		return this.state.totalCommits > 0 && <div className="Github">{this.state.totalCommits}</div>;
	}
}

export default Github;
