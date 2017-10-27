import React from 'react';
import Todo from './Todo';
import Github from './Github';
import Githubjobs from './Githubjobs';
import Weather from './Weather';

import './App.css';

function App() {
	let today = new Date();
	let day = today.toLocaleDateString();

	return (
		<div className="App">
			<h1>Hello Chuck!</h1>
			<p>Today is {day}</p>
			<div className="components">
				<Weather />
				<Todo />
				<Github />
				<Githubjobs />
			</div>
		</div>
	);
}

export default App;
