import React, { Component } from 'react';
import Todo from './Todo';
import Github from './Github';
import Weather from './Weather';
import Youtube from './Youtube';
import Components from './Components';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			date: null
		};
	}
	componentDidMount() {
		let today = new Date();
		let day = today.toLocaleDateString();
		this.setState({ date: day });
	}

	render() {
		return (
			<div className="App">
				<div className="top">
					<div className="top_left">
						<h1>Hello Chuck!</h1>
						<p>Today is {this.state.date}</p>
						<Weather />
					</div>
					<div className="top_right">
						<Todo />
						<Youtube />
						<Github />
					</div>
				</div>
				<Components />
			</div>
		);
	}
}

export default App;
