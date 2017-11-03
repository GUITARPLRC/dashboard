import React from 'react';
import Todo from './Todo';
import Github from './Github';
import Githubjobs from './Githubjobs';
import Weather from './Weather';
import Authjobs from './Authjobs';
import SO from './SO';

import './App.css';

function App() {
	let today = new Date();
	let day = today.toLocaleDateString();

	return (
		<div className="App">
			<h1>Hello Chuck!</h1>
			<p>Today is {day}</p>
			<Weather />
			<div className="components">
				<Todo />
				<Github />
				<Githubjobs />
				<Authjobs />
				<SO />
			</div>
		</div>
	);
}

export default App;
